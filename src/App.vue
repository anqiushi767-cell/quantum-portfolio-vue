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
    <PillNav
      logo="/favicon.svg"
      :items="links"
      :active-href="activeHref"
      base-color="#00f5ff"
      pill-color="#0a0a14"
      hovered-pill-text-color="#02030a"
      pill-text-color="#ecf8ff"
      :initial-load-animation="true"
    />
    <RouterView />
  </div>
</template>
