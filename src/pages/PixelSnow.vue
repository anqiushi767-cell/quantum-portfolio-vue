<script setup>
import PixelSnow from '../components/PixelSnow.vue'
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden bg-black">
    <PixelSnow class="absolute inset-0" />
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none">
      <span class="font-mono text-sm tracking-[0.15em] text-white-300/60">PIXELSNOW</span>
      <span class="text-[10px] text-white-300/30 tracking-[0.08em]">AUTO SCROLLS · ENDLESS SNOW</span>
    </div>
  </div>
</template>
