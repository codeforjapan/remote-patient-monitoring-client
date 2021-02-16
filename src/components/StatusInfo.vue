<template>
  <dl class="statusInfoList">
    <div class="statusInfoInner">
      <dt>体温</dt>
      <dd>{{ status.body_temperature.toFixed(1) }}℃</dd>
    </div>
    <div class="statusInfoInner">
      <dt>酸素飽和度(SpO2)</dt>
      <dd>{{ status.SpO2 }}％</dd>
    </div>
    <div class="statusInfoInner">
      <dt>脈拍</dt>
      <dd>{{ status.pulse }}</dd>
    </div>
    <div class="statusInfoInner symptomsInfo">
      <dt class="symptomsTitle">症状</dt>
      <dd>
        <div>
          <span class="symptom" v-if="status.symptom.cough">せき</span>
          <span class="symptom" v-if="status.symptom.phlegm">たん</span>
          <span class="symptom" v-if="status.symptom.suffocation"
            >息苦しさ</span
          >
          <span class="symptom" v-if="status.symptom.headache">頭痛</span>
          <span class="symptom" v-if="status.symptom.sore_throat"
            >喉の痛み</span
          >
        </div>
        <div class="symptomRemarks">{{ status.symptom.remarks }}</div>
      </dd>
    </div>
  </dl>
</template>

<script lang="ts">
import Vue from 'vue'
import { Status } from '@/@types/component-interfaces/status'

export default Vue.extend({
  props: {
    status: {
      type: Object as () => Status,
      default: () => ({
        statusId: '',
        patientId: '',
        centerId: '',
        created: '',
        SpO2: 0,
        body_temperature: 0,
        pulse: 0,
        symptom: {
          symptomId: '',
          cough: false,
          phlegm: false,
          suffocation: false,
          headache: false,
          sore_throat: false,
          remarks: '',
        },
      }),
    },
  },
})
</script>

<style lang="scss" scoped>
.statusInfoList {
  font-size: 20px;
  margin: 0;
}
.statusInfoInner {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
}
.symptomsInfo {
  padding: 16px 0;
  margin: 16px 0;
  border-top: 1px solid $gray-2;
}
.symptomsTitle {
  white-space: nowrap;
}
.symptom:not(:last-child)::after {
  content: '、';
}
.symptomRemarks {
  font-size: 16px;
  padding: 16px 0;
  margin: 16px 0;
  border-top: 1px solid $gray-2;
}
</style>
