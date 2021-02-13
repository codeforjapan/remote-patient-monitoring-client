<template>
  <div>
    <span class="error">{{ error }}</span>
    <div class="headerButtonContainer">
      <ActionButton size="S" theme="text" :is-inline="true" to="/history">
        <AngleLeftIcon />
      </ActionButton>
      <ActionButton size="S" theme="outline" :is-inline="true" to="/record">
        体調を記録する
      </ActionButton>
    </div>
    <h1>{{ date }}</h1>
    <StatusInfo :status="status" />
    <DeleteRecord :status-id="status.statusId" />
    <FooterButtons />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import dayjs from 'dayjs'
import AngleLeftIcon from '@/assets/images/icon-angle-left.svg'
import ActionButton from '@/components/ActionButton.vue'
import StatusInfo from '@/components/StatusInfo.vue'
import DeleteRecord from '@/components/DeleteRecord.vue'
import FooterButtons from '@/components/FooterButtons.vue'
import { Status } from '@/@types/component-interfaces/status'

@Component({
  components: {
    AngleLeftIcon,
    ActionButton,
    StatusInfo,
    DeleteRecord,
    FooterButtons
  }
})
export default class Detail extends Vue {
  error = ''
  @Prop()
  status!: Status

  get date() {
    return dayjs(this.status.created).format('YYYY/MM/DD HH:mm')
  }
}
</script>

<style lang="scss" scoped>
.headerButtonContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
