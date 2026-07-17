<script setup>
import FaultyTerminal from '../components/FaultyTerminal.vue'
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden bg-black">
    <FaultyTerminal
      :mouse-react="true"
      :mouse-strength="0.35"
      :glitch-amount="1"
      :flicker-amount="0.6"
      :scanline-intensity="0.25"
      :curvature="0.15"
      :noise-amp="0.8"
      tint="#2d662d"
      :brightness="1.2"
      :dither="1"
      class="absolute inset-0"
    />
    <div class="absolute inset-0 pointer-events-none" style="background: repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 2px, transparent 4px); opacity:0.12;"></div>
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
      <span class="font-mono text-sm tracking-[0.15em] text-green-600/60">FAULTY TERMINAL</span>
      <span class="text-[10px] text-green-600/30 tracking-[0.08em]">MOVE MOUSE TO BOOST · SIGNAL DEGRADED</span>
    </div>
  </div>
</template>
