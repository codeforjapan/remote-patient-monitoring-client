<template>
  <validation-provider :name="name" :rules="rules">
    <div slot-scope="ProviderProps">
      <label class="inputFieldContainer">
        <span class="labelText">{{ label }}</span>
        <VInputField
          :type="type"
          :name="name"
          :placeholder="placeholder"
          :value="value"
          font-size="S"
          @input="$emit('input', $event.target.value)"
        />
        <span class="error">{{ ProviderProps.errors[0] }}</span>
      </label>
    </div>
  </validation-provider>
</template>

<script lang="ts">
import VInputField from '@/components/VInputField.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  components: {
    VInputField
  }
})
export default class VeeInputTextField extends Vue {
  @Prop({ type: String, default: '' })
  username: string | undefined

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
