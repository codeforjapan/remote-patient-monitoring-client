import axios from 'axios'
import { AuthUser } from '@/store/modules/auth.module'

class AuthService {
  async login(loginKey: string): Promise<AuthUser> {
    const response = await axios.post('initialize', {
      loginKey,
    })
    if (response.data.idToken) {
      localStorage.setItem('user', JSON.stringify(response.data))
    } else {
      throw new Error('ログインに失敗しました。')
    }
    return response.data
  }

  async loginWithID(username: string, password: string): Promise<AuthUser> {
    const response = await axios.post('login', {
      username: username,
      password: password,
    })
    if (response.data.idToken) {
      localStorage.setItem('user', JSON.stringify(response.data))
    } else {
      throw new Error('ログインに失敗しました。')
    }
    return response.data
  }

  async sendLoginURL(
    phone: string,
  ): Promise<{ success: boolean; loginKey: string | undefined }> {
    const response = await axios.post('getloginurl', {
      phone,
      sendSMS: true,
    })
    if (response.data.phone) {
      return { success: true, loginKey: response.data.loginKey }
    } else {
      throw new Error('ログインに失敗しました。')
    }
  }

  async loginWithToken(idToken: string): Promise<AuthUser> {
    const userid = this.getUserId(idToken)
    const response = await axios.get(`patients/${userid}`)
    if (response.data.idToken) {
      localStorage.setItem('user', JSON.stringify(response.data))
    } else {
      throw new Error('ログインに失敗しました。')
    }
    return response.data
  }

  async refreshToken(refreshToken: string): Promise<AuthUser> {
    console.log(refreshToken)
    const response = await axios.post('login', {
      refreshToken,
    })
    if (response.data.idToken) {
      const useritem = localStorage.getItem('user')
      if (!useritem) throw new Error('usre item was not found')
      const user = JSON.parse(useritem)
      user.idToken = response.data.idToken
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      throw new Error('ログインに失敗しました。')
    }
    return response.data
  }

  logout() {
    localStorage.removeItem('user')
  }

  getUserId(idToken: string): string {
    const payload = atob(idToken.split('.')[1])
    return JSON.parse(payload)['cognito:username']
  }
}

export default new AuthService()
