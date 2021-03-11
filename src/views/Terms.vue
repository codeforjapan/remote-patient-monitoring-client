<template>
  <div>
    <h1 class="title">利用規約</h1>
    <div v-if="message" class="alert alert-danger" role="alert">
      {{ message }}
    </div>

    <div class="termsContainer">
      <p>
        利用規約文<br /><br />
        テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。
      </p>
      <div class="margin">
        <VCheckbox v-model="isCheckedPolicy" name="policy">
          利用規約に同意する
        </VCheckbox>
      </div>
      <ActionButton
        size="L"
        class="linkBtn"
        :theme="btnTheme"
        :is-submittable="isSubmittable"
        @click="handleLogin"
      >
        体調記録へ
      </ActionButton>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { AuthUser } from '@/store/modules/auth.module'
import ActionButton from '@/components/ActionButton.vue'
import VCheckbox from '@/components/VCheckbox.vue'
const Auth = namespace('Auth')

@Component({
  components: {
    ActionButton,
    VCheckbox,
  },
})
export default class Login extends Vue {
  private message = ''
  private isCheckedPolicy = false

  @Auth.Action
  private acceptPolicy!: () => Promise<AuthUser>

  get isSubmittable(): boolean {
    return this.isCheckedPolicy
  }

  get btnTheme(): string {
    return this.isSubmittable ? 'primary' : 'disable'
  }

  handleLogin(): void {
    if (this.isCheckedPolicy) {
      this.acceptPolicy().then(
        () => {
          this.$router.push('/record')
        },
        (error) => {
          this.message = `ログインできませんでした。${error}`
        },
      )
    } else {
      this.message = '利用規約に同意していません。'
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
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
.termsContainer {
  margin: 30px 16px;
  padding: 16px;
  background: $white;
  border-radius: 4px;
}
.margin {
  margin: 30px 0;
}
.linkBtn {
  margin-bottom: 16px;
}
</style>
