<template>
  <div>
    <h1 class="title">ログイン</h1>
    <InputField
      label="ログインID"
      name="loginId"
      :value="inputLoginId"
      @input="inputLoginId = $event"
    />
    <InputField
      label="パスワード"
      type="password"
      name="password"
      :value="inputPassword"
      @input="inputPassword = $event"
    />
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
    <div class="margin">
      <VCheckbox name="agree" v-model="agree">
        利用規約に同意する
      </VCheckbox>
    </div>
    <ActionButton size="L" theme="primary" @click="handleLogin">
      ログイン
    </ActionButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionButton from '@/components/ActionButton.vue'
import InputField from '@/components/InputField.vue'
import VCheckbox from '@/components/VCheckbox.vue'

export default Vue.extend({
  components: {
    ActionButton,
    InputField,
    VCheckbox
  },
  data() {
    return {
      inputLoginId: '',
      inputPassword: '',
      agree: false
    }
  },
  methods: {
    handleLogin() {
      this.$router.push({ name: 'Record' })
    }
  }
})
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
