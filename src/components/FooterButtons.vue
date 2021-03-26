<template>
  <div class="footerButtonsContainer">
    <div>
      <div class="footerButtonsAlert" v-if="isNullTelNumber">
        電話番号が設定されていません
      </div>
      <ul class="footerButtonsList">
        <li
          class="footerButtonsItem healthCenter"
          @click="confirmToTel('healthCenter')"
        >
          <PhoneIcon />
          保健所へ電話
        </li>
        <li
          class="footerButtonsItem emergency"
          @click="confirmToTel('emergency')"
        >
          <PhoneIcon />
          救急要請(119)
        </li>
      </ul>
    </div>
    <ConfirmModal
      :is-open="isOpenConfirm"
      @click="isOpenConfirm = false"
      @click-positive="openTel(number)"
      @click-negative="isOpenConfirm = false"
    >
      {{ confirmText }}
    </ConfirmModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import PhoneIcon from '@/assets/images/icon-phone.svg'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { Patient } from '@/@types/component-interfaces/patient'

const User = namespace('User')

interface PhoneItem {
  destination: string
  telNumber: string
  text: string
}

@Component({
  components: {
    PhoneIcon,
    ConfirmModal,
  },
})
export default class FooterButtons extends Vue {
  phoneItems: PhoneItem[] = [
    {
      destination: 'healthCenter',
      telNumber: '',
      text: '担当保健所に電話しますか？',
    },
    {
      destination: 'emergency',
      telNumber: '119',
      text: '119番に電話します。よろしいですか？',
    },
  ]
  confirmText = ''
  number = ''
  isOpenConfirm = false
  isNullTelNumber = false

  @User.Action
  private loadPatient!: () => Promise<Patient>

  @User.Getter
  private getPatientInfo!: Patient

  mounted(): void {
    const healthCenter = this.phoneItems.filter((v) => {
      if (v.destination === 'healthCenter') return true
    })[0]
    if (this.getPatientInfo.emergencyPhone) {
      healthCenter.telNumber = this.getPatientInfo.emergencyPhone
    } else {
      this.loadPatient().then((patient: Patient) => {
        healthCenter.telNumber = patient.emergencyPhone
      })
    }
  }

  confirmToTel(destination: string): void {
    const selectedItem: PhoneItem[] = this.phoneItems.filter((v) => {
      if (v.destination === destination) return true
    })
    this.confirmText = selectedItem[0].text
    this.number = selectedItem[0].telNumber
    if (this.number) {
      this.isOpenConfirm = true
      this.isNullTelNumber = false
    } else {
      this.isOpenConfirm = false
      this.isNullTelNumber = true
    }
  }

  openTel(number: string): void {
    window.open(`tel:${number}`, '_self')
  }
}
</script>

<style lang="scss" scoped>
.footerButtonsContainer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
}
.footerButtonsAlert {
  text-align: center;
  background-color: $white;
  padding: 12px;
  border: 2px solid $error;
}
.footerButtonsList {
  height: 4em;
  display: flex;
  align-items: center;
  margin: 0;
}
.footerButtonsItem {
  flex: 0 0 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  svg {
    fill: currentColor;
    padding-right: 4px;
  }
  &.healthCenter {
    color: $primary;
    background-color: $white;
    border: 2px solid currentColor;
  }
  &.emergency {
    color: $white;
    background-color: $secondary;
  }
}
</style>
