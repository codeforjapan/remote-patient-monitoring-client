<template>
  <div>
    <div class="headerButtonContainer">
      <ActionButton size="S" theme="text" :is-inline="true">
        ログアウト
      </ActionButton>
      <ActionButton size="S" theme="outline" :is-inline="true" to="/history">
        記録一覧を見る
      </ActionButton>
    </div>
    <h1>体調を記録する</h1>
    <span class="date">2020/12/26 09:14</span>
    <ul class="conditionList">
      <li class="conditionItem">
        <InputNumberField
          name="temperature"
          label="体温"
          unit="℃"
          required
          floating-point
          :step="0.1"
          :value="inputTemperature"
          @validate="validations.inputTemperature = $event"
          @input="inputTemperature = $event"
        />
      </li>
      <li class="conditionItem">
        <InputNumberField
          name="spo2"
          label="酸素飽和度(SpO2)"
          unit="％"
          required
          :value="inputSpo2"
          @validate="validations.inputSpo2 = $event"
          @input="inputSpo2 = $event"
        />
      </li>
      <li class="conditionItem">
        <InputNumberField
          name="pulse"
          label="脈拍"
          unit="bpm"
          required
          :value="inputPulse"
          @validate="validations.inputPulse = $event"
          @input="inputPulse = $event"
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
      <InputField
        label="上記以外の体調の変化"
        name="memo"
        placeholder="例：昨日の20時ごろから咳が止まらない"
        :value="inputMemo"
        @input="inputMemo = $event"
      />
    </section>
    <div class="buttonContainer">
      <ActionButton
        size="L"
        :theme="btnTheme"
        type="submit"
        :is-submittable="isSubmittable"
      >
        記録する
      </ActionButton>
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

type SymptomItem = {
  name: string
  label: string
}

export default Vue.extend({
  components: {
    ActionButton,
    InputField,
    InputNumberField,
    ToggleSwitch,
    FooterButtons
  },
  data(): {
    symptomItems: SymptomItem[]
    inputTemperature: string
    inputSpo2: string
    inputPulse: string
    inputMemo: string
    selectedItems: string[]
    validations: { [key: string]: boolean }
  } {
    return {
      symptomItems: [
        {
          name: 'cough',
          label: 'せき'
        },
        {
          name: 'phlegm',
          label: 'たん'
        },
        {
          name: 'suffocation',
          label: '息苦しさ'
        },
        {
          name: 'headache',
          label: '頭痛'
        },
        {
          name: 'sore_throat',
          label: 'のどの痛み'
        }
      ],
      inputTemperature: '',
      inputSpo2: '',
      inputPulse: '',
      inputMemo: '',
      selectedItems: [],
      validations: {
        inputTemperature: false,
        inputSpo2: false,
        inputPulse: false
      }
    }
  },
  computed: {
    isSubmittable(): boolean {
      return Object.keys(this.validations).every(key => this.validations[key])
    },
    btnTheme(): string {
      return this.isSubmittable ? 'primary' : 'disable'
    }
  },
  methods: {
    itemSelectControl(checked: boolean, value: string) {
      if (!this.selectedItems.includes(value)) {
        this.selectedItems.push(value)
      } else {
        this.selectedItems = this.selectedItems.filter(
          (v: string) => v !== value
        )
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
