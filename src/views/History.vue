<template>
  <div>
    <div class="headerButtonContainer">
      <ActionButton size="S" theme="text" :is-inline="true" to="/record">
        <AngleLeftIcon />
      </ActionButton>
      <ActionButton size="S" theme="outline" :is-inline="true" to="/record">
        体調を記録する
      </ActionButton>
    </div>
    <header class="header">
      <h1 class="headerTitle">体調記録</h1>
      <ListOrGraphSwitch v-model="displayMode" />
    </header>
    <HistoryTable :items="statuses" v-if="displayMode === 'list'" />
    <HistoryGraph :items="statuses" v-if="displayMode === 'graph'" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import AngleLeftIcon from '@/assets/images/icon-angle-left.svg'
import ActionButton from '@/components/ActionButton.vue'
import ListOrGraphSwitch from '@/components/ListOrGraphSwitch.vue'
import HistoryTable from '@/components/HistoryTable.vue'
import { Status } from '@/@types/component-interfaces/status'
import HistoryGraph from '@/components/HistoryGraph.vue'

const Statuses = namespace('Statuses')

@Component({
  components: {
    AngleLeftIcon,
    ActionButton,
    ListOrGraphSwitch,
    HistoryTable,
    HistoryGraph,
  },
  metaInfo: {
    title: '記録一覧',
  },
})
export default class History extends Vue {
  displayMode = 'list'
  statuses: Status[] = []

  @Statuses.Action
  private load!: () => Promise<Status[]>

  @Statuses.Getter
  private getStatuses!: Status[]

  created(): void {
    this.load().then((statuses) => {
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
