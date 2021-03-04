<template>
  <validation-provider :name="name" :rules="rules" tag="div">
    <div slot-scope="ProviderProps">
      <div class="inputFieldContainer">
        <label :for="id" class="labelText">{{ label }}</label>
        <VInputField
          :id="id"
          :type="type"
          :name="name"
          :placeholder="placeholder"
          :value="value"
          font-size="S"
          :autocomplete="autocomplete"
          @input="$emit('input', $event.target.value)"
        />
      </div>
      <span class="error">{{ ProviderProps.errors[0] }}</span>
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
export default class InputTextField extends Vue {
  @Prop({ type: String, default: '' })
  id: string | undefined

  @Prop({ type: String, default: '' })
  rules: string | undefined

  @Prop({ type: String, default: 'text' })
  type: string | undefined

  @Prop({ type: String, default: '' })
  value: string | undefined

  @Prop({ type: String, default: '' })
  label: string | undefined

  @Prop({ type: String, default: '' })
  name: string | undefined

  @Prop({ type: String, default: '' })
  placeholder: string | undefined

  @Prop({ type: String, default: 'on' })
  autocomplete: string | undefined
}
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
