import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

routes.push({
  path: '/',
  redirect: '/project',
})

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
