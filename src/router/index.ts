import Vue from 'vue'
import VueRouter from 'vue-router'
import guardedRoutes from '@/router/guarded-routes'
import nonGuardedRoutes from '@/router/non-guarded-routes'
import store from '../store/index'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
})

router.addRoutes(guardedRoutes)
router.addRoutes(nonGuardedRoutes)

router.beforeEach(async (to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next('/login')
    } else {
      if (store.getters['Auth/isExpired']) {
        store
          .dispatch('Auth/refreshToken')
          .then(() => {
            next()
          })
          .catch((err) => {
            console.log(err)
            next('/login')
          })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
