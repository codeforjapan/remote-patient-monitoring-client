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
    <h1>{{ date }}</h1>
    <div class="message">体調記録を登録しました</div>
    <StatusInfo :status="status" />
    <DeleteRecord :status-id="status.statusId" />
    <FooterButtons />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import AngleLeftIcon from '@/assets/images/icon-angle-left.svg'
import ActionButton from '@/components/ActionButton.vue'
import StatusInfo from '@/components/StatusInfo.vue'
import DeleteRecord from '@/components/DeleteRecord.vue'
import FooterButtons from '@/components/FooterButtons.vue'

export default Vue.extend({
  components: {
    AngleLeftIcon,
    ActionButton,
    StatusInfo,
    DeleteRecord,
    FooterButtons
  },
  data() {
    return {
      status: {
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
      }
    }
  },
  computed: {
    date: {
      get(): string {
        return dayjs(this.status.created).format('YYYY/MM/DD HH:mm')
      }
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
.message {
  background-color: $alert-normal;
  border-radius: 10px;
  margin: 16px 0;
  padding: 16px;
}
</style>
