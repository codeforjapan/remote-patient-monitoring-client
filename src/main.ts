import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { mapState } from 'vuex'

import router from './router'
import store from './store'
import '@/assets/global.scss'
Vue.component('ValidationProvider', ValidationProvider)

Vue.config.productionTip = false
extend('required', {
  ...required,
  message: 'This field is required'
})
new Vue({
  router,
  store,
  computed: mapState(['user', 'statuses']),
  render: h => h(App)
}).$mount('#app')
