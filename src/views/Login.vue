<template>
  <div>
    <h1 class="title">ログイン</h1>
    <form name="form" @submit.prevent="handleLogin">
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
      <div class="form-group">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
          ></span>
          <span>ログイン</span>
        </button>
      </div>
      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div>
    </form>
    <div class="right">
      <router-link to="/terms">
        パスワードを忘れた場合
      </router-link>
    </div>
    <div class="margin">
      <router-link to="/terms">
        利用規約を読む
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { AuthUser } from '../modules/auth.module'
import InputTextField from '@/components/InputTextField.vue'
const Auth = namespace('Auth')

@Component({
  components: {
    InputTextField
  }
})
export default class Login extends Vue {
  private user = { username: '', password: '' }
  private loading = false
  private message = ''

  @Auth.Getter
  private isLoggedIn!: boolean

  @Auth.Action
  private login!: (data: {
    username: string
    password: string
  }) => Promise<AuthUser>

  created() {
    if (this.isLoggedIn) {
      //this.$router.push('/record')
    }
  }

  handleLogin() {
    this.loading = true
    if (this.user.username && this.user.password) {
      this.login(this.user).then(
        data => {
          console.log(data)
          this.$router.push('/record')
        },
        error => {
          this.loading = false
          this.message = error
        }
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
</style>
