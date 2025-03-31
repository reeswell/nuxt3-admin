import { useDemoHttp } from '~/composables/http'

export const getUserInfo = params => useDemoHttp.get(`/user/info/`, params)

export const login = data => useDemoHttp.post(`/login/`, data)
