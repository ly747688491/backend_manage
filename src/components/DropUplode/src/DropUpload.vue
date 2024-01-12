<template>
  <el-upload
    :action="uploadUrl"
    list-type="picture-card"
    :auto-upload="false"
    drag
    :limit="1"
    :on-exceed="handleExceed"
    :on-remove="handleRemove"
  >
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <el-icon><zoom-in /></el-icon>
          </span>
          <!-- <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <el-icon><Delete /></el-icon>
          </span> -->
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup name="DropUpload">
import { ref, toRefs, withDefaults } from 'vue'
import { Plus, ZoomIn } from '@element-plus/icons-vue'

import type { UploadFile } from 'element-plus'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const upload = ref<UploadInstance>()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
// const disabled = ref(false)

const props = withDefaults(
  defineProps<{
    uploadUrl: string
  }>(),
  {
    uploadUrl: ''
  }
)

const { uploadUrl } = toRefs(props)

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  const index = uploadFiles.indexOf(uploadFile)
  if (index !== -1) {
    uploadFiles.splice(index, 1)
  }
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
</script>
