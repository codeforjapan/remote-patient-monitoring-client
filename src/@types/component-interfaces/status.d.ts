export interface Status {
  statusId: string
  patientId: string
  centerId: string
  created: string
  SpO2: number
  body_temperature: number
  pulse: number
  symptom: {
    symptomId: string
    cough: boolean
    phlegm: boolean
    suffocation: boolean
    headache: boolean
    sore_throat: boolean
    remarks: string
  }
}
// eslint-disable-next-line @typescript-eslint/class-name-casing
export interface ConsumeStatus {
  SpO2: number
  body_temperature: number
  pulse: number
  symptom: {
    cough: boolean
    phlegm: boolean
    suffocation: boolean
    headache: boolean
    sore_throat: boolean
    remarks: string
  }
}
