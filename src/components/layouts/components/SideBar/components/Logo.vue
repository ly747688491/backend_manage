<!--
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-28 15:59:01
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-29 09:31:02
 * @Description: 
-->
<template>
  <div class="logo-container flex-center">
    <a href="/">
      <img class="logo" alt="logo" src="@/assets/images/icon.png" />
      <h1 class="title" v-if="!collapse">后台管理</h1>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/modules/setting'

const settingsStore = useSettingsStore()
const collapse = computed(() => settingsStore.collapse)
</script>

<style scoped lang="less">
.logo-container {
  position: relative;
  display: flex;
  justify-content: center;

  /* padding-left: 24px; */
  height: 60px;
  overflow: hidden;
  line-height: 60px;
  background: transparent;

  .title {
    display: inline-block;
    margin-left: 12px;
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    vertical-align: middle;
  }

  .logo {
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
}

</style>
