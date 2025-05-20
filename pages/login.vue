<script setup lang="ts">
import { Hide, View } from '@element-plus/icons-vue'
import { useUser } from '~/composables/user'

definePageMeta({
  layout: 'none',
})

const form = ref({
  username: 'admin',
  password: 'admin123',
})

const isLoading = ref(false)
const showPassword = ref(false)
const route = useRoute()
const { loginTo } = useUser()
async function handleSubmit() {
  if (!form.value.username || !form.value.password) {
    ElMessage.error('请输入用户名和密码')
    return
  }
  isLoading.value = true
  try {
    await loginTo(form.value)
  }
  finally {
    isLoading.value = false
  }
  if (route.query.redirect) {
    navigateTo(route.query.redirect as string)
  }
  else {
    navigateTo('/')
  }
}

// 切换密码显示/隐藏
function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="bg-gray-100 flex justify-center items-center h-screen">
    <div class="w-1/2 h-screen hidden lg:block">
      <img
        src="https://placehold.co/800x/667fff/ffffff.png?text=nuxt3-admin+Image&font=Montserrat"
        alt="Placeholder Image" class="object-cover w-full h-full"
      >
    </div>
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 class="text-2xl font-semibold mb-4">登录</h1>
      <form @submit.prevent="handleSubmit">
        <!-- 用户名输入框 -->
        <div class="mb-4">
          <label for="username" class="block text-gray-600">用户名</label>
          <input
            id="username" v-model="form.username" type="text" name="username"
            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-primary"
            autocomplete="off"
          >
        </div>

        <!-- 密码输入框 -->
        <div class="mb-4">
          <label for="password" class="block text-gray-600">密码</label>
          <div class="relative">
            <input
              id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" name="password"
              class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-primary pr-10"
              autocomplete="off"
            >
            <!-- 密码显示/隐藏图标 -->
            <div
              class="absolute right-3 top-[11px] transform  cursor-pointer text-gray-500 hover:text-gray-700"
              @click="togglePassword"
            >
              <el-icon v-if="showPassword">
                <View />
              </el-icon>
              <el-icon v-else>
                <Hide />
              </el-icon>
            </div>
          </div>
        </div>

        <!-- 记住我选项 -->
        <div class="mb-4 flex items-center">
          <input id="remember" type="checkbox" name="remember" class="text-primary">
          <label for="remember" class="text-gray-600 ml-2">记住我</label>
        </div>

        <!-- 登录按钮 -->
        <el-button :loading="isLoading" type="primary" style="width: 100%;height: 35px;" @click="handleSubmit">
          登录
        </el-button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.el-icon {
  font-size: 1.2em;
}
</style>
