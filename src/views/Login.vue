<template>
  <div>
    <h1 class="title">ログイン</h1>
    <form name="form" @submit.prevent="handleLogin">
      <div v-if="message" class="alert alert-danger" role="alert">
        {{ message }}
      </div>
      <InputTextField
        label="ユーザ名"
        name="username"
        value="inputLoginId"
        v-model="user.username"
        rules="required"
      />
      <InputTextField
        label="パスワード"
        rules="required"
        name="password"
        v-model="user.password"
        type="password"
        autocomplete="current-password"
      />
      <div class="right">
        <router-link to="/terms"> パスワードを忘れた場合 </router-link>
      </div>
      <div class="margin">
        <router-link to="/terms"> 利用規約を読む </router-link>
      </div>
      <div class="form-group">
        <ActionButton size="L" theme="primary" @click="handleLogin">
          ログイン
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
  private user = { username: '', password: '' }
  private loading = false
  private message = ''

  @Prop()
  k?: string

  @Auth.Getter
  private isLoggedIn!: boolean

  @Auth.Action
  private login!: (data: {
    username: string
    password: string
  }) => Promise<AuthUser>

  created(): void {
    if (this.isLoggedIn) {
      //this.$router.push('/record')
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

  handleLogin(): void {
    this.loading = true
    if (this.user.username && this.user.password) {
      this.login(this.user).then(
        (data) => {
          console.log(data)
          this.$router.push('/record')
        },
        (error) => {
          this.loading = false
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
