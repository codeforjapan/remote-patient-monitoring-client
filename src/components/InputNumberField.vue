<template>
  <label class="inputFieldContainer">
    <span class="labelText">{{ label }}</span>
    <VInputField
      type="number"
      :name="name"
      :placeholder="placeholder"
      :step="step"
      :value="value"
      :unit="unit"
      :required="required"
      :floating-point="floatingPoint"
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
    VInputField,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    unit: {
      type: String,
      default: '',
    },
    step: {
      type: Number,
      default: 0,
    },
    required: {
      type: Boolean,
      default: false,
    },
    floatingPoint: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.inputFieldContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.labelText {
  flex: 0 0 35%;
  font-size: 20px;
}
</style>
