<script setup>
import { RouterView, RouterLink } from 'vue-router'

const links = [
  ['/', 'Home', 'cyan'],
  ['/terminal', 'Terminal', 'green'],
  ['/ether', 'Ether', 'purple'],
  ['/galaxy', 'Galaxy', 'cyan'],
  ['/evil', 'Evil Eye', 'red'],
  ['/lightning', 'Lightning', 'cyan'],
  ['/rays', 'Rays', 'amber'],
]
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans">
    <nav class="fixed top-0 left-0 right-0 z-50 flex gap-2 p-4 flex-wrap">
      <RouterLink v-for="[path, name, color] in links" :key="path" :to="path"
        :class="`px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs hover:border-${color}-400/40 transition`">
        {{ name }}
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
