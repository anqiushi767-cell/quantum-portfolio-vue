<script setup>
import SideRays from '../components/SideRays.vue'
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden bg-black">
    <SideRays class="absolute inset-0" />
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none">
      <span class="font-mono text-sm tracking-[0.15em] text-amber-300/60">SIDE RAYS</span>
      <span class="text-[10px] text-amber-300/30 tracking-[0.08em]">MOVE MOUSE · LIGHT BEAMS FOLLOW</span>
    </div>
  </div>
</template>
