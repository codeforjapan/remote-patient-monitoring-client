<template>
  <div>
    <div class="deleteRecordTextContainer">
      <span class="deleteRecordText" @click="isOpenConfirm = true">
        この記録を削除する
      </span>
    </div>
    <ConfirmModal
      :is-open="isOpenConfirm"
      @click="isOpenConfirm = false"
      @click-positive="deleteStatus(statusId)"
      @click-negative="isOpenConfirm = false"
    >
      この記録を削除してもよろしいですか？
    </ConfirmModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

export default Vue.extend({
  components: {
    ConfirmModal
  },
  props: {
    statusId: {
      type: String,
      default: ''
    }
  },
  data(): {
    isOpenConfirm: boolean
  } {
    return {
      isOpenConfirm: false
    }
  },
  methods: {
    deleteStatus(statusId: string): void {
      console.log(statusId)
    }
  }
})
</script>

<style lang="scss" scoped>
.deleteRecordTextContainer {
  text-align: right;
}
.deleteRecordText {
  text-decoration: underline;
  cursor: pointer;
}
</style>
