import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import UserService from '@/services/UserService'
import { Status } from '@/@types/component-interfaces/status'

@Module({ namespaced: true })
class Statuses extends VuexModule {
  private statuses: Status[] | undefined = undefined

  public get getStatuses(): Status[] | undefined {
    return this.statuses
  }
  @Mutation
  public loadSuccess(statuses: Status[]): void {
    this.statuses = statuses
  }

  @Mutation
  public loadFailure(): void {
    this.statuses = undefined
  }

  @Action({ rawError: true })
  load(): Promise<Status[]> {
    return UserService.getStatuses().then(
      stasuses => {
        this.context.commit('loadSuccess', stasuses)
        return Promise.resolve(stasuses)
      },
      error => {
        this.context.commit('loginFailure')
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return Promise.reject(message)
      }
    )
  }
}

export default Statuses
