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
import AngleLeftIcon from '@/assets/images/icon-angle-left.svg'
import ActionButton from '@/components/ActionButton.vue'
import ListOrGraphSwitch from '@/components/ListOrGraphSwitch.vue'
import HistoryTable from '@/components/HistoryTable.vue'
import FooterButtons from '@/components/FooterButtons.vue'
import UserService from '@/services/UserService'

@Component({
  components: {
    AngleLeftIcon,
    ActionButton,
    ListOrGraphSwitch,
    HistoryTable,
    FooterButtons
  }
})
export default class History extends Vue {
  displayMode = 'list'
  statuses = []
  error = ''
  mounted() {
    UserService.getStatuses().then(
      response => {
        console.log(response)
        this.statuses = response.data
      },
      error => {
        this.error = error.toString()
      }
    )
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
