/* eslint-disable camelcase */
import { Status } from './status'

export interface Patient {
  patientId: string
  centerId: string
  centerName: string
  emergencyPhone: string
  policy_accepted: string
  phone: string
  memo?: string | undefined
  display: boolean
  statuses: Status[]
}
