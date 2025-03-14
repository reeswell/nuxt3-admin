import { useCookie } from 'nuxt/app'
import { ElMessage } from 'element-plus'
import { TOKEN_KEY } from '~/config/const'
import type { LoginForm, User } from '~/types/user'
export interface LoginResponse {
  access_token: string
  refresh_token: string
  expires_in: number
}

export const currentUser = ref<User>()

export function checkLogin(message = '') {
  const token = getToken()
  const isLoggedIn = !!token && !!currentUser.value

  if (!isLoggedIn && message) {
    ElMessage.warning(message)
  }

  return isLoggedIn
}

export function getToken() {
  const token = useCookie(TOKEN_KEY).value
  return token
}
export function setToken(token: string) {
  useCookie(TOKEN_KEY).value = token
}

export function clearToken() {
  useCookie(TOKEN_KEY).value = ''
}



/**
 * 模拟获取用户信息 API 请求
 * @returns 用户信息
 */
export async function fetchUserInfo(): Promise<User> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  const token = getToken()
  if (!token) {
    throw new Error('未授权，请先登录')
  }

  // 根据 token 中的信息模拟不同用户
  if (token.includes('admin')) {
    return {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      permissions: ['read', 'write', 'delete', 'admin'],
      status: 'active',
      lastLogin: new Date().toISOString(),
      createdAt: '2023-01-01T00:00:00Z'
    }
  } else {
    return {
      id: 2,
      username: 'user',
      email: 'user@example.com',
      role: 'user',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      permissions: ['read', 'write'],
      status: 'active',
      lastLogin: new Date().toISOString(),
      createdAt: '2023-03-15T00:00:00Z'
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
      expires_in: 3600
    }
  } else if (user.username === 'user' && user.password === 'user123') {
    return {
      access_token: `mock_token_${Date.now()}`,
      refresh_token: `mock_refresh_${Date.now()}`,
      expires_in: 3600
    }
  } else {
    // 模拟登录失败
    throw new Error('用户名或密码错误')
  }
}
/**
 * 登录并获取用户信息
 * @param user 登录表单数据
 * @returns 用户信息
 */
export async function loginTo(user: LoginForm): Promise<User | null> {
  try {
    // 调用登录接口
    const { access_token } = await login(user)

    // 保存 token
    setToken(access_token)

    // 获取用户信息
    const userInfo = await fetchUserInfo()

    // 保存当前用户信息
    currentUser.value = userInfo

    return currentUser.value
  } catch (error) {
    // 处理登录失败
    clearToken()
    currentUser.value = null

    if (error instanceof Error) {
      ElMessage.error(error.message)
    } else {
      ElMessage.error('登录失败，请重试')
    }

    return null
  }
}

/**
 * 获取当前用户信息
 * @returns 用户信息
 */
export async function getUserInfo(): Promise<User | null> {
  if (!checkLogin('请先登录')) {
    return null
  }

  try {
    // 如果已有用户信息，直接返回
    if (currentUser.value) {
      return currentUser.value
    }

    // 否则重新获取用户信息
    const userInfo = await fetchUserInfo()
    currentUser.value = userInfo
    return currentUser.value
  } catch (error) {
    // 处理获取用户信息失败
    clearToken()
    currentUser.value = null

    if (error instanceof Error) {
      ElMessage.error(error.message)
    } else {
      ElMessage.error('获取用户信息失败')
    }

    return null
  }
}

export async function clearCache() {
  clearToken()
  currentUser.value = null
}

export async function signout() {
  clearToken()
  currentUser.value = null
  navigateTo('/login')
}


/**
 * 退出登录
 */
export function logout(): void {
  clearToken()
  currentUser.value = null
  ElMessage.success('已退出登录')
}
