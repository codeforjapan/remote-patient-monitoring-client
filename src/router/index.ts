import Vue from 'vue'
import VueRouter from 'vue-router'
import guardedRoutes from '@/router/guarded-routes'
import nonGuardedRoutes from '@/router/non-guarded-routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL
})

router.addRoutes(guardedRoutes)
router.addRoutes(nonGuardedRoutes)

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
