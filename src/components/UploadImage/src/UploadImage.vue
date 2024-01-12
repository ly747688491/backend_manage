<!--
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-03 15:55:46
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-04 13:40:49
 * @Description: 
-->
<template>
  <el-upload
    ref="upload"
    action="http://127.0.0.1:8000/api/app/uploadimage/"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :limit="1"
    :on-exceed="handleExceed"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script lang="ts" setup name="UploadImage">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
import type { UploadProps, UploadInstance, UploadRawFile } from 'element-plus'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const upload = ref<UploadInstance>()

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
</script>
