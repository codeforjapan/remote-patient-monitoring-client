import Vue from 'vue'
import VueRouter from 'vue-router'
import guardedRoutes from '@/router/guarded-routes'
import nonGuardedRoutes from '@/router/non-guarded-routes'
import store from '../store/index'
import authStore from '../store/modules/auth.module'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
})

router.addRoutes(guardedRoutes)
router.addRoutes(nonGuardedRoutes)

router.beforeEach(async (to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  } else {
    if (localStorage.getItem('user')){
      if (store.getters['Auth/isExpired']){
        store.dispatch('Auth/refreshToken').then(user => {
          next()
        }
        ).catch(err => {
          console.log(err)
          next('/login')
        })
      }
      next()
    }else{
      next('/login')
    }
  }
})

export default router
