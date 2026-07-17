<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans">
    <nav class="fixed top-0 left-0 right-0 z-50 flex gap-3 p-4">
      <RouterLink to="/" class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm hover:border-cyan-400/40 transition">Home</RouterLink>
      <RouterLink to="/terminal" class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm hover:border-green-400/40 transition">Terminal</RouterLink>
      <RouterLink to="/ether" class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm hover:border-purple-400/40 transition">Ether</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
