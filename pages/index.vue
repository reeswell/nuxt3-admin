<script setup lang="ts">
import type { TagProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

interface Item { type: TagProps['type'], label: string }

const items = ref<Array<Item>>([
  { type: 'primary', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'danger', label: 'Tag 4' },
  { type: 'warning', label: 'Tag 5' },
])

// 定义固定的CSS变量名列表
const cssVarNames = [
  'primary-lighter-color',
  'primary-light-color',
  'primary-color',
  'primary-deep-color',
  'primary-deeper-color',
  'el-color-primary',
  'el-color-primary-dark-2',
  'el-color-primary-light-3',
  'el-color-primary-light-5',
  'el-color-primary-light-7',
  'el-color-primary-light-8',
  'el-color-primary-light-9',
  'info-lighter-color',
  'info-light-color',
  'info-color',
  'info-deep-color',
  'info-deeper-color',
  'el-color-info',
  'el-color-info-dark-2',
  'el-color-info-light-3',
  'el-color-info-light-5',
  'el-color-info-light-7',
  'el-color-info-light-8',
  'el-color-info-light-9',
  'warning-lighter-color',
  'warning-light-color',
  'warning-color',
  'warning-deep-color',
  'warning-deeper-color',
  'el-color-warning',
  'el-color-warning-dark-2',
  'el-color-warning-light-3',
  'el-color-warning-light-5',
  'el-color-warning-light-7',
  'el-color-warning-light-8',
  'el-color-warning-light-9',
  'danger-lighter-color',
  'danger-light-color',
  'danger-color',
  'danger-deep-color',
  'danger-deeper-color',
  'el-color-danger',
  'el-color-danger-dark-2',
  'el-color-danger-light-3',
  'el-color-danger-light-5',
  'el-color-danger-light-7',
  'el-color-danger-light-8',
  'el-color-danger-light-9',
  'success-lighter-color',
  'success-light-color',
  'success-color',
  'success-deep-color',
  'success-deeper-color',
  'el-color-success',
  'el-color-success-dark-2',
  'el-color-success-light-3',
  'el-color-success-light-5',
  'el-color-success-light-7',
  'el-color-success-light-8',
  'el-color-success-light-9',
  'el-bg-color',
  'el-bg-color-page',
  'el-bg-color-overlay',
  'el-text-color-primary',
  'el-text-color-regular',
  'el-text-color-secondary',
  'el-text-color-placeholder',
  'el-text-color-disabled',
  'el-border-color',
  'el-border-color-light',
  'el-border-color-lighter',
  'el-border-color-extra-light',
  'el-border-color-dark',
  'el-border-color-darker',
  'el-fill-color',
  'el-fill-color-light',
  'el-fill-color-lighter',
  'el-fill-color-extra-light',
  'el-fill-color-dark',
  'el-fill-color-darker',
  'el-fill-color-blank',
  'el-color-white',
  'el-color-black',

] as const

// 创建响应式的颜色对象
const colors = ref<Record<string, string>>({})

// 获取CSS变量的实际颜色值
function getCSSVariableValue(varName: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${varName}`)
    .trim()
}

// 初始化颜色值
function initColors() {
  cssVarNames.forEach((varName) => {
    colors.value[varName] = getCSSVariableValue(varName)
  })
}

// 复制颜色值
function copyColor(color: string) {
  navigator.clipboard.writeText(`--${color}`)
  ElMessage.success(`已复制颜色值：--${color}`)
}

// 组件挂载时初始化颜色值
onMounted(() => {
  initColors()
})
</script>

<template>
  <div>
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
      <span class="tag-group__title m-1">Plain</span>
      <el-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="plain">
        {{ item.label }}
      </el-tag>
      <el-tag v-for="item in items" :key="item.label" class="mx-1" :type="item.type" effect="plain" closable>
        {{ item.label }}
      </el-tag>
    </div>
    <!-- 其他模板内容保持不变 -->
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
