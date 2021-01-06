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
    <div
      v-if="isOpenConfirm"
      class="confirmBackLayer"
      @click="isOpenConfirm = false"
    />
    <div v-if="isOpenConfirm" class="confirmOverLayer">
      <p class="confirmText">{{ confirmText }}</p>
      <ul class="confirmList">
        <li class="confirmItem">
          <ActionButton
            theme="primary"
            size="L"
            text="はい"
            @click="openTel(number)"
          />
        </li>
        <li class="confirmItem">
          <ActionButton
            theme="disable"
            size="L"
            text="いいえ"
            @click="isOpenConfirm = false"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PhoneIcon from '@/assets/images/icon-phone.svg'
import ActionButton from '@/components/ActionButton.vue'

interface PhoneItem {
  destination: string
  telNumber: string
  text: string
}

type Data = {
  phoneItems: PhoneItem[]
  confirmText: string
  number: string
  isOpenConfirm: boolean
}

type Methods = {
  confirmToTel(destination: string): void
  openTel(number: string): void
}

export default Vue.extend<Data, Methods, unknown, unknown>({
  components: {
    PhoneIcon,
    ActionButton
  },
  data() {
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
    confirmToTel(destination) {
      const selectedItem: PhoneItem[] = this.phoneItems.filter(v => {
        if (v.destination === destination) return true
      })
      this.confirmText = selectedItem[0].text
      this.number = selectedItem[0].telNumber
      this.isOpenConfirm = true
    },
    openTel(number) {
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
  color: $white;
  font-size: 20px;
  svg {
    fill: currentColor;
    padding-right: 4px;
  }
  &.healthCenter {
    background-color: $notice;
  }
  &.emergency {
    background-color: $error;
  }
}
.confirmBackLayer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $bg-black;
  opacity: 0.8;
  z-index: 2;
}
.confirmOverLayer {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 300px;
  border: 1px solid $error;
  border-radius: 8px;
  background-color: $white;
  padding: 16px;
  z-index: 3;
}
.confirmText {
  font-size: 20px;
}
.confirmList {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.confirmItem {
  flex: 0 0 48%;
}
</style>
