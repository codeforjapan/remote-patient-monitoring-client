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
      <tr v-for="(item, index) in items" :key="index" class="historyRow">
        <td class="historyCell date alignLeft">{{ getDate(item.created) }}</td>
        <td class="historyCell">{{ item.body_temperature.toFixed(1) }}</td>
        <td class="historyCell">{{ item.SpO2.toFixed(1) }}</td>
        <td class="historyCell">{{ item.pulse.toFixed(1) }}</td>
        <td class="historyCell"></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Status } from '@/@types/component-interfaces/status'
import dayjs from 'dayjs'
import Vue from 'vue'
export default Vue.extend({
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
