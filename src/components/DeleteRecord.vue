<template>
  <div>
    <div class="deleteRecordTextContainer">
      <span class="deleteRecordText" @click="isOpenConfirm = true"
        >この記録を削除する</span
      >
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

type Data = {
  isOpenConfirm: boolean
}

type Methods = {
  deleteStatus(statusId: string): void
}

export default Vue.extend<Data, Methods, unknown, unknown>({
  components: {
    ConfirmModal
  },
  props: {
    statusId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpenConfirm: false
    }
  },
  methods: {
    deleteStatus(statusId) {
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
