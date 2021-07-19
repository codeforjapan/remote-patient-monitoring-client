<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  metaInfo: {
    title: '遠隔療養者モニタリングシステム',
    titleTemplate: '%s | 遠隔療養者モニタリングシステム',
    htmlAttrs: {
      lang: 'ja',
    },
  },
})
</script>

<style lang="scss" scoped>
#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}
</style>
