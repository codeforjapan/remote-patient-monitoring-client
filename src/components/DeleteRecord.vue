<template>
  <div>
    <div class="deleteRecordTextContainer">
      <span class="deleteRecordText" @click="isOpenConfirm = true">
        この記録を削除する
      </span>
      <div v-if="message" class="alert alert-danger" role="alert">
        {{ message }}
      </div>
    </div>
    <ConfirmModal
      :is-open="isOpenConfirm"
      @click="isOpenConfirm = false"
      @click-positive="deleteStatus()"
      @click-negative="isOpenConfirm = false"
    >
      この記録を削除してもよろしいですか？
    </ConfirmModal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { namespace } from 'vuex-class'

const Statuses = namespace('Statuses')

@Component({
  components: {
    ConfirmModal,
  },
})
export default class DeleteRecord extends Vue {
  isOpenConfirm = false
  message = ''

  @Prop()
  statusId!: string

  @Prop()
  patientId!: string

  @Statuses.Action
  private delete!: (patientId: {
    patientId: string
    statusId: string
  }) => Promise<boolean | string>

  deleteStatus(): void {
    this.delete({ patientId: this.patientId, statusId: this.statusId }).then(
      (result) => {
        if (result === true) {
          this.$router.push('/history')
        } else {
          this.message = `削除に失敗しました。${result}`
        }
      },
    )
  }
}
</script>

<style lang="scss" scoped>
.deleteRecordTextContainer {
  text-align: right;
}
.deleteRecordText {
  text-decoration: underline;
  cursor: pointer;
}
.alert-danger {
  left: 4.27%;
  right: 4.27%;
  top: 20.07%;
  bottom: 73.22%;
  padding: 20px;

  background: #c9e3ff;
  border-radius: 10px;
}
</style>
