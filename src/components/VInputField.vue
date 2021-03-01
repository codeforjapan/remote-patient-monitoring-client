<template>
  <div class="inputFieldOuter">
    <div class="inputFieldControl">
      <input
        class="inputField"
        :class="{ 'inputField-error': showError }"
        :style="{ fontSize: fontSizeMap.get(fontSize) }"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :step="step"
        :value="value"
        :autocomplete="autocomplete"
        @input="$emit('input', $event)"
      />
      <small class="message">{{ errorMessage }}</small>
    </div>
    <span v-if="unit" class="unit">{{ unit }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Rules = {
  [key: string]: {
    isValid: boolean
    message: string
  }
}
type SizeType = 'M' | 'S'
type FontSizeType = string

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
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
    fontSize: {
      type: String,
      default: 'M',
    },
    autocomplete: {
      type: String,
      default: 'on',
    },
    unit: {
      type: String,
      default: '',
    },
  },
  watch: {
    rules() {
      this.showError = this.hasErrors
    },
    value() {
      this.$emit('validate', !this.hasErrors)
    },
  },
  data(): {
    showError: boolean
    fontSizeMap: Map<SizeType, FontSizeType>
  } {
    return {
      showError: false,
      fontSizeMap: new Map([
        ['M', '20px'],
        ['S', '16px'],
      ]),
    }
  },
  computed: {
    rules(): Rules {
      return {
        required: {
          isValid: this.ruleRequired,
          message: '必須項目です', // TODO: メッセージを確定させる
        },
        floatingPoint: {
          isValid: this.ruleFloatingPoint,
          message: '小数点まで入力してください', // TODO: メッセージを確定させる
        },
      }
    },
    ruleRequired(): boolean {
      if (!this.required) return true
      return Boolean(this.value)
    },
    ruleFloatingPoint(): boolean {
      if (!this.floatingPoint) return true
      return this.value.match(/\d+\.\d/) != null
    },
    errorMessage(): string {
      if (!this.showError) return ''
      const key = Object.keys(this.rules).find(
        (key) => !this.rules[key].isValid,
      )
      if (!key) return ''
      return this.rules[key].message
    },
    hasErrors(): boolean {
      return Object.keys(this.rules).some(
        (key: string) => !this.rules[key].isValid,
      )
    },
  },
})
</script>

<style lang="scss" scoped>
.inputFieldOuter {
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.inputFieldControl {
  flex: 1 1 auto;
}
.inputField {
  width: 100%;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid $gray-2;
  &:focus {
    outline-color: $primary;
  }
  &-error {
    border: 1px solid $error;
    &:focus {
      outline-color: $error;
    }
  }
}
.labelText {
  flex: 0 0 35%;
  font-size: 20px;
}
.message {
  display: block;
  color: $error;
  font-size: 14px;
  height: 14px;
}
.unit {
  font-size: 20px;
  padding-left: 8px;
  padding-bottom: 14px;
}
</style>
