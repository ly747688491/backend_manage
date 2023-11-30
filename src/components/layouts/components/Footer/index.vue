<!--
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-28 13:58:11
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-28 17:46:03
 * @Description: 
-->
<template>
  <div class="layout-footer-container">
    Copyright
    <svg-icon name="copyright" size="16px" color="rgba(0, 0, 0, 0.45)" />
    {{ fullYear }}后台管理
  </div>
</template>

<script lang="ts" setup>
import {  ref } from 'vue'

const fullYear = ref(new Date().getFullYear())
</script>

<style lang="less" scoped>
.layout-footer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: @base-app-footer-height;
  padding: 0 20px;
  color: rgba(0, 0, 0, 0.45);
  background: var(--el-color-white);
  border-top: 1px dashed #dcdfe6;
}

</style>
