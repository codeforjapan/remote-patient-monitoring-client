import { AuthUser } from '@/store/modules/auth.module'
import axios from 'axios'
import authHeader from './auth-header'
import { Status, ConsumeStatus } from '@/@types/component-interfaces/status'
import { Patient } from '@/@types/component-interfaces/patient'

class UserService {
  async getUserInfo(): Promise<Patient> {
    const response = await axios.get(`patients/${this.getUserId()}`, {
      headers: authHeader(),
    })
    return response.data
  }

  async getStatuses(): Promise<Status[]> {
    const response = await axios.get(`patients/${this.getUserId()}/statuses`, {
      headers: authHeader(),
    })
    return response.data
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

  async postAcceptPolicy() {
    const response = await axios.post(
      `patients/${this.getUserId()}/accept_policy`,
      {},
      {
        headers: authHeader(),
      },
    )
    return response.data
  }

  async postStatus(status: ConsumeStatus) {
    const response = await axios.post(
      `patients/${this.getUserId()}/statuses`,
      status,
      {
        headers: authHeader(),
      },
    )
    return response.data
  }

  async deleteStatus(patientId: string, statusId: string) {
    const response = await axios.delete(
      `patients/${patientId}/statuses/${statusId}`,
      {
        headers: authHeader(),
      },
    )
    return response.data
  }
}

export default new UserService()
