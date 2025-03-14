export interface LoginForm {
  username: string
  password: string
}

export interface User {
  username: string
  token: string
  roles: string[]
  group: string[]
  usd_rate: number
  show_rate: boolean
}
