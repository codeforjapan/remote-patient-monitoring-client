<template>
  <label class="inputFieldContainer">
    <span class="labelText">{{ label }}</span>
    <VInputField
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      font-size="S"
      @input="$emit('input', $event)"
      @validate="$emit('validate', $event)"
    />
  </label>
</template>

<script lang="ts">
import Vue from 'vue'
import VInputField from '@/components/VInputField.vue'

export default Vue.extend({
  components: {
    VInputField
  },
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
.labelText {
  font-size: 16px;
  margin-bottom: 8px;
}
</style>
