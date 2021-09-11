<template>
  <div>
    <h1 class="title">利用規約</h1>
    <div class="termsContainer">
      <PolicyText />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PolicyText from '@/components/PolicyText.vue'

@Component({
  components: {
    PolicyText,
  },
  metaInfo: {
    title: '利用規約',
  },
})
export default class Terms extends Vue {}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
.termsContainer {
  margin: 30px 16px;
  padding: 16px;
  background: $white;
  border-radius: 4px;
}
</style>
