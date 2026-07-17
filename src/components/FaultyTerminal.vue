<script setup lang="ts">
import { Color, Mesh, Program, Renderer, Triangle } from 'ogl';
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch, type CSSProperties } from 'vue';

type Vec2 = [number, number];

interface FaultyTerminalProps {
  scale?: number;
  gridMul?: Vec2;
  digitSize?: number;
  timeScale?: number;
  pause?: boolean;
  scanlineIntensity?: number;
  glitchAmount?: number;
  flickerAmount?: number;
  noiseAmp?: number;
  chromaticAberration?: number;
  dither?: number | boolean;
  curvature?: number;
  tint?: string;
  mouseReact?: boolean;
  mouseStrength?: number;
  dpr?: number;
  pageLoadAnimation?: boolean;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
}

const vertexShader = `attribute vec2 position;attribute vec2 uv;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.0,1.0);}`;

const fragmentShader = `precision mediump float;
varying vec2 vUv;
uniform float iTime,uScale,uDigitSize,uScanlineIntensity,uGlitchAmount,uFlickerAmount,uNoiseAmp;
uniform float uChromaticAberration,uDither,uCurvature,uMouseStrength,uUseMouse,uPageLoadProgress,uUsePageLoadAnimation,uBrightness;
uniform vec3 iResolution,uTint;
uniform vec2 uGridMul,uMouse;
float time;

float hash21(vec2 p){p=fract(p*234.56);p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(vec2 p){return sin(p.x*10.0)*sin(p.y*(3.0+sin(time*0.090909)))+0.2;}
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}

float fbm(vec2 p){
  p*=1.1;float f=0.0,amp=0.5*uNoiseAmp;
  f+=amp*noise(p);p=rot(time*0.02)*p*2.0;amp*=0.454545;
  f+=amp*noise(p);p=rot(time*0.02)*p*2.0;amp*=0.454545;
  f+=amp*noise(p);return f;
}
float pattern(vec2 p,out vec2 q,out vec2 r){
  q=vec2(fbm(p+1.0),fbm(rot(0.1*time)*p+1.0));
  r=vec2(fbm(rot(0.1)*q+1.0),fbm(q+1.0));
  return fbm(p+r);
}
float digit(vec2 p){
  vec2 grid=uGridMul*15.0,s=floor(p*grid)/grid;p=p*grid;
  vec2 q,r;float i=pattern(s*0.1,q,r)*1.3-0.03;
  if(uUseMouse>0.5){
    vec2 mw=uMouse*uScale;float d=exp(-distance(s,mw)*8.0)*uMouseStrength*10.0;
    i+=d+sin(distance(s,mw)*20.0-iTime*5.0)*0.1*d;
  }
  if(uUsePageLoadAnimation>0.5){
    float cr=fract(sin(dot(s,vec2(12.9898,78.233)))*43758.5453);
    float cp=clamp((uPageLoadProgress-cr*0.8)/0.2,0.0,1.0);
    i*=smoothstep(0.0,1.0,cp);
  }
  p=fract(p);p*=uDigitSize;
  float j=floor(p.x*5.0-2.0),k=floor((1.0-p.y)*5.0-2.0);
  float fVal=j*j+k*k,b=step(0.1,i-fVal*0.0625);
  float br=b*(0.2+fract(p.y)*0.8)*(0.75+fract(p.x)*0.25);
  return step(0.0,p.x)*step(p.x,1.0)*step(0.0,p.y)*step(p.y,1.0)*br;
}
float onOff(float a,float b,float c){return step(c,sin(iTime+a*cos(iTime*b)))*uFlickerAmount;}
float displace(vec2 look){
  float y=look.y-mod(iTime*0.25,1.0);
  return sin(look.y*20.0+iTime)*0.0125*onOff(4.0,2.0,0.8)*(1.0+cos(iTime*60.0))/(1.0+50.0*y*y);
}
vec3 getColor(vec2 p){
  float bar=step(mod(p.y+time*20.0,1.0),0.2)*0.4+1.0;bar*=uScanlineIntensity;
  float d=displace(p);p.x+=d;
  if(uGlitchAmount!=1.0)p.x+=d*(uGlitchAmount-1.0);
  float mid=digit(p);
  const float off=0.002;
  float sum=digit(p+vec2(-off,-off))+digit(p+vec2(0.0,-off))+digit(p+vec2(off,-off))
          +digit(p+vec2(-off,0.0))+mid+digit(p+vec2(off,0.0))
          +digit(p+vec2(-off,off))+digit(p+vec2(0.0,off))+digit(p+vec2(off,off));
  return vec3(0.9)*mid+sum*0.1*bar;
}
vec2 barrel(vec2 uv){
  vec2 c=uv*2.0-1.0;float r2=dot(c,c);
  c*=1.0+uCurvature*r2;return c*0.5+0.5;
}
void main(){
  time=iTime*0.333333;
  vec2 uv=vUv;
  if(uCurvature!=0.0)uv=barrel(uv);
  vec2 p=uv*uScale;
  vec3 col=getColor(p);
  if(uChromaticAberration!=0.0){
    vec2 ca=vec2(uChromaticAberration)/iResolution.xy;
    col.r=getColor(p+ca).r;col.b=getColor(p-ca).b;
  }
  col*=uTint*uBrightness;
  if(uDither>0.0){float rnd=hash21(gl_FragCoord.xy);col+=(rnd-0.5)*(uDither*0.003922);}
  gl_FragColor=vec4(col,1.0);
}`;

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const num = parseInt(h, 16);
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

