<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed, ref } from 'vue'
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
const navCollapsed = ref(false)
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans">
    <!-- Collapse toggle -->
    <button
      @click="navCollapsed = !navCollapsed"
      class="fixed top-3 left-3 z-[60] w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer"
      :class="navCollapsed ? 'bg-white/15 border-white/20 text-white/60 hover:bg-white/25' : 'bg-white/10 border-white/10 text-white/40 hover:bg-white/20'"
      :title="navCollapsed ? '展开' : '收起'"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path v-if="navCollapsed" d="M6 9l6 6 6-6"/>
        <path v-else d="M18 15l-6-6-6 6"/>
      </svg>
    </button>

    <!-- Nav bar -->
    <div
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
      :class="navCollapsed ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'"
    >
      <div class="backdrop-blur-xl" style="background:rgba(2,3,10,0.35);">
        <PillNav
          logo="/favicon.svg"
          :items="links"
          :active-href="activeHref"
          base-color="rgba(10,15,25,0.6)"
          pill-color="rgba(255,255,255,0.06)"
          hovered-pill-text-color="#02030a"
          pill-text-color="rgba(236,248,255,0.85)"
          :initial-load-animation="true"
        />
      </div>
    </div>

    <RouterView />
  </div>
</template>
