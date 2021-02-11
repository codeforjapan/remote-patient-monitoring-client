<template>
  <validation-provider :name="name" :rules="rules">
    <div slot-scope="ProviderProps">
      <label for="username" class="inputFieldContainer">
        <span class="labelText">{{ label }}</span>
        <input
          :v-model="username"
          :type="type"
          class="form-control"
          :name="name"
          :placeholder="placeholder"
          :value="value"
          font-size="S"
        />
        <p class="error">{{ ProviderProps.errors[0] }}</p>
      </label>
    </div>
  </validation-provider>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
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
