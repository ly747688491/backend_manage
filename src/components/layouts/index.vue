<script setup lang="ts">
import { onBeforeUnmount, computed, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useSettingsStore } from '@/stores/modules/setting'
import LayoutMain from './components/Main/index.vue'
import LayoutNavBar from './components/NavBar/index.vue'
import LayoutSideBar from './components/SideBar/index.vue'
import LayoutTabsBar from './components/TabsBar/index.vue'
import LayoutFooter from './components/Footer/index.vue'

const settingsStore = useSettingsStore()
const collapse = computed(() => settingsStore.collapse)
const screenWidth = ref(0)
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth
}, 100)
window.addEventListener('resize', listeningWindow, false)
onBeforeUnmount(() => {
  window.removeEventListener('resize', listeningWindow)
})
</script>

<template>
  <div class="layout-admin-wrapper">
    <div class="layout-container-vertical fixed">
      <!-- SubMenu -->
      <LayoutSideBar />
      <div class="layout-main" :class="{ 'is-collapse': collapse }">
        <!-- Header -->
        <div
          class="layout-header fixed-header"
          :class="{ 'is-collapse': collapse }"
        >
          <LayoutNavBar />
          <LayoutTabsBar />
        </div>
        <div class="app-main-container">
          <!-- Main -->
          <LayoutMain />
          <!-- Footer -->
          <LayoutFooter />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/variable.less';
.fix-header() {
  position: fixed;
  top: 0;
  right: 0;
  z-index: (@base-z-index - 2);
  width: calc(100% - @base-left-menu-width);
}

.layout-admin-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;

  .layout-container-vertical {
    &.fixed {
      padding-top: ~"calc(@{base-top-bar-height} + @{base-tabs-bar-height})";
    }

    .layout-main {
      min-height: 100%;
      margin-left: @base-left-menu-width;

      &.is-collapse {
        margin-left: @base-left-menu-width-min;
        border-right: 0;
      }

      .layout-header {
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

        &.fixed-header {
          .fix-header();
        }

        &.is-collapse {
          width: ~"calc(100% - @{base-left-menu-width-min})";
        }
      }

      .app-main-container {
        padding: 20px 20px 0;
      }
    }
  }
}
</style>
