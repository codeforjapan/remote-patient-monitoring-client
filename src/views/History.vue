<template>
  <div>
    <div class="headerButtonContainer">
      <ActionButton size="S" theme="text" :is-inline="true" to="/record">
        <AngleLeftIcon />
      </ActionButton>
      <ActionButton size="S" theme="primary" :is-inline="true" to="/record">
        体調を記録する
      </ActionButton>
    </div>
    <HistoryTable :items="statuses" />
    <FooterButtons />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AngleLeftIcon from '@/assets/images/icon-angle-left.svg'
import ActionButton from '@/components/ActionButton.vue'
import HistoryTable from '@/components/HistoryTable.vue'
import FooterButtons from '@/components/FooterButtons.vue'

export default Vue.extend({
  components: {
    AngleLeftIcon,
    ActionButton,
    HistoryTable,
    FooterButtons
  },
  data() {
    return {
      statuses: [
        {
          statusId: 'string',
          patientId: 'string',
          centerId: 'string',
          created: '2021-01-11T13:06:25.212Z',
          SpO2: 98,
          body_temperature: 37.0,
          pulse: 81,
          symptom: {
            symptomId: 'string',
            cough: true,
            phlegm: true,
            suffocation: true,
            headache: true,
            sore_throat: true,
            remarks: '昨日の20時ごろから咳が止まらない。'
          }
        },
        {
          statusId: 'string',
          patientId: 'string',
          centerId: 'string',
          created: '2021-01-12T13:06:25.212Z',
          SpO2: 98,
          body_temperature: 37.6,
          pulse: 81,
          symptom: {
            symptomId: 'string',
            cough: true,
            phlegm: true,
            suffocation: true,
            headache: true,
            sore_throat: true,
            remarks: '昨日の20時ごろから咳が止まらない。'
          }
        },
        {
          statusId: 'string',
          patientId: 'string',
          centerId: 'string',
          created: '2021-01-13T13:06:25.212Z',
          SpO2: 98,
          body_temperature: 37.3,
          pulse: 81,
          symptom: {
            symptomId: 'string',
            cough: true,
            phlegm: true,
            suffocation: true,
            headache: true,
            sore_throat: true,
            remarks: '昨日の20時ごろから咳が止まらない。'
          }
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.headerButtonContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
