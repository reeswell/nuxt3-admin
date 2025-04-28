<!-- components/DynamicForm.vue -->
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { computed, provide, reactive, ref, watch } from 'vue'
import type { DynamicFormExpose, DynamicFormProps } from '~/types/dynamic-form'

const props = withDefaults(defineProps<DynamicFormProps>(), {
  formComList: () => [],
  rules: () => ({}),
  formProps: () => ({
    // 默认表单属性
    labelWidth: '100px',
    labelPosition: 'right',
    // 注意：不在这里设置宽度，因为这会覆盖用户的自定义样式
  }),
  formEvents: () => ({}),
  width: '500px', // 新增宽度属性
  loading: false,
})

const formRef = ref<FormInstance>()
const formData = reactive<Record<string, any>>({})

// 计算可见组件
const visibleComponents = computed(() => {
  return props.formComList.filter((item) => {
    if (typeof item.visible === 'function') {
      return item.visible(formData)
    }
    return item.visible !== false
  })
})

// 初始化表单数据
watch(
  () => props.formComList,
  (newList) => {
    for (const item of newList) {
      if (!(item.key in formData)) {
        if (item.name === 'checkbox-group' && item.defaultValue === undefined) {
          // 为多选框组设置空数组作为默认值
          formData[item.key] = []
        }
        else {
          formData[item.key] = item.defaultValue !== undefined ? item.defaultValue : null
        }
      }
    }
  },
  { immediate: true },
)
// 设置单个字段值
function setFieldValue(key: string, value: any) {
  formData[key] = value
}

// 设置多个字段值
function setFieldsValue(values: Record<string, any>) {
  Object.keys(values).forEach((key) => {
    formData[key] = values[key]
  })
}

// 表单验证
function validate(callback?: (valid: boolean) => void): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!formRef.value) {
      const valid = false
      callback?.(valid)
      reject(new Error('Form instance is not available'))
      return
    }

    formRef.value.validate((valid, fields) => {
      callback?.(valid)
      if (valid) {
        resolve(true)
      }
      else {
        reject(fields)
      }
    })
  })
}

// 验证单个字段
function validateField(prop: string | string[]) {
  return new Promise((resolve, reject) => {
    if (!formRef.value) {
      reject(new Error('Form instance is not available'))
      return
    }

    formRef.value.validateField(prop, (valid, message) => {
      if (valid) {
        resolve(true)
      }
      else {
        reject(message)
      }
    })
  })
}

// 提供表单上下文
provide('form-context', {
  formData,
  validate: validateField,
})

// 暴露方法
defineExpose<DynamicFormExpose>({
  validate,
  resetFields: () => formRef.value?.resetFields(),
  clearValidate: (props?: string | string[]) => formRef.value?.clearValidate(props),
  getFormData: () => formData,
  setFieldValue,
  setFieldsValue,
})
</script>

<template>
  <el-form
    ref="formRef" :style="{ width }" :model="formData" :rules="rules" v-bind="formProps || {}"
    v-on="formEvents || {}"
  >
    <slot name="formFront" />

    <template v-for="item in visibleComponents" :key="item.key">
      <el-form-item
        :prop="item.key" :label="item.label" :label-width="item.labelWidth"
        v-bind="item.formItemProps || {}"
      >
        <!-- 使用具名插槽 -->
        <slot v-if="item.slot" :name="`${item.key}`" :value="formData[item.key]" :row="item" :form-data="formData" />

        <!-- 使用条件渲染 -->
        <template v-else>
          <!-- 输入框 -->
          <el-input
            v-if="item.name === 'input'" v-model="formData[item.key]" v-bind="(item.props || {}) as any"
            v-on="item.events || {}"
          />

          <!-- 选择器 -->
          <el-select
            v-else-if="item.name === 'select'" v-model="formData[item.key]" v-bind="(item.props || {}) as any"
            v-on="item.events || {}"
          >
            <el-option
              v-for="option in item.options" :key="option.value || option.label" :label="option.label"
              :value="option.value" :disabled="option.disabled"
            >
              {{ option.text || option.label }}
            </el-option>
          </el-select>

          <!-- 日期选择器 -->
          <el-date-picker
            v-else-if="item.name === 'date-picker'" v-model="formData[item.key]"
            v-bind="(item.props || {}) as any" v-on="item.events || {}"
          />

          <!-- 时间选择器 -->
          <el-time-picker
            v-else-if="item.name === 'time-picker'" v-model="formData[item.key]"
            v-bind="(item.props || {}) as any" v-on="item.events || {}"
          />

          <!-- 开关 -->
          <el-switch
            v-else-if="item.name === 'switch'" v-model="formData[item.key]" v-bind="(item.props || {}) as any"
            v-on="item.events || {}"
          />

          <!-- 多选框组 -->
          <el-checkbox-group
            v-else-if="item.name === 'checkbox-group'" v-model="formData[item.key]"
            v-bind="(item.props || {}) as any" v-on="item.events || {}"
          >
            <el-checkbox
              v-for="option in item.options" :key="option.value || option.label" :value="option.value"
              :disabled="option.disabled"
            >
              {{ option.text || option.label }}
            </el-checkbox>
          </el-checkbox-group>

          <!-- 单选框 -->
          <el-checkbox
            v-else-if="item.name === 'checkbox'" v-model="formData[item.key]"
            v-bind="(item.props || {}) as any" v-on="item.events || {}"
          >
            {{ item.label }}
          </el-checkbox>

          <!-- 单选框组 -->
          <el-radio-group
            v-else-if="item.name === 'radio-group'" v-model="formData[item.key]"
            v-bind="(item.props || {}) as any" v-on="item.events || {}"
          >
            <el-radio
              v-for="option in item.options" :key="option.value || option.label" :value="option.value"
              :disabled="option.disabled"
            >
              {{ option.text || option.label }}
            </el-radio>
          </el-radio-group>

          <!-- 数字输入框 -->
          <el-input-number
            v-else-if="item.name === 'input-number'" v-model="formData[item.key]"
            v-bind="(item.props || {}) as any" v-on="item.events || {}"
          />

          <!-- 级联选择器 -->
          <el-cascader
            v-else-if="item.name === 'cascader'" v-model="formData[item.key]" :options="item.options"
            v-bind="(item.props || {}) as any" v-on="item.events || {}"
          />

          <!-- 默认情况下使用输入框 -->
          <el-input v-else v-model="formData[item.key]" v-bind="(item.props || {}) as any" v-on="item.events || {}" />
        </template>
      </el-form-item>
    </template>

    <slot />

    <slot name="formFooter" />
  </el-form>
</template>

<style scoped>
.el-form {
  position: relative;
}
/* 为表单控件设置宽度 */
:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input),
:deep(.el-select),
:deep(.el-date-picker),
:deep(.el-time-picker),
:deep(.el-input-number),
:deep(.el-cascader) {
  width: 100%;
}

.el-form--loading {
  pointer-events: none;
  opacity: 0.7;
}
</style>