const props = withDefaults(defineProps<FaultyTerminalProps>(), {
  scale: 1, gridMul: () => [2, 1], digitSize: 1.5, timeScale: 0.3, pause: false,
  scanlineIntensity: 0.3, glitchAmount: 1, flickerAmount: 1, noiseAmp: 1,
  chromaticAberration: 0, dither: 0, curvature: 0.2, tint: '#ffffff',
  mouseReact: true, mouseStrength: 0.2,
  dpr: Math.min(window.devicePixelRatio || 1, 2),
  pageLoadAnimation: true, brightness: 1, className: '', style: () => ({})
});

const containerRef = useTemplateRef('containerRef');
const programRef = ref<Program | null>(null);
const rendererRef = ref<Renderer | null>(null);
const mouseRef = ref({ x: 0.5, y: 0.5 });
const smoothMouseRef = ref({ x: 0.5, y: 0.5 });
const frozenTimeRef = ref(0);
const rafRef = ref<number>(0);
const loadAnimationStartRef = ref<number>(0);
const timeOffsetRef = ref<number>(Math.random() * 100);

const tintVec = computed(() => hexToRgb(props.tint));
const ditherValue = computed(() => (typeof props.dither === 'boolean' ? (props.dither ? 1 : 0) : props.dither));

const handleMouseMove = (e: MouseEvent) => {
  const ctn = containerRef.value; if (!ctn) return;
  const rect = ctn.getBoundingClientRect();
  mouseRef.value = { x: (e.clientX - rect.left) / rect.width, y: 1 - (e.clientY - rect.top) / rect.height };
};

let cleanup: (() => void) | null = null;
const setup = () => {
  const ctn = containerRef.value; if (!ctn) return;
  const renderer = new Renderer({ dpr: props.dpr });
  rendererRef.value = renderer; const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 1);

  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex: vertexShader, fragment: fragmentShader,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height) },
      uScale: { value: props.scale },
      uGridMul: { value: new Float32Array(props.gridMul) },
      uDigitSize: { value: props.digitSize },
      uScanlineIntensity: { value: props.scanlineIntensity },
      uGlitchAmount: { value: props.glitchAmount },
      uFlickerAmount: { value: props.flickerAmount },
      uNoiseAmp: { value: props.noiseAmp },
      uChromaticAberration: { value: props.chromaticAberration },
      uDither: { value: ditherValue.value },
      uCurvature: { value: props.curvature },
      uTint: { value: new Color(tintVec.value[0], tintVec.value[1], tintVec.value[2]) },
      uMouse: { value: new Float32Array([smoothMouseRef.value.x, smoothMouseRef.value.y]) },
      uMouseStrength: { value: props.mouseStrength },
      uUseMouse: { value: props.mouseReact ? 1 : 0 },
      uPageLoadProgress: { value: props.pageLoadAnimation ? 0 : 1 },
      uUsePageLoadAnimation: { value: props.pageLoadAnimation ? 1 : 0 },
      uBrightness: { value: props.brightness }
    }
  });
  programRef.value = program;

  const mesh = new Mesh(gl, { geometry, program });

  function resize() {
    if (!ctn || !renderer) return;
    renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
    program.uniforms.iResolution.value = new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
  }

  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(ctn); resize();

  const update = (t: number) => {
    rafRef.value = requestAnimationFrame(update);
    if (props.pageLoadAnimation && loadAnimationStartRef.value === 0) loadAnimationStartRef.value = t;
    if (!props.pause) {
      const elapsed = (t * 0.001 + timeOffsetRef.value) * props.timeScale;
      program.uniforms.iTime.value = elapsed; frozenTimeRef.value = elapsed;
    } else { program.uniforms.iTime.value = frozenTimeRef.value; }
    if (props.pageLoadAnimation && loadAnimationStartRef.value > 0) {
      const progress = Math.min((t - loadAnimationStartRef.value) / 2000, 1);
      program.uniforms.uPageLoadProgress.value = progress;
    }
    if (props.mouseReact) {
      smoothMouseRef.value.x += (mouseRef.value.x - smoothMouseRef.value.x) * 0.08;
      smoothMouseRef.value.y += (mouseRef.value.y - smoothMouseRef.value.y) * 0.08;
      const mu = program.uniforms.uMouse.value as Float32Array;
      mu[0] = smoothMouseRef.value.x; mu[1] = smoothMouseRef.value.y;
    }
    renderer.render({ scene: mesh });
  };
  rafRef.value = requestAnimationFrame(update);
  ctn.appendChild(gl.canvas);
  if (props.mouseReact) ctn.addEventListener('mousemove', handleMouseMove);

  cleanup = () => {
    cancelAnimationFrame(rafRef.value); resizeObserver.disconnect();
    if (props.mouseReact) ctn.removeEventListener('mousemove', handleMouseMove);
    if (gl.canvas.parentElement === ctn) ctn.removeChild(gl.canvas);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    loadAnimationStartRef.value = 0; timeOffsetRef.value = Math.random() * 100;
  };
};

onMounted(() => { if (containerRef.value) setup(); });
onBeforeUnmount(() => { if (cleanup) { cleanup(); cleanup = null; } });

watch(() => props, () => { if (cleanup) { cleanup(); cleanup = null; } setup(); }, { deep: true });
</script>

<template>
  <div ref="containerRef" :class="['w-full h-full relative overflow-hidden', className]" :style="style" v-bind="$attrs" />
</template>
