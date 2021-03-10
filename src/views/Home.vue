<template>
  <div class="homeContainer">
    <h1 class="title">遠隔療養者モニタリングシステム</h1>
    <Logo class="logoImage" />
    <ActionButton size="L" theme="primary" to="/login"> ログイン </ActionButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionButton from '@/components/ActionButton.vue'
import Logo from '@/assets/images/logo.svg'

export default Vue.extend({
  components: {
    ActionButton,
    Logo,
  },
})
</script>

<style lang="scss" scoped>
.homeContainer {
  margin: 235px 0;
}
.title {
  font-size: 24px;
  text-align: center;
}
.logoImage {
  display: block;
  margin: 40px auto 75px;
  max-width: 128px;
  width: 100%;
  filter: drop-shadow(0 0 20px rgba(196, 198, 204, 0.3));
}
</style>
