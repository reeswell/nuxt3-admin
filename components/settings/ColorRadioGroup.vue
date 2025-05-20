<!-- components/ColorRadioGroup.vue -->
<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'

interface Props {
  modelValue?: string
  colors?: Array<{
    value: string
    label?: string
  }>
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  colors: () => [
    { value: '#1f2937', label: '深灰' },
    { value: '#7a5cad', label: '紫色' },
    { value: '#0071be', label: '蓝色' },
    { value: '#b34849', label: '红色' },
    { value: '#3f51b5', label: '靛蓝' },
  ],
})

const emit = defineEmits<Emits>()

const selectedColor = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  },
})
</script>

<template>
  <div class="color-radio-group flex gap-2 items-center">
    <div
      v-for="color in colors" :key="color.value" class="color-radio relative"
      :class="{ 'is-active': selectedColor === color.value }" @click="selectedColor = color.value"
    >
      <!-- 颜色圆圈 -->
      <div
        class="w-6 h-6 rounded-full cursor-pointer flex items-center justify-center"
        :style="{ backgroundColor: color.value }"
      >
        <!-- 勾选图标 -->
        <el-icon v-if="selectedColor === color.value" size="14">
          <Check class="text-white font-bold" />
        </el-icon>
      </div>

      <!-- 悬浮提示 -->
      <el-tooltip v-if="color.label" :content="color.label" placement="top" :show-after="200">
        <span class="block w-full h-full" />
      </el-tooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.color-radio-group {
  .color-radio {
    &:hover {
      transform: scale(1.1);
    }

    &.is-active {
      transform: scale(1.1);
    }
  }
}

:deep(.el-icon) {
  font-size: 14px;
  font-weight: bold;
}
</style>
