import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./pages/Home.vue') },
  { path: '/terminal', component: () => import('./pages/Terminal.vue') },
  { path: '/ether', component: () => import('./pages/LiquidEther.vue') },
  { path: '/galaxy', component: () => import('./pages/Galaxy.vue') },
  { path: '/evil', component: () => import('./pages/EvilEye.vue') },
  { path: '/lightning', component: () => import('./pages/Lightning.vue') },
  { path: '/rays', component: () => import('./pages/SideRays.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
