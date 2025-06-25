<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { Download, Plus } from '@element-plus/icons-vue'
import type { FilterFormItem } from '~/types/table'
import FilterTable from '~/components/common/FilterTable.vue'

interface FullMockData {
  orderNo: string
  orderDate: string
  customerName: string
  salesPerson: string
  status: string
  totalAmount: number
  paymentStatus: string

}

// 表格引用
const filterTableRef = ref()

// 表格数据
const tableData = ref([])
const loading = ref(false)
const total = ref(0)

// 定义筛选项
const filterItems = reactive<FilterFormItem[]>([
  {
    type: 'input',
    label: '销售单号',
    prop: 'orderNo',
    placeholder: '请输入销售单号',
  },
  {
    type: 'select',
    label: '销售状态',
    prop: 'status',
    placeholder: '请选择销售状态',
    options: [
      { label: '待审核', value: 'pending' },
      { label: '已审核', value: 'approved' },
      { label: '已发货', value: 'shipped' },
      { label: '已完成', value: 'completed' },
      { label: '已取消', value: 'cancelled' },
    ],
  },
  {
    type: 'input',
    label: '客户名称',
    prop: 'customerName',
    placeholder: '请输入客户名称',
  },
  {
    type: 'daterange',
    label: '销售日期',
    prop: 'orderDateRange',
    placeholder: '选择日期范围',
    attrs: {
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    type: 'select',
    label: '销售员',
    prop: 'salesPerson',
    placeholder: '请选择销售员',
    options: [
      { label: '张三', value: 'zhangsan' },
      { label: '李四', value: 'lisi' },
      { label: '王五', value: 'wangwu' },
    ],
  },
  {
    type: 'number',
    label: '最小金额',
    prop: 'minAmount',
    placeholder: '最小金额',
    defaultValue: 0,
    attrs: {
      min: 0,
      precision: 2,
    },
  },
  {
    type: 'number',
    label: '最大金额',
    prop: 'maxAmount',
    placeholder: '最大金额',
    defaultValue: 10000,
    attrs: {
      min: 0,
      precision: 2,
    },
  },
])

// 定义表格列
const columns = [
  { prop: 'orderNo', label: '销售单号' },
  { prop: 'orderDate', label: '销售日期' },
  { prop: 'customerName', label: '客户名称' },
  { prop: 'salesPerson', label: '销售员' },
  {
    prop: 'status',
    label: '状态',
    formatter: (row: FullMockData, column, cellValue) => {
      const statusMap = {
        pending: '待审核',
        approved: '已审核',
        shipped: '已发货',
        completed: '已完成',
        cancelled: '已取消',
      }
      return statusMap[cellValue] || cellValue
    },
  },
  { prop: 'totalAmount', label: '销售金额' },
  { prop: 'paymentStatus', label: '付款状态' },
  { prop: 'operation', label: '操作', slot: true },
]

// 模拟查询数据
async function handleQuery(params: any) {
  loading.value = true
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 500))

    // 首先生成完整的模拟数据集
    const fullMockData = []
    const totalRawItems = 156 // 原始总数据量

    // 生成所有模拟数据
    for (let i = 0; i < totalRawItems; i++) {
      const statusOptions = ['pending', 'approved', 'shipped', 'completed', 'cancelled']
      const paymentStatusOptions = ['未付款', '部分付款', '已付款']

      fullMockData.push({
        id: i + 1,
        orderNo: `SO-${new Date().getFullYear()}-${String(10000 + i).substring(1)}`,
        orderDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        customerName: `客户${i % 10 + 1}`,
        salesPerson: ['张三', '李四', '王五'][i % 3],
        status: statusOptions[i % statusOptions.length],
        totalAmount: (Math.random() * 10000 + 1000).toFixed(2),
        paymentStatus: paymentStatusOptions[i % paymentStatusOptions.length],
      })
    }

    // 根据筛选条件过滤数据
    let filteredData = [...fullMockData]

    if (params.orderNo) {
      filteredData = filteredData.filter(item => item.orderNo.includes(params.orderNo))
    }

    if (params.status) {
      filteredData = filteredData.filter(item => item.status === params.status)
    }

    if (params.customerName) {
      filteredData = filteredData.filter(item => item.customerName.includes(params.customerName))
    }

    if (params.salesPerson) {
      filteredData = filteredData.filter(item => item.salesPerson === params.salesPerson)
    }

    if (params.minAmount) {
      filteredData = filteredData.filter(item => Number.parseFloat(item.totalAmount) >= Number.parseFloat(params.minAmount))
    }

    if (params.maxAmount) {
      filteredData = filteredData.filter(item => Number.parseFloat(item.totalAmount) <= Number.parseFloat(params.maxAmount))
    }

    if (params.orderDateRange && params.orderDateRange.length === 2) {
      const [startDate, endDate] = params.orderDateRange
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.orderDate)
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate)
      })
    }

    // 更新总数据量为过滤后的数量
    total.value = filteredData.length

    // 分页处理
    const pageSize = params.limit || 20
    const currentPage = params.page || 1
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize

    // 返回当前页的数据
    tableData.value = filteredData.slice(startIndex, endIndex)

    return tableData.value
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    ElMessage.error('查询销售单失败')
    return []
  }
  finally {
    loading.value = false
  }
}
// 查看详情
function handleView(row: FullMockData) {
  ElMessage.info(`查看销售单: ${row.orderNo}`)
}

