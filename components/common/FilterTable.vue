<script setup lang="ts">
import type { FormInstance, TableInstance } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { filterEmptyProperties } from '~/lib/utils'
import type { FilterTableProps, PaginationParams, TableData } from '~/types/table'

const props = withDefaults(defineProps<FilterTableProps>(), {
  showPagination: true,
  autoLoad: true,
  immediate: true,
  pageSize: 20,
  pageSizes: () => [20, 50, 100],
  filterItems: () => [],
  data: () => [],
  total: 0,
  loading: false,
  autoScroll: true,
  expand: false,
  tableProps: () => ({}),
  tableEvents: () => ({}),
  selection: false,
  selectable: () => true,
})

const emit = defineEmits<{
  (e: 'query', params: Record<string, any>): Promise<TableData>
}>()
// 表格数据
const filterFormEl = ref<FormInstance>()
const tableEl = ref<TableInstance>()
// 分页参数
const pagination = reactive<PaginationParams>({
  page: 1,
  limit: props.pageSize,
})

// 筛选条件
const filterForm = reactive<Record<string, any>>({})

// 初始化筛选表单
function initFilterForm() {
  props.filterItems.forEach((item) => {
    filterForm[item.prop] = item.defaultValue ?? ''
  })
}

// 重置筛选条件
function resetFilter() {
  initFilterForm()
  handleSearch()
}

// 搜索
function handleSearch() {
  pagination.page = 1
  loadData()
}

// 加载数据
async function loadData() {
  // 触发查询事件，由父组件处理
  const params = {
    ...filterForm,
    ...pagination,
  }
  emit('query', filterEmptyProperties(params))
  if (props.autoScroll) {
    scrollTo(0, 0)
  }
}

// 页码改变
function handlePageChange(page: number) {
  pagination.page = page
  loadData()
}

// 每页条数改变
function handleSizeChange(size: number) {
  pagination.limit = size
  pagination.page = 1
  loadData()
}

// 暴露方法给父组件
defineExpose({
  reload: loadData,
  reset: resetFilter,
  filterFormEl,
  tableEl,
})

// 初始化
onMounted(() => {
  initFilterForm()
  if (props.autoLoad && props.immediate) {
    loadData()
  }
})
</script>

<template>
  <div class="data-table">
    <!-- 筛选表单 -->
    <el-form v-if="filterItems.length" ref="filterFormEl" :model="filterForm" inline class="filter-form">
      <div class="filter-form-grid">
        <el-form-item
          v-for="item in filterItems" :key="item.prop" :label="item.label" :prop="item.prop"
          :rules="item.rules"
        >
          <!-- 输入框 -->
          <el-input
            v-if="item.type === 'input'" v-model="filterForm[item.prop]" :placeholder="item.placeholder"
            v-bind="item.attrs" clearable @keyup.enter="handleSearch"
          />

          <!-- 选择框 -->
          <el-select
            v-else-if="item.type === 'select'" v-model="filterForm[item.prop]" :placeholder="item.placeholder"
            v-bind="item.attrs" clearable
          >
            <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>

          <!-- 日期选择器 -->
          <el-date-picker
            v-else-if="item.type === 'date'" v-model="filterForm[item.prop]" :type="item.type"
            :placeholder="item.placeholder" v-bind="item.attrs"
          />

          <!-- 日期范围选择器 -->
          <el-date-picker
            v-else-if="item.type === 'daterange'" v-model="filterForm[item.prop]" type="daterange"
            :placeholder="item.placeholder" v-bind="item.attrs"
          />

          <!-- 级联选择器 -->
          <el-cascader
            v-else-if="item.type === 'cascader'" v-model="filterForm[item.prop]" :options="item.options"
            :placeholder="item.placeholder" v-bind="item.attrs"
          />

          <!-- 数字输入框 -->
          <el-input-number
            v-else-if="item.type === 'number'" v-model="filterForm[item.prop]"
            :placeholder="item.placeholder" v-bind="item.attrs"
          />
        </el-form-item>
      </div>
      <div class="filter-form-buttons">
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetFilter">重置</el-button>
          <slot name="filterOperation" />
        </el-form-item>
      </div>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-bind="tableProps" ref="tableEl" v-loading="loading" show-overflow-tooltip :data="data" border
      style="width: 100%" v-on="tableEvents"
    >
      <el-table-column v-if="selection" :selectable="selectable" type="selection" width="55" />
      <el-table-column v-if="expand" type="expand">
        <template #default="{ row }">
          <slot name="expand" :row="row" />
        </template>
      </el-table-column>

      <template v-for="col in columns" :key="col.prop">
        <el-table-column
          :prop="col.prop" :label="col.label" :width="col.width" :align="col.align || 'center'"
          :fixed="col.fixed" :sortable="col.sortable"
        >
          <template #default="scope">
            <slot v-if="col.slot" :name="col.prop" :row="scope.row" :column="col" :index="scope.$index" />
            <template v-else>
              {{ col.formatter ? col.formatter(scope.row, col, scope.row[col.prop]) : scope.row[col.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>

      <!-- 操作列插槽 -->
      <!-- <slot name="operation" /> -->
    </el-table>

    <!-- 分页 -->
    <div v-if="showPagination && total > 0" class="pagination-container">
      <el-pagination
        v-model:current-page="pagination.page" v-model:page-size="pagination.limit" :page-sizes="pageSizes"
        :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-table) {
  transform: scale(1);
}

.data-table {

  .filter-form {
    padding: 16px;
    padding-bottom: 0;
    background: #fff;
    border-radius: 4px;
    margin-bottom: 16px;

    .filter-form-container {
      position: relative;
      overflow: hidden;
      transition: height 0.3s ease-in-out;
    }

    .filter-form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      margin-bottom: 16px;

      :deep(.el-form-item) {
        margin-bottom: 0;

        // 让所有表单控件宽度一致
        .el-input,
        .el-select,
        .el-cascader,
        .el-checkbox,
        .el-date-editor {
          width: 100%;
        }

        // 统一标签宽度
        .el-form-item__label {
          width: 100px;
        }

        // 统一内容区域宽度
        .el-form-item__content {
          flex: 1;
          margin-left: 10px !important;
        }
      }
    }

    .filter-form-buttons {
      text-align: right;
      padding-top: 16px;
      border-top: 1px solid #ebeef5;
    }
  }

  .pagination-container {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 30px;
    margin-right: 30px;
  }
}

// 主体内容样式
.data-table {
  .filter-form {
    background: var(--el-bg-color);
    border: 1px solid var(--el-border-color-lighter);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    .filter-form-grid {
      background: var(--el-bg-color);

    }

    .filter-form-buttons {
      border-top: 1px solid var(--el-border-color-lighter);
    }

    .filter-form-buttons {

      position: relative;
      text-align: right;
      padding-top: 16px;
      border-top: 1px solid #ebeef5;

      .expand-button {
        .expand-icon {
          margin-left: 4px;
          transition: transform 0.3s;

          &.is-expanded {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  // 分页样式
  .pagination-container {
    .el-pagination {
      --el-pagination-button-bg-color: var(--el-bg-color);
      --el-pagination-hover-color: var(--el-color-primary);

      .el-pagination__total {
        color: var(el-text-color-regular);
      }

      .btn-prev,
      .btn-next {
        background-color: var(--el-bg-color);

        &:hover {
          color: var(--el-color-primary);
        }
      }

      .el-pager li {
        background-color: var(--el-bg-color);

        &.active {
          background-color: var(--el-color-primary);
          color: white;
        }

        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
