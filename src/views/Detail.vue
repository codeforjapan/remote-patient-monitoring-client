<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="headerButtonContainer">
      <ActionButton size="S" theme="text" :is-inline="true" to="/history">
        <AngleLeftIcon />
      </ActionButton>
      <ActionButton size="S" theme="outline" :is-inline="true" to="/record">
        体調を記録する
      </ActionButton>
    </div>
    <div v-if="showmessage" class="message">{{ showmessage }}</div>
    <h1 class="title">{{ date }}</h1>
    <template v-if="status">
      <StatusInfo :status="status" />
      <DeleteRecord :patientId="status.patientId" :statusId="statusId" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import dayjs from 'dayjs'
import AngleLeftIcon from '@/assets/images/icon-angle-left.svg'
import ActionButton from '@/components/ActionButton.vue'
import StatusInfo from '@/components/StatusInfo.vue'
import DeleteRecord from '@/components/DeleteRecord.vue'
import { Status } from '@/@types/component-interfaces/status'
import { namespace } from 'vuex-class'

const Statuses = namespace('Statuses')

@Component({
  components: {
    AngleLeftIcon,
    ActionButton,
    StatusInfo,
    DeleteRecord,
  },
  metaInfo: {
    title: '記録詳細',
  },
})
export default class Detail extends Vue {
  error = ''
  @Prop()
  statusId!: string

  @Prop()
  message?: string

  @Statuses.Getter
  private getStatuses!: Status[]

  @Statuses.Action
  private load!: () => Promise<Status[]>

  get showmessage(): string | undefined {
    return this.message
  }
  get date(): string {
    if (this.status) {
      return dayjs(this.status.created).format('YYYY/M/D (ddd) HH:mm')
    } else {
      return ''
    }
  }
  get status(): Status | undefined {
    if (this.getStatuses.length > 0) {
      return this.getStatuses.find(
        (status) => status.statusId === this.statusId,
      )
    } else {
      this.load().then((statuses) => {
        return statuses.find((status) => status.statusId === this.statusId)
      })
      return undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.headerButtonContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 22px;
}
.message {
  padding: 10px;
  margin-top: 8px;
  background: #77d9a8;
  border-radius: 10px;
}
</style>
