<template>
  <div>
    <h1 class="title">ログイン</h1>
    <form name="form" @submit.prevent="handleLogin">
      <div v-if="message" class="alert alert-danger" role="alert">
        {{ message }}
      </div>
      <InputTextField
        id="username"
        label="ユーザ名"
        name="username"
        value="inputLoginId"
        v-model="user.username"
        rules="required"
      />
      <InputTextField
        id="password"
        label="パスワード"
        rules="required"
        name="password"
        v-model="user.password"
        type="password"
        autocomplete="current-password"
      />
      <ActionButton
        size="L"
        :theme="btnTheme"
        :is-submittable="isSubmittable"
        @click="handleLogin"
      >
        ログイン
      </ActionButton>
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
  private user = { username: '', password: '' }
  private message = ''

  @Prop()
  k?: string

  @Auth.Getter
  private isLoggedIn!: boolean

  @Auth.Getter
  private isPolicyAccepted!: boolean

  @Auth.Action
  private login!: (data: {
    username: string
    password: string
  }) => Promise<AuthUser>

  created(): void {
    if (this.isLoggedIn && this.isPolicyAccepted) {
      this.$router.push('/record')
    }
    // キーがある場合、ユーザ名/パスワードが base64 エンコーディングされている
    if (this.k) {
      console.log(this.k)
      const decoded = atob(this.k)
      this.user.username = decoded.split('/')[0]
      this.user.password = decoded.split('/')[1]
      this.handleLogin()
    }
  }

  get isSubmittable(): boolean {
    return this.user.username !== '' && this.user.password !== ''
  }

  get btnTheme(): string {
    return this.isSubmittable ? 'primary' : 'disable'
  }

  handleLogin(): void {
    if (this.user.username && this.user.password) {
      this.login(this.user).then(
        (data) => {
          if (data.policy_accepted) {
            this.$router.push('/record')
          } else {
            this.$router.push('/terms')
          }
        },
        (error) => {
          this.message = `ログインできませんでした。${error}`
        },
      )
    }
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
