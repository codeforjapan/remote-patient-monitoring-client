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
    <form name="form">
      <ul class="conditionList">
        <li class="conditionItem">
          <InputNumberField
            v-model="inputTemperature"
            id="temperature"
            name="temperature"
            label="体温"
            unit="℃"
            placeholder="36.5"
            required
            floating-point
            temperature
            :step="0.1"
            rules="required"
          />
        </li>
        <li class="conditionItem">
          <InputNumberField
            v-model="inputSpO2"
            id="spo2"
            name="spo2"
            label="酸素飽和度(SpO2)"
            unit="％"
            placeholder="98"
            required
            spo2
            is-number
            rules="required"
          />
        </li>
        <li class="conditionItem">
          <InputNumberField
            v-model="inputPulse"
            id="pulse"
            name="pulse"
            label="脈拍"
            unit="bpm"
            placeholder="80"
            required
            pulse
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
          id="memo"
          label="上記以外の体調の変化"
          name="memo"
          placeholder="例：昨日の20時ごろから咳が止まらない"
          v-model="status.symptom.remarks"
        />
      </section>
      <div v-if="message" class="alert alert-danger" role="alert">
        {{ message }}
      </div>
      <div class="buttonContainer">
        <ActionButton size="L" :theme="btnTheme" @click="submitRecord">
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
import { ConsumeStatus, Status } from '@/@types/component-interfaces/status'
import { namespace } from 'vuex-class'

const Statuses = namespace('Statuses')
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
  metaInfo: {
    title: '体調記録',
  },
})
export default class Record extends Vue {
  @Auth.Action
  private signOut!: () => void
  private myDate = new Date()
  private loading = false
  private message = ''
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
  inputSpO2 = ''
  inputPulse = ''
  inputTemperature = ''
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
    return (
      this.status.body_temperature > 0 &&
      this.status.SpO2 > 0 &&
      Number.isInteger(this.status.SpO2) &&
      this.status.pulse > 0 &&
      Number.isInteger(this.status.pulse)
    )
  }

  get btnTheme(): string {
    return this.isSubmittable ? 'primary' : 'disable'
  }

  itemSelectControl(checked: boolean, value: string): void {
    this.status.symptom[
      value as 'cough' | 'phlegm' | 'suffocation' | 'headache' | 'sore_throat'
    ] = checked
  }

  @Statuses.Action
  private create!: (status: ConsumeStatus) => Promise<Status>

  submitRecord(): void {
    if (this.isSubmittable) {
      this.loading = true
      this.create(this.status).then(
        (data) => {
          this.$router.push({
            name: 'Detail',
            params: {
              statusId: data.statusId,
              message: '体調記録を登録しました',
            },
          })
        },
        (error) => {
          this.loading = false
          this.message = error
        },
      )
    }
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
