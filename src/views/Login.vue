<template>
  <div>
    <h1 class="title">ログイン</h1>
    <form name="form" @submit.prevent="handleLogin">
      <div v-if="message" class="alert alert-danger" role="alert">
        {{ message }}
      </div>
      <div v-if="showForm">
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
const Auth = namespace('Auth')

@Component({
  components: {
    InputTextField,
    ActionButton,
  },
})
export default class Login extends Vue {
  private phone = ''
  private message = ''
  private showForm = false

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
  private sendLoginURL!: (
    phone: string,
  ) => Promise<{ success: boolean; loginKey: string | undefined }>

  @Auth.Action
  private refreshToken!: () => Promise<AuthUser>

  created(): void {
    if (this.isLoggedIn) {
      // ログインしているがセッション切れ
      if (this.isExpired) {
        // refreshToken を使って再認証
        this.refreshToken().then(() => {
          if (this.isPolicyAccepted) {
            this.$router.push('/terms')
          } else {
            this.$router.push('/record')
          }
        })
      } else {
        this.$router.push('/record')
      }
    }
    // キーがある場合、ログイン用のTokenがついている
    if (this.k) {
      console.log(this.k)
      this.handleLogin(this.k)
    } else {
      this.showForm = true
    }
  }

  get isSubmittable(): boolean {
    return this.phone != ''
  }

  get btnTheme(): string {
    return this.isSubmittable ? 'primary' : 'disable'
  }

  handleLogin(loginKey: string): void {
    this.login(loginKey).then(
      (data) => {
        if (data.policy_accepted) {
          this.$router.push('/record')
        } else {
          this.$router.push('/terms')
        }
      },
      (error) => {
        this.message = `ログインできませんでした。${error}`
        this.showForm = true
      },
    )
  }
  handleLoginURL(): void {
    this.sendLoginURL(this.phone)
      .then((ret) => {
        if (ret.success) {
          console.log(ret.loginKey)
          this.message = `入力された電話番号にURLを送りました。ご確認ください。`
          this.showForm = false
        } else {
          this.message =
            '入力された電話番号はシステムに登録されていません。保健所にご確認ください。'
        }
      })
      .catch((err) => {
        console.log(err)
        this.message =
          '入力された電話番号はシステムに登録されていません。保健所にご確認ください。'
      })
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
</style>
