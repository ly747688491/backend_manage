<!--
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-28 17:39:22
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-12-05 10:19:52
 * @Description: 
-->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import type { FormInstance } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { HOME_URL } from '@/config/config'
import { timeFix } from '@/utils/index'
import { login, getCaptcha } from '@/api'
const router = useRouter()
const route = useRoute()
const ruleFormRef = ref<FormInstance>()
const userStore = useUserStore()
const ruleForm = reactive({
  username: 'admin',
  password: '123456789',
  captcha: '',
  captchaKey: 0
})
const image_base = ref()
const loading = ref(false)

const get_captcha = async () => {
  const { data } = await getCaptcha()

  ruleForm.captcha = ''
  ruleForm.captchaKey = data.data.key
  image_base.value = data.data.image_base
}
get_captcha()
const validateUsername = (rule: any, value: string, callback: any) => {
  const empty = '用户名不能为空'
  const minLength = '用户名长度不能小于4位'
  if (value === '') {
    callback(new Error(empty))
  } else if (value.length < rule.min) {
    callback(new Error(minLength))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: string, callback: any) => {
  const empty = '密码不能为空'
  const minLength = '密码长度不能小于6位'
  if (value === '') {
    callback(new Error(empty))
  } else if (value.length < rule.min) {
    callback(new Error(minLength))
  } else {
    callback()
  }
}

const rules = reactive({
  username: [{ required: true, validator: validateUsername, min: 4 }],
  password: [{ required: true, validator: validatePassword, min: 6 }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      const { data } = await login(ruleForm)
      userStore.setToken(data.data.access)
      userStore.setRefresh(data.data.refresh)
      router.replace((route.query.redirect as string) || HOME_URL)
      ElNotification({
        title: `hi,${timeFix()}!`,
        message: `欢迎回来`,
        type: 'success'
      })
    } finally {
      loading.value = false
    }
  })
}
</script>

<template>
  <div class="login-container">
    <el-row class="mian-content">
      <el-col :span="12"><div class="grid-content ep-bg-purple">
      <h1>仅管理员可登录</h1>
      </div></el-col>
      <el-col :span="12" class="grid-content ep-bg-purple-light">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="login-form">
          <div class="form-header">
            <div class="title"></div>
            <div class="title-tips"></div>
          </div>
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              :prefix-icon="User"
              autocomplete="off"
              placeholder="请输入用户名"
              @keyup.enter="submitForm(ruleFormRef)"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              show-password
              :prefix-icon="Lock"
              autocomplete="off"
              placeholder="请输入密码"
              @keyup.enter="submitForm(ruleFormRef)"
            />
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input
              v-model.trim="ruleForm.captcha"
              type="text"
              size="large"
              auto-complete="off"
              placeholder="验证码"
              @keyup.enter="submitForm(ruleFormRef)"
            >
              <template #prepend>
                <el-icon><circle-check /></el-icon>
              </template>
              <template #append>
                <img class="login-code" :src="image_base" @click="get_captcha" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              size="large"
              :loading="loading"
              @click="submitForm(ruleFormRef)"
            >
              登陆
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">
.login-container {
  height: 100vh;
  background: #f0f2f5;

  .mian-content {
    height: 100%;
  }
  .ep-bg-purple-light {
    background: #ffffff;
  }

  .form-header {
    margin-bottom: 40px;

    .title-tips {
      margin-top: 29px;
      font-size: 26px;
      font-weight: 400;
      color: var(--el-color-white);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title {
      font-size: 54px;
      font-weight: 500;
      color: var(--el-color-white);
    }
  }

  .login-form {
    position: relative;
    max-width: 100%;
    padding: 4.5vh;
    margin: calc(50vh - 277.5px) 5vw 5vw;
    overflow: hidden;
    // background: #f2f2f2;

    .login-btn {
      display: inherit;
      width: 100%;
      height: 48px;
      margin-top: 5px;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }
  }

  :deep(.el-form) {
    .el-form-item {
      padding-right: 0;
      margin: 20px 0;
      color: #454545;
      border: 1px solid transparent;
      border-radius: 2px;

      &__content {
        min-height: @base-input-height;
        line-height: @base-input-height;
      }

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        font-size: @base-font-size-small;
        line-height: 18px;
        color: @base-color-red;
      }
    }

    .el-input {
      box-sizing: border-box;

      input {
        height: 48px;
        font-size: @base-font-size-default;
        line-height: 58px;
        color: @base-font-color;
        border: 0;
        caret-color: @base-font-color;
      }
    }
  }
}
.login-code {
  height: 40px - 2px;
  display: block;
  margin: 0px -20px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
</style>