// 编辑销售单
function handleEdit(row: FullMockData) {
  ElMessage.info(`编辑销售单: ${row.orderNo}`)
}

// 审核销售单
function handleApprove(row: FullMockData) {
  ElMessageBox.confirm(`确认审核销售单 ${row.orderNo}?`, '审核确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success(`销售单 ${row.orderNo} 审核成功`)
    // 重新加载数据
    filterTableRef.value.reload()
  }).catch(() => {
    ElMessage.info('已取消审核')
  })
}

// 取消销售单
function handleCancel(row: FullMockData) {
  ElMessageBox.confirm(`确认取消销售单 ${row.orderNo}?`, '取消确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success(`销售单 ${row.orderNo} 已取消`)
    // 重新加载数据
    filterTableRef.value.reload()
  }).catch(() => {
    ElMessage.info('已取消操作')
  })
}

// 新增销售单
function handleAdd() {
  ElMessage.info('新增销售单')
}

// 批量导出
function handleExport() {
  ElMessage.info('批量导出销售单')
}

// 表格行样式
function tableRowClassName({ row }) {
  if (row.status === 'cancelled') {
    return 'cancelled-row'
  }
  return ''
}

// 表格属性
const tableProps = {
  rowClassName: tableRowClassName,
}
</script>

<template>
  <div class="sales-order-list">
    <FilterTable
      ref="filterTableRef" :filter-items="filterItems" :columns="columns" :data="tableData"
      :loading="loading" :total="total" :table-props="tableProps" @query="handleQuery"
    >
      <!-- 操作列 -->
      <template #filterOperation>
        <el-button type="primary" :icon="Plus" @click="handleAdd">
          新增销售单
        </el-button>
        <el-button :icon="Download" @click="handleExport">
          导出
        </el-button>
      </template>
      <template #operation="{ row }">
        <el-button type="primary" link size="small" @click="handleView(row)">
          查看
        </el-button>
        <el-button v-if="row.status === 'pending'" type="primary" link size="small" @click="handleEdit(row)">
          编辑
        </el-button>
        <el-button v-if="row.status === 'pending'" type="success" link size="small" @click="handleApprove(row)">
          审核
        </el-button>
        <el-button
          v-if="['pending', 'approved'].includes(row.status)" type="danger" link size="small"
          @click="handleCancel(row)"
        >
          取消
        </el-button>
      </template>
    </FilterTable>
  </div>
</template>

<style lang="scss" scoped>
.sales-order-list {

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      font-size: 20px;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 10px;
    }
  }

  :deep(.cancelled-row) {
    color: #999;
    text-decoration: line-through;
    background-color: #f9f9f9;
  }
}
</style>
