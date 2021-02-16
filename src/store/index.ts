import Vue from 'vue'
import Vuex from 'vuex'

import Auth from './modules/auth.module'
import Statuses from './modules/statuses.module'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Statuses,
  },
})
