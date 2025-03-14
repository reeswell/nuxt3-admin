<script setup lang="ts">
import { loginTo } from '~/composables/user'

definePageMeta({
  layout: 'none',
})
const form = ref({
  username: 'admin',
  password: 'admin123',
})
const route = useRoute()

async function handleSubmit() {
  if (!form.value.username || !form.value.password) {
    ElMessage.error('请输入用户名和密码')
    return
  }
  await loginTo(form.value)
  if (route.query.redirect) {
    navigateTo(route.query.redirect as string)
  }
  else {
    navigateTo('/')
  }
}
</script>

<template>
  <div class="bg-gray-100 flex justify-center items-center h-screen">
    <div class="w-1/2 h-screen hidden lg:block">
      <img src="https://placehold.co/800x/667fff/ffffff.png?text=nuxt3-admin+Image&font=Montserrat"
        alt="Placeholder Image" class="object-cover w-full h-full">
    </div>
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 class="text-2xl font-semibold mb-4">登录</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="username" class="block text-gray-600">用户名</label>
          <input id="username" v-model="form.username" type="text" name="username"
            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-primary"
            autocomplete="off">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-600">密码</label>
          <input id="password" v-model="form.password" type="password" name="password"
            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-primary"
            autocomplete="off">
        </div>
        <div class="mb-4 flex items-center">
          <input id="remember" type="checkbox" name="remember" class="text-primary">
          <label for="remember" class="text-gray-600 ml-2">记住我</label>
        </div>
        <button type="submit" class="bg-primary btn-solid text-white font-semibold rounded-md py-2 px-4 w-full">
          登录
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
