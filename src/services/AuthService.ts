import axios from 'axios'
import { AuthUser } from '@/store/modules/auth.module'

class AuthService {
  login(username: string, password: string): Promise<AuthUser> {
    return axios
      .post('login', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.idToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  refreshToken(refreshToken: string): Promise<AuthUser> {
    console.log(refreshToken)
    return axios
      .post('login', {
        refreshToken,
      })
      .then((response) => {
        if (response.data.idToken) {
          const useritem = localStorage.getItem('user')
          if (!useritem) throw new Error('usre item was not found')
          const user = JSON.parse(useritem)
          user.idToken = response.data.idToken
          localStorage.setItem('user', JSON.stringify(user))
        }
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }
}

export default new AuthService()
