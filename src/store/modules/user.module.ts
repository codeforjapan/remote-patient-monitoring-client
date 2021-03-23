import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import UserService from '@/services/UserService'
import { Patient } from '@/@types/component-interfaces/patient'

@Module({ namespaced: true })
class User extends VuexModule {
  private patient: Patient = {
    centerId: '',
    centerName: '',
    display: true,
    emergencyPhone: '',
    patientId: '',
    phone: '',
    policy_accepted: '',
    statuses: [],
  }

  get getPatientInfo(): Patient {
    return this.patient
  }

  @Mutation
  public setPatient(patient: Patient): void {
    this.patient = patient
  }

  @Action({ rawError: true })
  loadPatient(): Promise<Patient> {
    return UserService.getUserInfo().then(
      (patient) => {
        this.context.commit('setPatient', patient)
        return Promise.resolve(patient)
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

export default User
