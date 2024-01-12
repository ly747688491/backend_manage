<!--
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-28 11:27:48
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-12-05 14:38:08
 * @Description: 
-->
<script setup lang="ts">
import { getPermissionList, getRoleList } from '@/api/system';
import { ref } from 'vue';

const roleList = ref([])
const editableTabsValue = ref()
const permissionList = ref([])
const permissionForRole = ref([])

// const getMenu = async () => {
//   const params = null
//   const data = await getMenuList(params)
// }

const getPermission = async () => {  
    const params = {
    page: "1",
    limit:"999"
  }
  const data = await getPermissionList(params)
  permissionList.value = data.data.data.data
  
}

const getRole = async () => {
  const params = null
  const data = await getRoleList(params)
  roleList.value = data.data.data.data
  permissionForRole.value = roleList.value.permission
}
getRole()
getPermission()
</script>

<template>
  <div class="about">
    <el-tabs v-model="editableTabsValue" tab-position="left">
      <el-tab-pane
        v-for="item in roleList"
        :key="item.name"
        :label="item.name"
        :name="item.name"
      >
        <el-checkbox-group v-model="permissionForRole">
            <el-checkbox
    v-for="item in permissionList"
    :key="item.id"
    :value="item.id"
  >{{item.api}} {{ item.name }} {{ item.method }}</el-checkbox>
        </el-checkbox-group>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<style>
</style>
