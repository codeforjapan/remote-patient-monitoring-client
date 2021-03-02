<template>
  <div>
    <div class="history-graph">
      <VueApexCharts type="line" :options="chartOptions" :series="series" />
    </div>
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
          <td class="historyCell date alignLeft">
            {{ getDate(item.created) }}
          </td>
          <td class="historyCell">{{ item.body_temperature.toFixed(1) }}</td>
          <td class="historyCell">{{ item.SpO2.toFixed(1) }}</td>
          <td class="historyCell">{{ item.pulse.toFixed(1) }}</td>
          <td class="historyCell"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Status } from '@/@types/component-interfaces/status'
import dayjs from 'dayjs'
import VueApexCharts from 'vue-apexcharts'

@Component({
  components: {
    VueApexCharts,
  },
})
export default class HistoryGraph extends Vue {
  @Prop({ type: Array as () => Status[], default: [] })
  items!: Status[] | []

  chartOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      inverseOrder: true,
    },
    colors: ['#4CD964', '#E24242', '#855CF8'],
    stroke: {
      curve: 'straight',
      width: 2,
    },
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    yaxis: [
      {
        seriesName: '体温',
        decimalsInFloat: 1,
        labels: {
          style: {
            colors: ['#4CD964'],
          },
        },
        min: 34,
        max: 40,
        crosshairs: {
          show: true,
          position: 'back',
        },
        tooltip: {
          enabled: true,
        },
        float: true,
      },
      {
        seriesName: '血圧',
        decimalsInFloat: 0,
        labels: {
          style: {
            colors: ['#E24242'],
          },
        },
        min: 30,
        max: 150,
        crosshairs: {
          show: true,
          position: 'back',
        },
        tooltip: {
          enabled: true,
        },
        float: true,
      },
      {
        seriesName: 'SpO2',
        decimalsInFloat: 0,
        labels: {
          style: {
            colors: ['#855CF8'],
          },
        },
        min: 90,
        max: 100,
        crosshairs: {
          show: true,
          position: 'back',
        },
        tooltip: {
          enabled: true,
        },
        float: true,
      },
    ],
  }
  series = [
    {
      name: '体温',
      data: [
        35.4,
        35.0,
        36.0,
        36.4,
        36.6,
        36.9,
        37.5,
        36.4,
        36.5,
        36.3,
        37.2,
        37.5,
        38.5,
        37.5,
        36.5,
      ],
    },
    {
      name: '血圧',
      data: [
        120,
        132,
        121,
        104,
        99,
        96,
        84,
        90,
        100,
        104,
        105,
        104,
        123,
        110,
        130,
      ],
    },
    {
      name: 'SpO2',
      data: [99, 98, 96, 97, 96, 97, 98, 99, 100, 100, 97, 98, 99, 96, 95],
    },
  ]

  getDate(date: string): string {
    return dayjs(date).format('MM/DD HH:mm')
  }
}
</script>
