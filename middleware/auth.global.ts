import type { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware((to) => {
  return handleAuth(to)
})

async function handleAuth(to: RouteLocationNormalized) {
  const {  getUserInfo } = useUser()
  const whiteList = ['/login', '/404', '/401']

  // 获取最新的用户信息
  const user = await getUserInfo()

  // 检查是否登录
  const isLogin = !!user

  // 如果用户未登录且试图访问非白名单页面，重定向到登录页面
  if (!isLogin && !whiteList.includes(to.path)) {
    return navigateTo(`/login?redirect=${to.path}`)
  }

  // 如果用户已登录且试图访问登录页面，重定向到主页
  if (isLogin && to.path === '/login') {
    return navigateTo('/')
  }
}
