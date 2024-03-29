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
      store.dispatch('Auth/checkIsExpired').then((expired) => {
        if (expired) {
          store
            .dispatch('Auth/refreshToken')
            .then((user) => {
              if (user.policy_accepted) {
                next()
              } else {
                next('/terms-agree')
              }
            })
            .catch((err) => {
              console.error(err)
              next('/login')
            })
        } else {
          if (to.name == 'TermsAgree' || JSON.parse(user).policy_accepted) {
            next()
          } else {
            next('/terms-agree')
          }
        }
      })
    }
  } else {
    next()
  }
})

export default router
