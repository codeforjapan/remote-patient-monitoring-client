<template>
  <div class="history-graph">
    <VueApexCharts type="line" :options="chartOptions" :series="series" />
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
  items!: Status[]

  get chartOptions(): any {
    const createds = this.items.map((item) => dayjs(item.created).toDate())

    return {
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
      colors: ['#4CD964', '#855CF8', '#E24242'],
      stroke: {
        curve: 'straight',
        width: 2,
      },
      xaxis: {
        type: 'datetime',
        title: { text: '日付' },
        labels: { format: 'MM/dd HH:mm' },
        tooltip: {
          formatter: (val: any, opts: any) => {
            return dayjs(val).format('MM/DD HH:mm')
          },
        },
      },
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
        {
          seriesName: '脈拍',
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
      ],
    }
  }

  get series(): Array<any> {
    const bodyTemperatures = this.items.map((item: any) => {
      return {
        x: item.created,
        y: item.body_temperature.toFixed(1),
      }
    })
    const spO2s = this.items.map((item: any) => {
      return {
        x: item.created,
        y: item.SpO2.toFixed(1),
      }
    })
    //)
    const pulses = this.items.map((item: any) => {
      return {
        x: item.created,
        y: item.pulse.toFixed(1),
      }
    })

    console.log(this.items, bodyTemperatures)
    return [
      { name: '体温', data: bodyTemperatures },
      { name: 'SpO2', data: spO2s },
      { name: '脈拍', data: pulses },
    ]
  }
}
</script>

<style lang="scss" scoped>
.history-graph {
  width: 100%;
  height: 100%;
}
</style>
