import { RouteConfig } from 'vue-router'
import Record from '@/views/Record.vue'
import History from '@/views/History.vue'
import Detail from '@/views/Detail.vue'
import Terms from '@/views/Terms.vue'

const guardedRoutes: Array<RouteConfig> = [
  {
    path: '/record',
    name: 'Record',
    component: Record,
  },
  {
    path: '/history',
    name: 'History',
    component: History,
  },
  {
    path: '/detail/:statusId',
    name: 'Detail',
    props: true,
    component: Detail,
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms,
  },
]

guardedRoutes.forEach((routeObject, index) => {
  Object.assign(guardedRoutes[index], {
    meta: {
      requiresAuth: true, // 認証のAPIと繋げたあとにtrueにする
    },
  })
})

export default guardedRoutes
