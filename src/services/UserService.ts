import { AuthUser } from '../store/modules/auth.module'
import axios from 'axios'
import authHeader from './auth-header'
import Status from '@/store/modules/statuses.module'

const API_URL = 'https://monitoring.stopcovid19.jp/stg/api/patient/'

class UserService {
  getUserInfo() {
    return axios
      .get(API_URL + `patients/${this.getUserId()}`, {
        headers: authHeader()
      })
      .then(response => {
        console.log(response)
        return response.data
      })
  }

  getStatuses(): Promise<any> {
    return axios
      .get(API_URL + `patients/${this.getUserId()}/statuses`, {
        headers: authHeader()
      })
      .then(response => {
        return response.data
      })
  }

  getUserId() {
    const user = localStorage.getItem('user')
    if (!user) {
      return null
    }
    const authHeader = (JSON.parse(user) as AuthUser).idToken
    const payload = atob(authHeader.split('.')[1])
    return JSON.parse(payload)['cognito:username']
  }
}

export default new UserService()
