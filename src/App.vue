<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import PillNav from './components/PillNav.vue'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Terminal', href: '/terminal' },
  { label: 'Ether', href: '/ether' },
  { label: 'Galaxy', href: '/galaxy' },
  { label: 'Evil Eye', href: '/evil' },
  { label: 'Lightning', href: '/lightning' },
  { label: 'Rays', href: '/rays' },
]

const route = useRoute()
const activeHref = computed(() => route.path)
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans">
  <div class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style="background:rgba(2,3,10,0.4);">
  <PillNav
    logo="/favicon.svg"
    :items="links"
    :active-href="activeHref"
    base-color="rgba(255,255,255,0.9)"
    pill-color="rgba(255,255,255,0.08)"
    hovered-pill-text-color="#02030a"
    pill-text-color="rgba(236,248,255,0.85)"
    :initial-load-animation="true"
  />
  </div>
  <RouterView />
  </div>
</template>
