import { useCookie } from 'nuxt/app'
import { TOKEN_KEY } from '~/config/const'
import type { LoginForm, User } from '~/types/user'

export interface LoginResponse {
  access_token: string
  refresh_token: string
  expires_in: number
}



/**
 * 模拟获取用户信息 API 请求
 * @returns 用户信息
 */
export async function fetchUserInfo(): Promise<User> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  const token = useCookie(TOKEN_KEY).value
  if (!token) {
    throw new Error('未授权，请先登录')
  }
  // 根据 token 中的信息模拟不同用户
  if (token.includes('admin')) {
    return {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      roles: ['admin'],
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      permissions: ['read', 'write', 'delete', 'admin'],
      status: 'active',
      lastLogin: new Date().toISOString(),
      createdAt: '2023-01-01T00:00:00Z',
    }
  }
  else {
    return {
      id: 2,
      username: 'user',
      email: 'user@example.com',
      roles: ['user'],
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      permissions: ['read', 'write'],
      status: 'active',
      lastLogin: new Date().toISOString(),
      createdAt: '2023-03-15T00:00:00Z',
    }
  }
}
/**
 * 模拟登录 API 请求
 * @param user 登录表单数据
 * @returns 登录响应结果
 */
export async function login(user: LoginForm): Promise<LoginResponse> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800))

  // 模拟验证逻辑
  if (user.username === 'admin' && user.password === 'admin123') {
    return {
      access_token: `mock_token_${Date.now()}`,
      refresh_token: `mock_refresh_${Date.now()}`,
      expires_in: 3600,
    }
  }
  else if (user.username === 'user' && user.password === 'user123') {
    return {
      access_token: `mock_token_${Date.now()}`,
      refresh_token: `mock_refresh_${Date.now()}`,
      expires_in: 3600,
    }
  }
  else {
    // 模拟登录失败
    throw new Error('用户名或密码错误')
  }
}


export const currentUser = ref<User | null>(null)
export const isLogin = ref(false)


export const useUser = () => {
  // 使用 ref 存储用户状态

  // 获取 token
  const getToken = () => useCookie(TOKEN_KEY).value

  // 设置 token
  const setToken = (token: string) => {
    const tokenCookie = useCookie(TOKEN_KEY, {
      maxAge: 60 * 60 * 24 * 7, // 7天过期
      path: '/',
    })
    tokenCookie.value = token
  }

  // 清除 token
  const clearToken = () => {
    const tokenCookie = useCookie(TOKEN_KEY)
    tokenCookie.value = null
  }
  // 获取用户信息
  const getUserInfo = async () => {
    const token = getToken()
    if (!token) {
      currentUser.value = null
      isLogin.value = false
      return null
    }

    try {
      if (currentUser.value) {
        return currentUser.value
      }
      const userInfo = await fetchUserInfo()
      currentUser.value = userInfo
      isLogin.value = true
      return userInfo
    } catch (error) {
      clearToken()
      currentUser.value = null
      isLogin.value = false
      return null
    }
  }

  // 登录
  const loginTo = async (form: LoginForm) => {
    try {
      const { access_token } = await login(form)
      setToken(access_token)
      const userInfo = await getUserInfo()
      return userInfo
    } catch (error) {
      clearToken()
      currentUser.value = null
      isLogin.value = false
      throw error
    }
  }



  // 登出
  const logout = () => {
    clearToken()
    currentUser.value = null
    isLogin.value = false
    navigateTo('/login')
  }

  return {
    currentUser,
    loginTo,
    getUserInfo,
    logout,
    getToken
  }
}
