<template>
  <label class="inputFieldContainer">
    <span class="labelText">{{ label }}</span>
    <div class="inputFieldOuter">
      <div class="inputFieldControl">
        <input
          class="inputField"
          :class="{ 'inputField-error': showError }"
          type="number"
          :name="name"
          :placeholder="placeholder"
          :step="step"
          :value="value"
          @input="$emit('input', $event.target.value)"
        />
        <small class="message">{{ errorMessage }}</small>
      </div>
      <span v-if="unit" class="unit">{{ unit }}</span>
    </div>
  </label>
</template>

<script lang="ts">
import Vue from 'vue'

type Rules = {
  [key: string]: {
    isValid: boolean
    message: string
  }
}

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
    },
    required: {
      type: Boolean,
      default: false
    },
    floatingPoint: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    rules() {
      this.showError = this.hasErrors
    },
    value() {
      this.$emit('validate', !this.hasErrors)
    }
  },
  data(): { showError: boolean } {
    return {
      showError: false
    }
  },
  computed: {
    rules(): Rules {
      return {
        required: {
          isValid: this.ruleRequired,
          message: '必須項目です' // TODO: メッセージを確定させる
        },
        floatingPoint: {
          isValid: this.ruleFloatingPoint,
          message: '小数点まで入力してください' // TODO: メッセージを確定させる
        }
      }
    },
    ruleRequired(): boolean {
      if (!this.required) return true
      return Boolean(this.value)
    },
    ruleFloatingPoint(): boolean {
      if (!this.floatingPoint) return true
      return Number(this.value) % 1 !== 0
    },
    errorMessage(): string {
      if (!this.showError) return ''
      const key = Object.keys(this.rules).find(key => !this.rules[key].isValid)
      if (!key) return ''
      return this.rules[key].message
    },
    hasErrors(): boolean {
      return Object.keys(this.rules).some(
        (key: string) => !this.rules[key].isValid
      )
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../assets/fields.scss';
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
.inputFieldControl {
  flex: 1 1 auto;
  width: 0;
}
.inputField {
  width: 100%;
  font-size: 20px;
}
.labelText {
  flex: 0 0 48%;
  font-size: 20px;
}
$message-height: 11px;
.unit {
  font-size: 20px;
  padding-left: 8px;
  padding-bottom: $message-height;
}
.message {
  display: block;
  font-size: $message-height;
  color: $error;
  height: $message-height;
}
</style>
