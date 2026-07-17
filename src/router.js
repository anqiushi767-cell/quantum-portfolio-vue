import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Terminal from './pages/Terminal.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/terminal', component: Terminal },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
