import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Terminal from './pages/Terminal.vue'
import LiquidEther from './pages/LiquidEther.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/terminal', component: Terminal },
  { path: '/ether', component: LiquidEther },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
