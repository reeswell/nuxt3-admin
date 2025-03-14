import type { CascaderOption, FormItemRule, TableColumnCtx } from 'element-plus'

import type { TableProps } from 'element-plus/es/components/table/src/table/defaults'

// 从 Element Plus 的类型中提取事件类型
type ElTableEvents = Partial<{
  'select': (selection: any[], row: any) => void
  'select-all': (selection: any[]) => void
  'selection-change': (selection: any[]) => void
  'cell-mouse-enter': (row: any, column: TableColumnCtx<any>, cell: HTMLElement, event: MouseEvent) => void
  'cell-mouse-leave': (row: any, column: TableColumnCtx<any>, cell: HTMLElement, event: MouseEvent) => void
  'cell-click': (row: any, column: TableColumnCtx<any>, cell: HTMLElement, event: MouseEvent) => void
  'cell-dblclick': (row: any, column: TableColumnCtx<any>, cell: HTMLElement, event: MouseEvent) => void
  'row-click': (row: any, column: TableColumnCtx<any>, event: MouseEvent) => void
  'row-contextmenu': (row: any, column: TableColumnCtx<any>, event: MouseEvent) => void
  'row-dblclick': (row: any, column: TableColumnCtx<any>, event: MouseEvent) => void
  'header-click': (column: TableColumnCtx<any>, event: MouseEvent) => void
  'header-contextmenu': (column: TableColumnCtx<any>, event: MouseEvent) => void
  'sort-change': (data: { column: TableColumnCtx<any>, prop: string, order: string }) => void
  'filter-change': (filters: Record<string, any[]>) => void
  'current-change': (currentRow: any, oldCurrentRow: any) => void
  'header-dragend': (newWidth: number, oldWidth: number, column: TableColumnCtx<any>, event: MouseEvent) => void
  'expand-change': (row: any, expanded: boolean) => void
}>

// 扩展的表格属性接口
export interface ExtendedTableProps extends Partial<TableProps<any>> {
  tableEvents?: ElTableEvents
}

// 表格字段配置
export interface TableColumn {
  prop: string
  label: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  fixed?: boolean | 'left' | 'right'
  sortable?: boolean
  slot?: boolean // 是否使用自定义插槽
  formatter?: (row: any, column: TableColumn, cellValue: any) => string
}

export interface Option {
  label: string
  value: any
  children?: Option[]
}

// 查询表单项配置
export interface FilterFormItem {
  prop: string
  label: string
  type: 'input' | 'select' | 'date' | 'daterange' | 'number' | 'cascader'
  placeholder?: string
  options?: Option[] & CascaderOption[] // 下拉选项
  rules?: FormItemRule[]
  defaultValue?: any
  attrs?: Record<string, any> // 额外的属性
}

// 分页参数
export interface PaginationParams {
  page: number
  limit: number
}

// 表格数据接口
export interface TableData {
  results: any[]
  total: number
}

// 组件 Props 接口
export interface FilterTableProps {
  columns: TableColumn[] // 表格列配置
  filterItems?: FilterFormItem[] // 筛选表单配置
  showPagination?: boolean // 是否显示分页
  autoLoad?: boolean // 是否自动加载数据
  immediate?: boolean // 是否立即执行查询
  pageSize?: number // 每页条数
  pageSizes?: number[] // 可选的每页条数
  data?: any[]
  total?: number
  loading?: boolean
  autoScroll?: boolean
  tableProps?: Record<string, any> // 额外的表格属性
  tableEvents?: ExtendedTableProps // 额外的表格方法
  expand?: boolean
  selection?: boolean
  selectable?: (row: any) => boolean
}

export interface RemoteLoadConfig {
  api: (query: string) => Promise<any>
  transformResponse: (res: any) => Option[]
}
