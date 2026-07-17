<script setup>
import EvilEye from '../components/EvilEye.vue'
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden bg-black">
    <EvilEye class="absolute inset-0" />
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none">
      <span class="font-mono text-sm tracking-[0.15em] text-red-400/60">EVIL EYE</span>
      <span class="text-[10px] text-red-400/30 tracking-[0.08em]">MOVE MOUSE · IT WATCHES</span>
    </div>
  </div>
</template>
