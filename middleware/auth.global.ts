import type { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware((to) => {
  return handleAuth(to)
})

async function handleAuth(to: RouteLocationNormalized) {
  const whiteList = ['/login', '/404', '/401']
  const isLogin = checkLogin() // 检查是否存在 token
  const user = currentUser.value
  // 如果用户未登录且试图访问非白名单页面，重定向到登录页面
  if (!isLogin && !whiteList.includes(to.path)) {
    return navigateTo(`/login?redirect=${to.path}`)
  }
  // 如果用户已登录且试图访问登录页面，重定向到主页
  if (isLogin) {
    if (user && to.path === '/login') {
      return navigateTo('/')
    }
  }
  else {
    navigateTo('/login')
  }
}
