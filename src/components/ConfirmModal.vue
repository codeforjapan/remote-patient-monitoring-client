<template>
  <div>
    <div v-if="isOpen" class="confirmBackLayer" @click="$emit('click')" />
    <div v-if="isOpen" class="confirmOverLayer">
      <div class="confirmText">
        <slot />
      </div>
      <ul class="confirmList">
        <li class="confirmItem">
          <ActionButton
            theme="primary"
            size="L"
            @click="handlePositiveButtonClick"
          >
            はい
          </ActionButton>
        </li>
        <li class="confirmItem">
          <ActionButton
            theme="disable"
            size="L"
            text="いいえ"
            @click="handleNegativeButtonClick"
          >
            いいえ
          </ActionButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ActionButton from '@/components/ActionButton.vue'

export default Vue.extend({
  components: {
    ActionButton,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handlePositiveButtonClick() {
      this.$emit('click')
      this.$emit('click-positive')
    },
    handleNegativeButtonClick() {
      this.$emit('click')
      this.$emit('click-negative')
    },
  },
})
</script>

<style lang="scss" scoped>
.confirmBackLayer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $bg-black;
  opacity: 0.7;
  z-index: 2;
}
.confirmOverLayer {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 320px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: $white;
  padding: 20px 16px 0 16px;
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
