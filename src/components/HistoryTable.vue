<template>
  <table class="historyTable">
    <thead>
      <tr class="historyRow historyHeader">
        <th class="historyCell alignLeft">記録日時</th>
        <th class="historyCell">体温</th>
        <th class="historyCell">SpO2</th>
        <th class="historyCell">脈拍</th>
        <th class="historyCell"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in this.items" :key="index" class="historyRow">
        <td class="historyCell date alignLeft">{{ getDate(item.created) }}</td>
        <td class="historyCell">{{ item.body_temperature.toFixed(1) }}</td>
        <td class="historyCell">{{ item.SpO2.toFixed(1) }}</td>
        <td class="historyCell">{{ item.pulse.toFixed(1) }}</td>
        <td class="historyCell">
          <ActionButton
            size="S"
            theme="text"
            :is-inline="true"
            :to="`/detail/${item.statusId}`"
          >
            <AngleRightIcon />
          </ActionButton>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import ActionButton from '@/components/ActionButton.vue'
import { Status } from '@/@types/component-interfaces/status'
import AngleRightIcon from '@/assets/images/icon-angle-right.svg'

export default Vue.extend({
  components: {
    AngleRightIcon,
    ActionButton,
  },
  props: {
    items: {
      type: Array as () => Status[],
      default: [],
    },
  },
  methods: {
    getDate(date: string): string {
      return dayjs(date).format('MM/DD HH:mm')
    },
  },
})
</script>

<style lang="scss" scoped>
.historyTable {
  width: 100%;
  border-collapse: collapse;
}
.historyRow {
  border-bottom: 1px solid $gray-2;
  tbody &:last-child {
    border: none;
  }
}
.historyCell {
  font-size: 16px;
  padding: 16px 8px;
  text-align: right;
  .historyHeader & {
    font-size: 14px;
    font-weight: normal;
  }
  &.date {
    font-weight: bold;
  }
  &.alignLeft {
    text-align: left;
  }
}
</style>
