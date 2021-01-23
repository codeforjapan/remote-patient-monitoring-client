<template>
  <div>
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
import Vue from 'vue'
import PhoneIcon from '@/assets/images/icon-phone.svg'
import ConfirmModal from '@/components/ConfirmModal.vue'

interface PhoneItem {
  destination: string
  telNumber: string
  text: string
}

export default Vue.extend({
  components: {
    PhoneIcon,
    ConfirmModal
  },
  data(): {
    phoneItems: PhoneItem[]
    confirmText: string
    number: string
    isOpenConfirm: boolean
  } {
    return {
      phoneItems: [
        {
          destination: 'healthCenter',
          telNumber: '00-0000-0000',
          text: '担当保健所に電話しますか？'
        },
        {
          destination: 'emergency',
          telNumber: '119',
          text: '119番に電話します。よろしいですか？'
        }
      ],
      confirmText: '',
      number: '',
      isOpenConfirm: false
    }
  },
  methods: {
    confirmToTel(destination: string): void {
      const selectedItem: PhoneItem[] = this.phoneItems.filter(v => {
        if (v.destination === destination) return true
      })
      this.confirmText = selectedItem[0].text
      this.number = selectedItem[0].telNumber
      this.isOpenConfirm = true
    },
    openTel(number: string): void {
      window.open(`tel:${number}`, '_self')
    }
  }
})
</script>

<style lang="scss" scoped>
.footerButtonsList {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  max-height: 4em;
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
