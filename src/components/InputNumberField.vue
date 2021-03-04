<template>
  <validation-provider :name="name" :rules="rules" tag="div">
    <div class="inputFieldContainer">
      <label :for="id" class="labelText">{{ label }}</label>
      <VInputField
        :id="id"
        type="number"
        :name="name"
        :placeholder="placeholder"
        :step="step"
        :value="value"
        :unit="unit"
        :required="required"
        :floating-point="floatingPoint"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </validation-provider>
</template>

<script lang="ts">
import VInputField from '@/components/VInputField.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  components: {
    VInputField,
  },
})
export default class InputNumberField extends Vue {
  @Prop({ type: String, default: '' })
  id: string | undefined

  @Prop({ type: String, default: '' })
  rules: string | undefined

  @Prop({ type: String, default: 0 })
  value: string | undefined

  @Prop({ type: String, default: '' })
  label: string | undefined

  @Prop({ type: String, default: '' })
  name: string | undefined

  @Prop({ type: String, default: '' })
  placeholder: string | undefined

  @Prop({ type: String, default: '' })
  unit: string | undefined

  @Prop({ type: Number, default: 0 })
  step: number | undefined

  @Prop({ type: Boolean, default: false })
  required: boolean | undefined

  @Prop({ type: Boolean, default: false })
  floatingPoint: boolean | undefined
}
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
