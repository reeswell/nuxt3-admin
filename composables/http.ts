import { useUser } from './user'

interface HttpParams<U> {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  params?: U
  body?: U
  data?: U
  headers?: Record<string, string>
  rest?: Record<string, any>
}

interface UseHttpReturn {
  get: <T = any, U = any>(url: string, query?: T, headers?: Record<string, string>, rest?: Record<string, string>) => Promise<U>
  post: <T = any, U = any>(url: string, body?: T, headers?: Record<string, string>, rest?: Record<string, string>) => Promise<U>
  put: <T = any, U = any>(url: string, body?: T, headers?: Record<string, string>, rest?: Record<string, string>) => Promise<U>
  patch: <T = any, U = any>(url: string, body?: T, headers?: Record<string, string>, rest?: Record<string, string>) => Promise<U>
  delete: <T = any, U = any>(url: string, query?: T, headers?: Record<string, string>, rest?: Record<string, string>) => Promise<U>
  http: <T = any, U = any>(params: HttpParams<T>) => Promise<U>
}

type CombinedHttp = UseHttpReturn['http'] & Omit<UseHttpReturn, 'http'>

type ApiBaseUrl = 'VITE_APP_URL' | 'VITE_APP_BJ_API' | 'VITE_APP_URL_NEWS'

const { logout, getToken } = useUser()

export function getHeader() {
  const headers: any = {}
  const token = getToken()
  headers.Authorization = token ? `Bearer ${token}` : ''
  return headers
}

export function useHttp(apiBaseUrl: ApiBaseUrl): UseHttpReturn {
  const http = <T = any, U = any>(httpParams: HttpParams<T>) => {
    const { url, method = 'GET', params, body, data, headers = {}, rest = {} } = httpParams

    const _headers = getHeader()
    return $fetch<U>(url, {
      method,
      params,
      body: body || data,
      headers: {
        ...headers,
        ..._headers,
      },
      baseURL: import.meta.env[apiBaseUrl] as string,
      onRequest() {
        // 请求拦截器
        // 可以在这里添加 token、loading 等操作
      },
      onResponse({ response }) {
        const { _data } = response
        const noTips = rest?.noTips
        if (_data.message && !noTips && response.status.toString().startsWith('2')) {
          ElMessage.success(_data.message)
        }
        // 可以在这里处理响应数据，如错误处理、统一格式化等
        return _data
      },
      onResponseError({ response }) {
        // 如果401
        if (response.status === 401) {
          logout()

          // setTimeout(() => {
          //   // 跳转到登录页
          //   return navigateTo(createPrimaryDomainUrl('/login/', new URLSearchParams({ redirect: location.href })), {
          //     external: true,
          //   })
          // }, 2000)
        }
        if (response._data?.message) {
          // 提示错误信息
          ElMessage.error(response._data.message || '未知错误')
        }

        // 可以在这里处理错误，如全局错误提示等
        return Promise.reject(response)
      },
    })
  }

  return {
    get: <T = any, U = any>(url: string, params?: T, headers?: Record<string, string>, rest?: Record<string, string>) =>
      http<T, U>({ url, method: 'GET', params, headers, rest }),
    post: <T = any, U = any>(url: string, body?: T, headers?: Record<string, string>, rest?: Record<string, string>) =>
      http<T, U>({ url, method: 'POST', body, headers, rest }),
    put: <T = any, U = any>(url: string, body?: T, headers?: Record<string, string>, rest?: Record<string, string>) =>
      http<T, U>({ url, method: 'PUT', body, headers, rest }),
    patch: <T = any, U = any>(url: string, body?: T, headers?: Record<string, string>, rest?: Record<string, string>) =>
      http<T, U>({ url, method: 'PATCH', body, headers, rest }),
    delete: <T = any, U = any>(url: string, body?: T, headers?: Record<string, string>, rest?: Record<string, string>) =>
      http<T, U>({ url, method: 'DELETE', body, headers, rest }),
    http,
  }
}

function createHttpInstance(apiBaseUrl: ApiBaseUrl): CombinedHttp {
  const httpInstance = useHttp(apiBaseUrl)
  const combined = httpInstance.http as CombinedHttp
  combined.get = httpInstance.get
  combined.post = httpInstance.post
  combined.put = httpInstance.put
  combined.delete = httpInstance.delete
  combined.patch = httpInstance.patch
  return combined
}

export const useDemoHttp = createHttpInstance('VITE_APP_URL')
