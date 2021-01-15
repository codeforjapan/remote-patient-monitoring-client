import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Record from '@/views/Record.vue'
import Registered from '@/views/Registered.vue'
import History from '@/views/History.vue'
import Detail from '@/views/Detail.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
