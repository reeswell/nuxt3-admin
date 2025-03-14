export interface BuildInfo {
  version: string
  commit: string
  shortCommit: string
  time: number
  branch: string
  env: 'preview' | 'canary' | 'dev' | 'release'
}

export interface Frequently {
  message: string
  redirect: string
  needLogin: boolean
}

export interface ConfirmDialogOptions {
  title?: string
  description?: string
  confirm?: string
  cancel?: string
  svgName?: string
}

export interface ConfirmDialogChoice {
  choice: 'confirm' | 'cancel'
}

export interface UserInfo {
  user_id: number
  refresh: string
  token: string
  company_name: string
  username: string
  email: string
  level: number
  account_type: number
}

export interface OrderForm {
  partno: string
  matched_mfr: string
  num: string
  bom_id: number
  isAdd: boolean
  id?: number
}
