<template>
  <div class="layout-sidebar-container" :class="{ 'is-collapse': collapse }">
    <Logo />
    <el-scrollbar>
      <el-menu
        class="meun"
        background-color="#0E223B"
        text-color="hsla(0,0%,100%,.65)"
        active-text-color="#fff"
        :default-active="activeMenu"
        :collapse="collapse"
        :unique-opened="true"
      >
        <sub-menu :menu-list="menuList"></sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useSettingsStore } from '@/stores/modules/setting'
import { useAuthStore } from '@/stores/modules/auth'
import { useRoute } from 'vue-router'
import Logo from './components/Logo.vue'
import SubMenu from './components/SubMenu.vue'

export default defineComponent({
  components: {
    Logo,
    SubMenu
  },
  setup() {
    const settingsStore = useSettingsStore()
    const authStore = useAuthStore()
    const route = useRoute()
    const collapse = computed(() => settingsStore.collapse)
    const themeConfig = computed(() => settingsStore.themeConfig)
    const menuList = computed(() => authStore.authMenuList)
    const activeMenu = computed(() =>
      route.meta.activeMenu ? (route.meta.activeMenu as string) : route.path
    )
    return {
      menuList,
      collapse,
      activeMenu,
      themeConfig
    }
  }
})
</script>

<style scoped lang="less">
.active() {
  &:hover {
    color: @base-color-white;
  }

  &.is-active {
    color: @base-color-white;
    background-color: var(--el-color-primary) !important;
  }
}

.layout-sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: @base-z-index;
  width: @base-left-menu-width;
  height: 100vh;
  background: @base-menu-background;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: width @base-transition-time;

  &.is-collapse {
    width: @base-left-menu-width-min;
    border-right: 0;
  }

  :global(.el-scrollbar__wrap) {
    overflow-x: hidden;
    overflow-y: hidden;

    .el-menu {
      border: 0;
      border-right: 0;
    }

    .el-menu-item,
    .el-submenu__title {
      height: auto;
      overflow: hidden;
      line-height: @base-menu-item-height;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }

    .el-menu-item {
      .active();
    }
  }
}
.meun {
  border: 0;
  border-right: 0;
}
</style>
