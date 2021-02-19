<template>
  <div>
    <div class="headerButtonContainer">
      <ActionButton size="S" theme="text" :is-inline="true" @click="logout">
        ログアウト
      </ActionButton>
      <ActionButton size="S" theme="outline" :is-inline="true" to="/history">
        記録一覧を見る
      </ActionButton>
    </div>
    <h1>体調を記録する</h1>
    <form name="form" @submit.prevent="handleLogin">
      <span class="date">{{ date }}</span>
      <ul class="conditionList">
        <li class="conditionItem">
          <InputNumberField
            name="temperature"
            label="体温"
            unit="℃"
            required
            floating-point
            :step="0.1"
            v-model="inputTemperature"
            rules="required"
          />
        </li>
        <li class="conditionItem">
          <InputNumberField
            name="spo2"
            label="酸素飽和度(SpO2)"
            unit="％"
            required
            v-model="inputSpO2"
            rules="required"
          />
        </li>
        <li class="conditionItem">
          <InputNumberField
            name="pulse"
            label="脈拍"
            unit="bpm"
            required
            v-model="inputPulse"
            value="inputPulse"
            rules="required"
          />
        </li>
      </ul>
      <section class="symptomsSection">
        <h3>該当の症状はありますか？</h3>
        <ul class="symptomsList">
          <li
            v-for="(item, index) in symptomItems"
            :key="index"
            class="symptomsItem"
          >
            <ToggleSwitch
              :name="item.name"
              :label="item.label"
              :value="item.name"
              @input="itemSelectControl"
            />
          </li>
        </ul>
        <InputTextField
          label="上記以外の体調の変化"
          name="memo"
          placeholder="例：昨日の20時ごろから咳が止まらない"
          v-model="status.symptom.remarks"
        />
      </section>
      <div class="buttonContainer">
        <ActionButton size="L" :theme="btnTheme" type="submit">
          記録する
        </ActionButton>
      </div>
    </form>
    <FooterButtons />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ActionButton from '@/components/ActionButton.vue'
import InputTextField from '@/components/InputTextField.vue'
import InputNumberField from '@/components/InputNumberField.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import FooterButtons from '@/components/FooterButtons.vue'
import { ConsumeStatus } from '@/@types/component-interfaces/status'
import { namespace } from 'vuex-class'
import dayjs from 'dayjs'

const Auth = namespace('Auth')

type SymptomItem = {
  name: string
  label: string
}
@Component({
  components: {
    ActionButton,
    InputTextField,
    InputNumberField,
    ToggleSwitch,
    FooterButtons,
  },
})
export default class Record extends Vue {
  @Auth.Action
  private signOut!: () => void
  private mydate = new Date()
  symptomItems: SymptomItem[] = [
    {
      name: 'cough',
      label: 'せき',
    },
    {
      name: 'phlegm',
      label: 'たん',
    },
    {
      name: 'suffocation',
      label: '息苦しさ',
    },
    {
      name: 'headache',
      label: '頭痛',
    },
    {
      name: 'sore_throat',
      label: 'のどの痛み',
    },
  ]
  inputSpO2 = '98'
  inputPulse = '80'
  inputTemperature = '36.5'
  selectedItems: string[] = []
  get status(): ConsumeStatus {
    return {
      SpO2: +this.inputSpO2,
      body_temperature: +this.inputTemperature,
      pulse: +this.inputPulse,
      symptom: {
        cough: false,
        phlegm: false,
        suffocation: false,
        headache: false,
        sore_throat: false,
        remarks: '',
      },
    }
  }
  get isSubmittable(): boolean {
    console.log(this.status)
    return (
      this.status.body_temperature > 0 &&
      this.status.SpO2 > 0 &&
      this.status.pulse > 0
    )
  }
  get btnTheme(): string {
    return this.isSubmittable ? 'primary' : 'disable'
  }
  get date(): string {
    return dayjs(this.mydate).format('YYYY/MM/DD HH:mm')
  }
  itemSelectControl(checked: boolean, value: string) {
    this.status.symptom[
      value as 'cough' | 'phlegm' | 'suffocation' | 'headache' | 'sore_throat'
    ] = checked
  }
  logout(): void {
    this.signOut()
    this.$router.push('/login')
  }
}
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
