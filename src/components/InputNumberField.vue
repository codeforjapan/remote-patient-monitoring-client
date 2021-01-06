<template>
  <label class="inputFieldContainer">
    <span class="labelText">{{ label }}</span>
    <div class="inputFieldOuter">
      <input
        class="inputField"
        type="number"
        :name="name"
        :placeholder="placeholder"
        :step="step"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
      <span v-if="unit" class="unit">{{ unit }}</span>
    </div>
  </label>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
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
    },
    unit: {
      type: String,
      default: ''
    },
    step: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style lang="scss" scoped>
.inputFieldContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.inputFieldOuter {
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.inputField {
  flex: 1 1 auto;
  width: 0;
  font-size: 20px;
  padding: 16px;
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
  flex: 0 0 48%;
  font-size: 20px;
}
.unit {
  font-size: 20px;
  padding-left: 8px;
}
</style>
