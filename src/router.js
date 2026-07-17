import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./pages/Home.vue') },
  { path: '/terminal', component: () => import('./pages/Terminal.vue') },
  { path: '/ether', component: () => import('./pages/LiquidEther.vue') },
  { path: '/galaxy', component: () => import('./pages/Galaxy.vue') },
  { path: '/evil', component: () => import('./pages/EvilEye.vue') },
  { path: '/lightning', component: () => import('./pages/Lightning.vue') },
  { path: '/rays', component: () => import('./pages/SideRays.vue') },
  { path: '/dither', component: () => import('./pages/Dither.vue') },
  { path: '/dots', component: () => import('./pages/DotField.vue') },
  { path: '/dotgrid', component: () => import('./pages/DotGrid.vue') },
  { path: '/glitch', component: () => import('./pages/LetterGlitchPage.vue') },
  { path: '/pillar', component: () => import('./pages/LightPillar.vue') },
  { path: '/orb', component: () => import('./pages/Orb.vue') },
  { path: '/blast', component: () => import('./pages/PixelBlast.vue') },
  { path: '/snow', component: () => import('./pages/PixelSnow.vue') },
]

export default createRouter({ history: createWebHistory(), routes })
