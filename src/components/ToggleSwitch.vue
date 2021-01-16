<template>
  <div class="toggleSwitchContainer">
    <div class="labelText">{{ label }}</div>
    <div class="toggleSwitch">
      <input
        type="checkbox"
        :id="name"
        class="checkbox"
        :checked="checked"
        :value="value"
        @input="$emit('input', $event.target.checked, $event.target.value)"
      />
      <label class="switch" :for="name" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.toggleSwitchContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.switch {
  position: relative;
  display: flex;
  align-items: center;
  &::before,
  &::after {
    content: '';
  }
  &::before {
    width: 2.6em;
    height: 1.2em;
    border-radius: 3em;
    background: $gray-4;
    padding: 3px;
  }
  &::after {
    position: absolute;
    width: 1.2em;
    height: 1.2em;
    background: $white;
    border-radius: 50%;
    left: 3px;
    transition: 0.3s ease;
  }
}
.checkbox {
  display: none;
  &:checked {
    ~ .switch {
      &::before {
        background: $primary;
      }
      &::after {
        left: calc(2.6em - 1.2em + 4px);
      }
    }
  }
}
.labelText {
  font-size: 20px;
}
</style>
