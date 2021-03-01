<template>
  <div>
    <h1 class="title">仮）遠隔モニタリングシステム</h1>
    <ActionButton size="L" theme="primary" to="/login"> ログイン </ActionButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionButton from '@/components/ActionButton.vue'

export default Vue.extend({
  components: {
    ActionButton,
  },
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 24px;
  text-align: center;
}
</style>
