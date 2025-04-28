<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FilterFormItem } from '~/types/table'
import FilterTable from '~/components/common/FilterTable.vue'
// 表格引用
const filterTableRef = ref()

// 表格数据
const tableData = ref([])
const total = ref(0)
const loading = ref(false)

// 对话框控制
const dialogVisible = ref(false)
const userForm = reactive({
  id: '',
  username: '',
  email: '',
  role: '',
  status: 'active',
})

// 筛选项配置
const filterItems = ref<FilterFormItem[]>([
  {
    type: 'input',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
  },
  {
    type: 'input',
    label: '邮箱',
    prop: 'email',
    placeholder: '请输入邮箱',
  },
  {
    type: 'select',
    label: '角色',
    prop: 'role',
    placeholder: '请选择角色',
    options: [
      { label: '管理员', value: 'admin' },
      { label: '普通用户', value: 'user' },
    ],
  },
  {
    type: 'select',
    label: '状态',
    prop: 'status',
    placeholder: '请选择状态',
    options: [
      { label: '活跃', value: 'active' },
      { label: '禁用', value: 'inactive' },
    ],
  },
  {
    type: 'daterange',
    label: '注册时间',
    prop: 'registerTime',
    placeholder: '选择时间范围',
    attrs: {
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      valueFormat: 'YYYY-MM-DD',
    },
  },
])

// 表格列配置
const columns = ref([
  { prop: 'id', label: 'ID', width: '80px' },
  { prop: 'username', label: '用户名' },
  { prop: 'email', label: '邮箱' },
  { prop: 'role', label: '角色' },
  { prop: 'status', label: '状态', slot: true },
  { prop: 'createdAt', label: '创建时间', formatter: row => formatDate(row.createdAt) },
  { prop: 'operation', label: '操作', slot: true },
])

// 表格属性
const tableProps = {
  rowKey: 'id',
  border: true,
  stripe: true,
  highlightCurrentRow: true,
}

// 表格事件
const tableEvents = {
  'row-click': (row:any) => {
    console.log('点击了行:', row)
  },
}

// 处理查询
async function handleQuery(params:any) {
  loading.value = true
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 500))

    // 生成完整的模拟数据集
    const fullMockData = []
    const totalItems = 100 // 总数据量

    for (let i = 1; i <= totalItems; i++) {
      fullMockData.push({
        id: i,
        username: `user${i}`,
        email: `user${i}@example.com`,
        role: i % 3 === 0 ? 'admin' : 'user',
        status: i % 5 === 0 ? 'inactive' : 'active',
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
        lastLogin: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
        remark: i % 2 === 0 ? '这是一条备注信息' : '',
      })
    }

    // 应用筛选条件
    let filteredData = [...fullMockData]

    // 用户名筛选
    if (params.username) {
      filteredData = filteredData.filter(item =>
        item.username.toLowerCase().includes(params.username.toLowerCase()),
      )
    }

    // 邮箱筛选
    if (params.email) {
      filteredData = filteredData.filter(item =>
        item.email.toLowerCase().includes(params.email.toLowerCase()),
      )
    }

    // 角色筛选
    if (params.role) {
      filteredData = filteredData.filter(item => item.role === params.role)
    }

    // 状态筛选
    if (params.status) {
      filteredData = filteredData.filter(item => item.status === params.status)
    }

    // 注册时间范围筛选
    if (params.registerTime && params.registerTime.length === 2) {
      const [startDate, endDate] = params.registerTime
      const start = new Date(startDate)
      const end = new Date(endDate)
      // 设置结束日期为当天的最后一毫秒，以便包含整个结束日期
      end.setHours(23, 59, 59, 999)

      filteredData = filteredData.filter((item) => {
        const createdDate = new Date(item.createdAt)
        return createdDate >= start && createdDate <= end
      })
    }

    // 更新总记录数
    const filteredTotal = filteredData.length
    total.value = filteredTotal

    // 分页处理
    const pageSize = params.limit || 20
    const currentPage = params.page || 1
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, filteredTotal)

    // 获取当前页的数据
    const currentPageData = filteredData.slice(startIndex, endIndex)
    tableData.value = currentPageData

    return {
      data: currentPageData,
      total: filteredTotal,
    }
  }
  catch (error) {
    console.error('查询出错:', error)
    ElMessage.error('获取数据失败')
    return {
      data: [],
      total: 0,
    }
  }
  finally {
    loading.value = false
  }
}

// 编辑用户
function handleEdit(row:any) {
  userForm.id = row.id
  userForm.username = row.username
  userForm.email = row.email
  userForm.role = row.role
  userForm.status = row.status
  dialogVisible.value = true
}

// 删除用户
function handleDelete(row:any) {
  ElMessageBox.confirm(
    `确定要删除用户 ${row.username} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  ).then(() => {
    // 这里应该是实际的删除API调用
    ElMessage.success(`已删除用户: ${row.username}`)
    // 重新加载数据
    filterTableRef.value.reload()
  }).catch(() => {
    // 取消删除
  })
}

// 保存用户
function saveUser() {
  // 这里应该是实际的保存API调用
  console.log('保存用户:', userForm)
  ElMessage.success('保存成功')
  dialogVisible.value = false
  // 重新加载数据
  filterTableRef.value.reload()
}

// 格式化日期
function formatDate(date) {
  if (!date)
    return ''
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}
</script>

<template>
  <div class="user-management">
    <h1>用户管理</h1>
    <FilterTable
      ref="filterTableRef"
      :filter-items="filterItems"
      :columns="columns"
      :data="tableData"
      :total="total"
      :loading="loading"
      :table-props="tableProps"
      :table-events="tableEvents"
      selection
      @query="handleQuery"
    >
      <!-- 自定义列插槽 -->
      <template #status="{ row }">
        <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
          {{ row.status === 'active' ? '活跃' : '禁用' }}
        </el-tag>
      </template>

      <!-- 操作列 -->
      <template #operation="{ row }">
        <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
      </template>

      <!-- 展开行内容 -->
      <template #expand="{ row }">
        <div class="expand-detail">
          <p><strong>详细信息：</strong></p>
          <p>创建时间：{{ formatDate(row.createdAt) }}</p>
          <p>最后登录：{{ formatDate(row.lastLogin) }}</p>
          <p>备注：{{ row.remark || '无' }}</p>
        </div>
      </template>
    </FilterTable>

    <!-- 编辑用户对话框 -->
    <el-dialog v-model="dialogVisible" title="编辑用户" width="500px">
      <el-form :model="userForm" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userForm.role">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="userForm.status"
            active-value="active"
            inactive-value="inactive"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
}

.expand-detail {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.expand-detail p {
  margin: 8px 0;
}
</style>
