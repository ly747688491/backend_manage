<template>
  <div class="btn">
    <el-tooltip content="刷新">
      <el-button circle @click="onRefresh">
        <IconifyIcon icon="ri:refresh-line" height="16" />
      </el-button>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '@/stores/modules/setting'

const settingsStore = useSettingsStore()
const onRefresh = () => {
  settingsStore.setRefresh()
}
</script>

<style scoped lang="less">
.btn {
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
