<template>
  <label class="inputFieldContainer">
    <span class="labelText">{{ label }}</span>
    <input
      class="inputField"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.inputFieldContainer {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
}
.inputField {
  font-size: 16px;
  padding: 16px;
  margin-top: 8px;
  border-radius: 6px;
  border: 1px solid $gray-2;
  &:focus {
    outline-color: $primary;
  }
  &:invalid:not(:focus) {
    border: 2px solid $error;
  }
}
.labelText {
  font-size: 16px;
}
</style>
