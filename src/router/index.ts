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

guardedRoutes.map((route) => {
  router.addRoute(route)
})
nonGuardedRoutes.map((route) => {
  router.addRoute(route)
})

router.beforeEach(async (to, from, next) => {
  const user = localStorage.getItem('user')
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user) {
      next('/login')
    } else {
      if (store.getters['Auth/isExpired']) {
        store
          .dispatch('Auth/refreshToken')
          .then((user) => {
            if (user.acceptPolicy) {
              next()
            } else {
              next('/terms')
            }
          })
          .catch((err) => {
            console.log(err)
            next('/login')
          })
      } else {
        console.log(to)
        if (to.name == 'Terms' || JSON.parse(user).policy_accepted) {
          next()
        } else {
          next('/terms')
        }
      }
    }
  } else {
    next()
  }
})

export default router
