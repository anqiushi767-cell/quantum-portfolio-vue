<script setup>
import LiquidEther from '../components/LiquidEther.vue'
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden bg-black">
    <LiquidEther
      :mouse-force="20"
      :cursor-size="100"
      :resolution="0.5"
      :auto-demo="true"
      :auto-speed="0.5"
      :auto-intensity="2.2"
      :colors="['#5227FF', '#FF9FFC', '#B19EEF']"
      class="absolute inset-0"
    />
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none">
      <span class="font-mono text-sm tracking-[0.15em] text-purple-300/60">LIQUID ETHER</span>
      <span class="text-[10px] text-purple-300/30 tracking-[0.08em]">MOVE MOUSE TO DISPLACE · AUTO-DEMO WHEN IDLE</span>
    </div>
  </div>
</template>
