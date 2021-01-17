import { RouteConfig } from 'vue-router'
import Record from '@/views/Record.vue'
import Registered from '@/views/Registered.vue'
import History from '@/views/History.vue'
import Detail from '@/views/Detail.vue'

const guardedRoutes: Array<RouteConfig> = [
  {
    path: '/record',
    name: 'Record',
    component: Record
  },
  {
    path: '/registered',
    name: 'Registered',
    component: Registered
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/detail/:statusId',
    name: 'Detail',
    component: Detail
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

guardedRoutes.forEach((routeObject, index) => {
  Object.assign(guardedRoutes[index], {
    meta: {
      requiresAuth: false // 認証のAPIと繋げたあとにtrueにする
    }
  })
})

export default guardedRoutes
