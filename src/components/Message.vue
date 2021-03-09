<template>
  <div class="message" :class="`type${messageType}`">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isError: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    messageType() {
      return this.isError ? 'Error' : 'Normal'
    },
  },
})
</script>

<style lang="scss" scoped>
.message {
  border-radius: 10px;
  margin: 16px 0;
  padding: 16px;
}
.typeNormal {
  background-color: $alert-normal;
}
.typeError {
  background-color: $alert-error;
  font-weight: 600;
}
</style>
