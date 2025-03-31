import type {
  CascaderProps,
  CheckboxGroupProps,
  CheckboxProps,
  DatePickerProps,
  FormItemProps,
  FormProps,
  FormRules,
  ISelectProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  SwitchProps,
} from 'element-plus'

// 组件属性类型映射
export interface ComponentPropsMap {
  'input': InputProps
  'select': ISelectProps
  'date-picker': DatePickerProps
  'time-picker': DatePickerProps
  'switch': SwitchProps
  'checkbox-group': CheckboxGroupProps
  'checkbox': CheckboxProps
  'radio-group': RadioGroupProps
  'input-number': InputNumberProps
  'cascader': CascaderProps
}

export type ComponentName = keyof ComponentPropsMap
export type OptionComponentName = 'select' | 'checkbox-group' | 'radio-group'

export interface Option {
  label: string
  value: any
  text?: string
  disabled?: boolean
  [key: string]: any
}

export interface FormComponent {
  defaultValue: any
  key: string
  name: ComponentName
  label: string
  value: any
  labelWidth?: string | number
  slot?: boolean
  props?: Partial<ComponentPropsMap[ComponentName]>
  events?: Record<string, (...args: any[]) => void>
  options?: Option[]
  formItemProps?: Partial<FormItemProps>
  visible?: boolean | ((model: Record<string, any>) => boolean)
  validator?: (value: any, model: Record<string, any>) => boolean | string | Promise<boolean | string>
}

export interface DynamicFormProps {
  formComList: FormComponent[]
  rules?: FormRules
  formProps?: Partial<FormProps>
  formEvents?: Record<string, (...args: any[]) => void>
  width?: string // 新增宽度属性
  loading?: boolean
}

export interface DynamicFormExpose {
  validate: (callback?: (valid: boolean) => void) => Promise<boolean>
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  getFormData: () => Record<string, any>
  setFieldValue: (key: string, value: any) => void
  setFieldsValue: (values: Record<string, any>) => void
}
