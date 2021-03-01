// src/components/__tests__/Login.spec.ts
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Login from '../Login.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Login.vue', () => {
  // eslint-disable-next-line
  let store: any
  let Auth

  beforeEach(() => {
    Auth = {
      namespaced: true,
      getters: {
        isLoggedIn: () => false,
      },
      actions: {},
    }

    store = new Vuex.Store({
      modules: {
        Auth,
      },
    })
  })

  test('renders props.msg when passed', () => {
    const wrapper = shallowMount(Login, {
      store,
      localVue,
      stubs: ['router-link'],
    })
    expect(wrapper.text()).toMatch('ログイン')
  })
  test.todo('handle login and go to render view afeter ')
})
