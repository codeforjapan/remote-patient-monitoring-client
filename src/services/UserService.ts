import { AuthUser } from '../store/modules/auth.module'
import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://monitoring.stopcovid19.jp/stg/api/patient/'

class UserService {
  getUserInfo() {
    return axios.get(API_URL + `patients/${this.getUserId()}`, {
      headers: authHeader()
    })
  }

  getUserId() {
    const user = localStorage.getItem('user')
    if (!user) {
      return null
    }
    const authHeader = (JSON.parse(user) as AuthUser).idToken
    const payload = btoa(authHeader.split('.')[1])
    console.log(payload)
    return JSON.parse(payload)['cognito:username']
  }
}

export default new UserService()
