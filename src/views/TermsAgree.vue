<template>
  <div>
    <h1 class="title">利用規約</h1>
    <div v-if="message" class="alert alert-danger" role="alert">
      {{ message }}
    </div>

    <div class="termsContainer">
      <PolicyText />
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
        @click="handlePolicy"
      >
        体調記録へ
      </ActionButton>
      <div class="logout">
        <a @click="logout">ログアウトしてトップに戻る</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { AuthUser } from '@/store/modules/auth.module'
import ActionButton from '@/components/ActionButton.vue'
import PolicyText from '@/components/PolicyText.vue'
import VCheckbox from '@/components/VCheckbox.vue'
const Auth = namespace('Auth')

@Component({
  components: {
    ActionButton,
    PolicyText,
    VCheckbox,
  },
  metaInfo: {
    title: '利用規約に同意する',
  },
})
export default class TermsAgree extends Vue {
  private message = ''
  private isCheckedPolicy = false

  @Auth.Action
  private acceptPolicy!: () => Promise<AuthUser>
  @Auth.Action
  private signOut!: () => void

  get isSubmittable(): boolean {
    return this.isCheckedPolicy
  }

  get btnTheme(): string {
    return this.isSubmittable ? 'primary' : 'disable'
  }

  handlePolicy(): void {
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
  logout(): void {
    this.signOut()
    this.$router.push('/')
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
.logout {
  margin-top: 30px;
  text-align: right;
  text-decoration: underline;
}
</style>
