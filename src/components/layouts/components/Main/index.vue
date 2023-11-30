<template>
  <section class="app-mian-height">
    <router-view v-slot="{ Component, route }" v-if="isShow">
      <transition appear name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import { useSettingsStore } from '@/stores/modules/setting'

const settingsStore = useSettingsStore()
const isShow = ref(true)
watch(
  () => settingsStore.refresh,
  () => {
    isShow.value = false
    nextTick(() => {
      isShow.value = true
    })
  },
)
</script>

<style scoped lang="less">
.app-mian-height {
  min-height: @base-app-main-height;
  background-color: inherit;
}

</style>
