import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { mapState } from 'vuex'
import axios from 'axios'

import router from './router'
import store from './store'
import '@/assets/global.scss'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

Vue.component('ValidationProvider', ValidationProvider)

Vue.config.productionTip = false
extend('required', {
  ...required,
  message: 'This field is required',
})
new Vue({
  router,
  store,
  computed: mapState(['user', 'statuses']),
  render: (h) => h(App),
}).$mount('#app')
