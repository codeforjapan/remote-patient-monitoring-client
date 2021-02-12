<template>
  <div>
    <div class="headerButtonContainer">
      <ActionButton size="S" theme="text" :is-inline="true" to="/record">
        <AngleLeftIcon />
      </ActionButton>
      <ActionButton size="S" theme="outline" :is-inline="true" to="/record">
        体調を記録する
      </ActionButton>
    </div>
    <header class="header">
      <h1 class="headerTitle">体調記録</h1>
      <ListOrGraphSwitch v-model="displayMode" />
    </header>
    <HistoryTable :items="statuses" />
    <FooterButtons />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AngleLeftIcon from '@/assets/images/icon-angle-left.svg'
import ActionButton from '@/components/ActionButton.vue'
import ListOrGraphSwitch from '@/components/ListOrGraphSwitch.vue'
import HistoryTable from '@/components/HistoryTable.vue'
import FooterButtons from '@/components/FooterButtons.vue'

@Component({
  components: {
    AngleLeftIcon,
    ActionButton,
    ListOrGraphSwitch,
    HistoryTable,
    FooterButtons
  }
})
export default class History extends Vue {
  displayMode = 'list'
  statuses = [
    {
      statusId: 'string',
      patientId: 'string',
      centerId: 'string',
      created: '2021-01-11T13:06:25.212Z',
      SpO2: 98,
      bodyTemperature: 37.0,
      pulse: 81,
      symptom: {
        symptomId: 'string',
        cough: true,
        phlegm: true,
        suffocation: true,
        headache: true,
        soreThroat: true,
        remarks: '昨日の20時ごろから咳が止まらない。'
      }
    },
    {
      statusId: 'string',
      patientId: 'string',
      centerId: 'string',
      created: '2021-01-12T13:06:25.212Z',
      SpO2: 98,
      bodyTemperature: 37.6,
      pulse: 81,
      symptom: {
        symptomId: 'string',
        cough: true,
        phlegm: true,
        suffocation: true,
        headache: true,
        soreThroat: true,
        remarks: '昨日の20時ごろから咳が止まらない。'
      }
    },
    {
      statusId: 'string',
      patientId: 'string',
      centerId: 'string',
      created: '2021-01-13T13:06:25.212Z',
      SpO2: 98,
      bodyTemperature: 37.3,
      pulse: 81,
      symptom: {
        symptomId: 'string',
        cough: true,
        phlegm: true,
        suffocation: true,
        headache: true,
        soreThroat: true,
        remarks: '昨日の20時ごろから咳が止まらない。'
      }
    }
  ]
}
</script>

<style lang="scss" scoped>
.headerButtonContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  display: flex;
  align-items: center;
}
.headerTitle {
  margin-right: 12px;
}
</style>
