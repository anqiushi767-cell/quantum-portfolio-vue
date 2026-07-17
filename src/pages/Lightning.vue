<script setup>
import Lightning from '../components/Lightning.vue'
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden bg-black">
    <Lightning class="absolute inset-0" :bolt-color="'#00f5ff'" :glow-color="'#00f5ff'" :bolt-width="2" :flash-intensity="0.6" />
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none">
      <span class="font-mono text-sm tracking-[0.15em] text-cyan-300/60">LIGHTNING</span>
      <span class="text-[10px] text-cyan-300/30 tracking-[0.08em]">CLICK TO STRIKE · STORM ACTIVE</span>
    </div>
  </div>
</template>
