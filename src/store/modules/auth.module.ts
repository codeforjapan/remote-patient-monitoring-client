import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import AuthService from '@/services/AuthService'
import UserService from '@/services/UserService'

export interface AuthUser {
  username: string
  idToken: string
  refreshToken: string
  policy_accepted: string
}

const storedUser = localStorage.getItem('user')

@Module({ namespaced: true })
class Auth extends VuexModule {
  public status = storedUser ? { loggedIn: true } : { loggedIn: false }
  public user: AuthUser | null = storedUser ? JSON.parse(storedUser) : null

  get isLoggedIn(): boolean {
    if (!this.status.loggedIn) {
      return false
    } else {
      return !this.isExpired
    }
  }

  get isExpired(): boolean {
    if (!this.user) return true // ユーザ情報が無い場合も expired したこととする
    if (!this.user?.idToken) return true // ユーザ情報が無い場合も expired したこととする
    const idToken: string = this.user?.idToken
    const bpayload = idToken.split('.')[1]
    const payload = JSON.parse(atob(bpayload))
    return new Date().getSeconds() > payload.exp
  }

  get isPolicyAccepted(): boolean {
    return this.user?.policy_accepted !== undefined
  }

  @Mutation
  public loginSuccess(user: AuthUser): void {
    this.status.loggedIn = true
    this.user = user
  }

  @Mutation
  public loginFailure(): void {
    this.status.loggedIn = false
    this.user = null
  }

  @Mutation
  public logout(): void {
    this.status.loggedIn = false
    this.user = null
  }

  @Action({ rawError: true })
  login(data: { username: string; password: string }): Promise<AuthUser> {
    return AuthService.login(data.username, data.password).then(
      (user) => {
        this.context.commit('loginSuccess', user)
        return Promise.resolve(user)
      },
      (error) => {
        this.context.commit('loginFailure')
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.errorMessage) ||
          error.message ||
          error.toString()
        return Promise.reject(message)
      },
    )
  }

  @Action({ rawError: true })
  refreshToken(): Promise<AuthUser> {
    const token: string = this.user?.refreshToken || ''
    return AuthService.refreshToken(token).then(
      (user) => {
        this.context.commit('loginSuccess', user)
        return Promise.resolve(user)
      },
      (error) => {
        this.context.commit('loginFailure')
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.errorMessage) ||
          error.message ||
          error.toString()
        return Promise.reject(message)
      },
    )
  }

  @Action
  signOut(): void {
    AuthService.logout()
    this.context.commit('logout')
  }

  @Action({ rawError: true })
  acceptPolicy(): Promise<AuthUser> {
    return UserService.postAcceptPolicy().then(
      (user) => {
        return Promise.resolve(user)
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.errorMessage) ||
          error.message ||
          error.toString()
        return Promise.reject(message)
      },
    )
  }
}

export default Auth
