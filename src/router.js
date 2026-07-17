import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Terminal from './pages/Terminal.vue'
import LiquidEther from './pages/LiquidEther.vue'
import Galaxy from './pages/Galaxy.vue'
import EvilEye from './pages/EvilEye.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/terminal', component: Terminal },
  { path: '/ether', component: LiquidEther },
  { path: '/galaxy', component: Galaxy },
  { path: '/evil', component: EvilEye },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
