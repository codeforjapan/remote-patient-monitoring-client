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
import { ApexOptions } from 'apexcharts'

@Component({
  components: {
    VueApexCharts,
  },
})
export default class HistoryGraph extends Vue {
  @Prop({ type: Array as () => Status[], default: [] })
  items!: Status[]

  get chartOptions(): ApexOptions {
    return {
      chart: {
        type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        inverseOrder: true,
      },
      colors: ['#FF8000', '#03AF7A', '#05A'],
      stroke: {
        curve: 'straight',
        width: 2,
      },
      xaxis: {
        type: 'datetime',
        title: { text: '日付' },
        labels: {
          formatter: (val: string) => {
            return dayjs(val).format('MM/DD HH:mm')
          },
        },
        tooltip: {
          formatter: (val: string) => {
            return dayjs(val).format('MM/DD HH:mm')
          },
        },
      },
      yaxis: [
        {
          seriesName: '脈拍',
          decimalsInFloat: 0,
          labels: {
            style: {
              colors: '#FF8000',
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
        },
        {
          seriesName: '体温',
          decimalsInFloat: 1,
          labels: {
            style: {
              colors: '#03AF7A',
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
        },
        {
          seriesName: 'SpO2',
          decimalsInFloat: 0,
          labels: {
            style: {
              colors: '#05A',
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
        },
      ],
    }
  }

  get series(): Array<{ name: string; data: { x: string; y: string }[] }> {
    const bodyTemperatures = this.items.map((item) => {
      return {
        x: item.created,
        y: item.body_temperature.toFixed(1),
      }
    })
    const spO2s = this.items.map((item) => {
      return {
        x: item.created,
        y: item.SpO2.toFixed(1),
      }
    })
    //)
    const pulses = this.items.map((item) => {
      return {
        x: item.created,
        y: item.pulse.toFixed(1),
      }
    })

    console.log(this.items, bodyTemperatures)
    return [
      { name: '脈拍', data: pulses },
      { name: '体温', data: bodyTemperatures },
      { name: 'SpO2', data: spO2s },
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
