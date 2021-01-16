<template>
  <div class="radioSwitchContainer">
    <div v-for="(item, index) in items" :key="index">
      <input
        type="radio"
        class="radio"
        :id="item.id"
        name="listOrGraph"
        :value="item.value"
        :checked="checked === item.value"
        @input="$emit('input', $event.target.value)"
      />
      <label :for="item.id" class="label">
        <svg :is="item.icon" />
        <span class="labelText">{{ item.text }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ListIcon from '@/assets/images/icon-list.svg'
import ChartAreaIcon from '@/assets/images/icon-chart-area.svg'

export default Vue.extend({
  model: {
    prop: 'checked',
    event: 'input'
  },
  components: {
    ListIcon,
    ChartAreaIcon
  },
  props: {
    checked: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      items: [
        {
          id: 'radioList',
          value: 'list',
          text: 'リスト',
          icon: ListIcon
        },
        {
          id: 'radioGraph',
          value: 'graph',
          text: 'グラフ',
          icon: ChartAreaIcon
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.radioSwitchContainer {
  display: inline-flex;
  border-radius: 8px;
  overflow: hidden;
}
.label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 8px;
  color: $white;
  background-color: $gray-1;
  svg {
    fill: currentColor;
  }
}
.radio {
  display: none;
  &:checked {
    ~ .label {
      background-color: $primary;
    }
  }
}
.labelText {
  padding-top: 4px;
  font-size: 10px;
  line-height: 1;
}
</style>
