/*
 * @Author: liy 747688491@qq.com
 * @Date: 2023-11-23 17:49:25
 * @LastEditors: liy 747688491@qq.com
 * @LastEditTime: 2023-11-28 11:38:44
 * @Description: 
 */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
    rules: {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    'no-unexpected-multiline': 'error', // 禁止空余的多行
    'no-useless-escape': 'off', // 禁止不必要的转义字符
    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/script-setup-uses-vars': 'error' // 防止<script setup>使用的变量<template>被标记为未使用
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
