<script setup lang="ts">
import type { TagProps } from 'element-plus'
import { ElMessage } from 'element-plus'

import { ref } from 'vue'

interface Item { type: TagProps['type'], label: string }

const items = ref<Array<Item>>([
  { type: 'primary', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'danger', label: 'Tag 4' },
  { type: 'warning', label: 'Tag 5' },
])

// 所有颜色
const colors = {
  'primary-lighter-color': '#AAC1F9',
  'primary-light-color': '#88A8F7',
  'primary-color': '#5582F3',
  'primary-deep-color': '#4468C2',
  'primary-deeper-color': '#334E92',
  'el-color-primary': '#5582F3',
  'el-color-primary-dark-2': '#4468C2',
  'el-color-primary-light-3': '#88A8F7',
  'el-color-primary-light-5': '#AAC1F9',
  'el-color-primary-light-7': '#CCDAFB',
  'el-color-primary-light-8': '#DDE6FD',
  'el-color-primary-light-9': '#EEF3FE',
  'info-lighter-color': '#F7F7F7',
  'info-light-color': '#F3F3F3',
  'info-color': '#eeeeee',
  'info-deep-color': '#BEBEBE',
  'info-deeper-color': '#8F8F8F',
  'el-color-info': '#eeeeee',
  'el-color-info-dark-2': '#BEBEBE',
  'el-color-info-light-3': '#F3F3F3',
  'el-color-info-light-5': '#F7F7F7',
  'el-color-info-light-7': '#FAFAFA',
  'el-color-info-light-8': '#FCFCFC',
  'el-color-info-light-9': '#FDFDFD',
  'warning-lighter-color': '#FDDE91',
  'warning-light-color': '#FCD165',
  'warning-color': '#fbbd23',
  'warning-deep-color': '#C9971C',
  'warning-deeper-color': '#977115',
  'el-color-warning': '#fbbd23',
  'el-color-warning-dark-2': '#C9971C',
  'el-color-warning-light-3': '#FCD165',
  'el-color-warning-light-5': '#FDDE91',
  'el-color-warning-light-7': '#FEEBBD',
  'el-color-warning-light-8': '#FEF2D3',
  'el-color-warning-light-9': '#FFF8E9',
  'danger-lighter-color': '#FCB9B9',
  'danger-light-color': '#FA9C9C',
  'danger-color': '#f87272',
  'danger-deep-color': '#C65B5B',
  'danger-deeper-color': '#954444',
  'el-color-danger': '#f87272',
  'el-color-danger-dark-2': '#C65B5B',
  'el-color-danger-light-3': '#FA9C9C',
  'el-color-danger-light-5': '#FCB9B9',
  'el-color-danger-light-7': '#FDD5D5',
  'el-color-danger-light-8': '#FEE3E3',
  'el-color-danger-light-9': '#FEF1F1',
  'success-lighter-color': '#9BE9CC',
  'success-light-color': '#72E0B8',
  'success-color': '#36d399',
  'success-deep-color': '#2BA97A',
  'success-deeper-color': '#207F5C',
  'el-color-success': '#36d399',
  'el-color-success-dark-2': '#2BA97A',
  'el-color-success-light-3': '#72E0B8',
  'el-color-success-light-5': '#9BE9CC',
  'el-color-success-light-7': '#C3F2E0',
  'el-color-success-light-8': '#D7F6EB',
  'el-color-success-light-9': '#EBFBF5',

  'el-bg-color': '#ffffff',
  'el-bg-color-page': '#f2f3f5',
  'el-bg-color-overlay': '#ffffff',
  'el-text-color-primary': '#303133',
  'el-text-color-regular': '#606266',
  'el-text-color-secondary': '#909399',
  'el-text-color-placeholder': '#a8abb2',
  'el-text-color-disabled': '#c0c4cc',
  'el-border-color': '#dcdfe6',
  'el-border-color-light': '#e4e7ed',
  'el-border-color-lighter': '#ebeef5',
  'el-border-color-extra-light': '#f2f6fc',
  'el-border-color-dark': '#d4d7de',
  'el-border-color-darker': '#cdd0d6',
  'el-fill-color': '#f0f2f5',
  'el-fill-color-light': '#f5f7fa',
  'el-fill-color-lighter': '#fafafa',
  'el-fill-color-extra-light': '#fafcff',
  'el-fill-color-dark': '#ebedf0',
  'el-fill-color-darker': '#e6e8eb',
  'el-fill-color-blank': '#ffffff',
  'el-color-white': '#ffffff',
  'el-color-black': '#000000',
}

// 复制颜色值
function copyColor(color: string) {
  navigator.clipboard.writeText(`--${color}`)
  ElMessage.success(`已复制颜色值：--${color}`)
}
</script>

<template>
  <p class="title">标签：</p>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1 line-height-2">Dark</span>
    <el-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark">
      {{ item.label }}
    </el-tag>
    <el-tag v-for="item in items" :key="item.label" :type="item.type" class="mx-1" effect="dark" closable>
      {{ item.label }}
    </el-tag>
  </div>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1">Light</span>
    <el-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="light">
      {{ item.label }}
    </el-tag>
    <el-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="light" closable>
      {{ item.label }}
    </el-tag>
  </div>
  <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
    <span class="tag-group__title m-1">Plain</span>
    <el-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="plain">
      {{ item.label }}
    </el-tag>
    <el-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="plain" closable>
      {{ item.label }}
    </el-tag>
  </div>

  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">颜色展示</h1>

    <div class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-2">
      <div v-for="(color, name) in colors" :key="name" class="color-box" @click="copyColor(name)">
        <div class="h-20 rounded-t-lg" :style="{ backgroundColor: color }" />
        <div class="p-2 text-sm">
          <div class="font-medium truncate">--{{ name }}</div>
          <div class="font-mono text-gray-600">{{ color }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
    @apply leading-8 text-base font-bold;
}
.color-box {
    @apply bg-white rounded-lg shadow hover:shadow-lg transition-all cursor-pointer;
}

.color-box:hover {
    transform: translateY(-2px);
}
</style>
