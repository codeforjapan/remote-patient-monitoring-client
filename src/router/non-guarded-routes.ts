import { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

const nonGuardedRoutes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/login/:k',
    name: 'Login',
    props: true,
    component: Login,
  },
]

export default nonGuardedRoutes
