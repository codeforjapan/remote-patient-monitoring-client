<template>
  <div>
    <h1 class="title">ログイン</h1>
    <form name="form" @submit.prevent="handleLogin">
      <div v-if="message" class="alert alert-danger" role="alert">
        {{ message }}
      </div>
      <div v-if="isShowForm">
        <InputTextField
          id="phone"
          label="携帯電話番号"
          name="phone"
          value="inputPhone"
          v-model="phone"
          rules="required"
        />
        <ActionButton
          size="L"
          :theme="btnTheme"
          :is-submittable="isSubmittable"
          @click="handleLoginURL"
        >
          ログインURLを取得する
        </ActionButton>
        <div class="spanform">
          <a @click="showUserForm">ユーザID/パスワードでログインする</a>
        </div>
      </div>
      <div v-if="isShowUserForm">
        <InputTextField
          id="username"
          label="ユーザID"
          name="username"
          v-model="user.username"
          rules="required"
        />
        <InputTextField
          id="password"
          label="パスワード"
          name="password"
          v-model="user.password"
          rules="required"
          type="password"
        />
        <ActionButton
          size="L"
          :theme="btnThemeID"
          :is-submittable="isSubmittableID"
          @click="handleLoginWithID"
        >
          ログイン
        </ActionButton>
        <div class="spanform">
          <a @click="showForm">ログインURLを取得する</a>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { AuthUser } from '@/store/modules/auth.module'
import InputTextField from '@/components/InputTextField.vue'
import ActionButton from '@/components/ActionButton.vue'
import { Patient } from '@/@types/component-interfaces/patient'
const Auth = namespace('Auth')
const User = namespace('User')

@Component({
  components: {
    InputTextField,
    ActionButton,
  },
})
export default class Login extends Vue {
  private phone = ''
  private message = ''
  private isShowForm = false
  private isShowUserForm = false
  private user = { username: '', password: '' }

  @Prop()
  k?: string

  @Auth.Getter
  private isLoggedIn!: boolean

  @Auth.Getter
  private isPolicyAccepted!: boolean

  @Auth.Getter
  private isExpired!: boolean

  @Auth.Action
  private login!: (loginKey: string) => Promise<AuthUser>

  @Auth.Action
  private loginWithID!: (user: {
    username: string
    password: string
  }) => Promise<AuthUser>

  @Auth.Action
  private sendLoginURL!: (
    phone: string,
  ) => Promise<{ success: boolean; loginKey: string | undefined }>

  @Auth.Action
  private refreshToken!: () => Promise<AuthUser>

  @User.Action
  private loadPatient!: () => Promise<Patient>

  created(): void {
    if (this.isLoggedIn) {
      // ログインしているがセッション切れ
      if (this.isExpired) {
        // refreshToken を使って再認証
        this.refreshToken().then(() => {
          if (this.isPolicyAccepted) {
            this.$router.push('/record')
          } else {
            this.$router.push('/terms')
          }
        })
      } else {
        this.$router.push('/record')
      }
    }
    // キーがある場合、ログイン用のTokenがついている
    if (this.k) {
      this.handleLogin(this.k)
    } else {
      this.isShowForm = true
    }
  }

  get isSubmittable(): boolean {
    return this.phone != ''
  }
  get isSubmittableID(): boolean {
    return this.user.username != '' && this.user.password != ''
  }

  get btnTheme(): string {
    return this.isSubmittable ? 'primary' : 'disable'
  }
  get btnThemeID(): string {
    return this.isSubmittableID ? 'primary' : 'disable'
  }

  handleLogin(loginKey: string): void {
    this.login(loginKey).then(
      (data) => {
        this.loadPatient().then(() => {
          if (data.policy_accepted) {
            this.$router.push('/record')
          } else {
            this.$router.push('/terms')
          }
        })
      },
      (error) => {
        this.message = `ログインできませんでした。${error}`
        this.isShowForm = true
      },
    )
  }
  handleLoginWithID(): void {
    if (this.user.username && this.user.password) {
      this.loginWithID({
        username: this.user.username,
        password: this.user.password,
      }).then(
        (data) => {
          this.loadPatient().then(() => {
            if (data.policy_accepted) {
              this.$router.push('/record')
            } else {
              this.$router.push('/terms')
            }
          })
        },
        (error) => {
          this.message = `ログインできませんでした。${error}`
        },
      )
    }
  }
  handleLoginURL(): void {
    this.sendLoginURL(this.phone)
      .then((ret) => {
        if (ret.success) {
          this.message = `入力された電話番号にURLを送りました。ご確認ください。`
          this.isShowForm = false
        } else {
          this.message =
            '入力された電話番号はシステムに登録されていません。保健所にご確認ください。'
        }
      })
      .catch((err) => {
        console.error(err)
        this.message =
          '入力された電話番号はシステムに登録されていません。保健所にご確認ください。'
      })
  }
  showUserForm(): void {
    this.isShowUserForm = true
    this.isShowForm = false
  }
  showForm(): void {
    this.isShowUserForm = false
    this.isShowForm = true
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
.margin {
  margin: 30px 0;
}
.right {
  text-align: right;
}
.alert-danger {
  left: 4.27%;
  right: 4.27%;
  top: 20.07%;
  bottom: 73.22%;
  padding: 20px;

  background: #c9e3ff;
  border-radius: 10px;
}
.spanform {
  margin-top: 30px;
  text-align: right;
  text-decoration: underline;
}
</style>
