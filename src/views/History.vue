<template>
  <div>
    <div class="headerButtonContainer">
      <ActionButton size="S" theme="text" :is-inline="true" to="/record">
        <AngleLeftIcon />
      </ActionButton>
      <ActionButton size="S" theme="outline" :is-inline="true" to="/record">
        体調を記録する
      </ActionButton>
      <span class="error">{{ error }}</span>
    </div>
    <header class="header">
      <h1 class="headerTitle">体調記録</h1>
      <ListOrGraphSwitch v-model="displayMode" />
    </header>
    <HistoryTable :items="statuses" />
    <FooterButtons />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import AngleLeftIcon from '@/assets/images/icon-angle-left.svg'
import ActionButton from '@/components/ActionButton.vue'
import ListOrGraphSwitch from '@/components/ListOrGraphSwitch.vue'
import HistoryTable from '@/components/HistoryTable.vue'
import FooterButtons from '@/components/FooterButtons.vue'
import { Status } from '@/@types/component-interfaces/status'

const Statuses = namespace('Statuses')

@Component({
  components: {
    AngleLeftIcon,
    ActionButton,
    ListOrGraphSwitch,
    HistoryTable,
    FooterButtons,
  },
})
export default class History extends Vue {
  displayMode = 'list'
  statuses: Status[] = []
  error = ''

  @Statuses.Action
  private load!: () => Promise<Status[]>

  @Statuses.Getter
  private getStatuses!: Status[]

  created(): void {
    this.load().then(statuses => {
      this.statuses = statuses
    })
  }
}
</script>

<style lang="scss" scoped>
.headerButtonContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  display: flex;
  align-items: center;
}
.headerTitle {
  margin-right: 12px;
}
</style>
