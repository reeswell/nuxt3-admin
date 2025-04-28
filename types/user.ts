export interface LoginForm {
  username: string
  password: string
}



export interface User {
  id: number
  username: string
  email: string
  roles: string[]
  avatar: string
  permissions: string[]
  status: string
  lastLogin: string
  createdAt: string
}
