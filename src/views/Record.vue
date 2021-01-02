<template>
  <div class="record">
    <div class="headerButtonContainer">
      <ActionButton text="ログアウト" size="S" theme="text" :is-inline="true" />
      <ActionButton
        text="記録一覧を見る"
        size="S"
        theme="outline"
        :is-inline="true"
      />
    </div>
    <h2>体調を記録する</h2>
    <span class="date">2020/12/26 09:14</span>
    <ul class="conditionList">
      <li class="conditionItem">
        <InputNumberField
          name="temperature"
          label="体温"
          unit="℃"
          :step="0.1"
          :value="inputTemperature"
          @input="inputTemperature = $event"
        />
      </li>
      <li class="conditionItem">
        <InputNumberField
          name="spo2"
          label="酸素飽和度(SpO2)"
          unit="％"
          :step="0.1"
          :value="inputSpo2"
          @input="inputSpo2 = $event"
        />
      </li>
      <li class="conditionItem">
        <InputNumberField
          name="pulse"
          label="脈拍"
          unit="bpm"
          :value="inputPulse"
          @input="inputPulse = $event"
        />
      </li>
    </ul>
    <section class="symptomsSection">
      <h3>該当の症状はありますか？</h3>
      <ul class="symptomsList">
        <li class="symptomsItem">
          <ToggleSwitch name="cough" label="せき" />
        </li>
        <li class="symptomsItem">
          <ToggleSwitch name="sputum" label="たん" />
        </li>
        <li class="symptomsItem">
          <ToggleSwitch name="suffocation" label="息苦しさ" />
        </li>
        <li class="symptomsItem">
          <ToggleSwitch name="headache" label="頭痛" />
        </li>
        <li class="symptomsItem">
          <ToggleSwitch name="throat" label="のどの痛み" />
        </li>
      </ul>
      <InputField
        label="上記以外の体調の変化"
        name="memo"
        placeholder="例：昨日の20時ごろから咳が止まらない"
        :value="inputMemo"
        @input="inputMemo = $event"
      />
    </section>
    <div class="buttonContainer">
      <ActionButton text="記録する" size="L" theme="primary" />
    </div>
    <FooterButtons />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionButton from '@/components/ActionButton.vue'
import InputField from '@/components/InputField.vue'
import InputNumberField from '@/components/InputNumberField.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import FooterButtons from '@/components/FooterButtons.vue'

export default Vue.extend({
  components: {
    ActionButton,
    InputField,
    InputNumberField,
    ToggleSwitch,
    FooterButtons
  },
  data() {
    return {
      inputTemperature: '',
      inputSpo2: '',
      inputPulse: '',
      inputMemo: ''
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
.date {
  font-size: 20px;
  font-weight: bold;
}
.conditionList,
.symptomsSection {
  padding: 0 0 12px;
  border-bottom: 1px solid $gray-2;
}
.conditionItem {
  margin-bottom: 12px;
}
.symptomsList {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.symptomsItem {
  flex: 0 0 46%;
  padding: 12px 0;
}
.buttonContainer {
  margin: 24px 0 80px;
}
</style>
