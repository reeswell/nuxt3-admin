import { until } from '@vueuse/core'
import { ref } from 'vue'
import type { ConfirmDialogChoice, ConfirmDialogOptions } from '~/types'

export const themeDialog = ref<boolean>(false)

export const confirmDialogChoice = ref<ConfirmDialogChoice>()
export const confirmDialogLabel = ref<ConfirmDialogOptions>()
export const isConfirmDialogOpen = ref(false)

export const commandPanelInput = ref('')
export const isCommandPanelOpen = ref(false)
export const isKeyboardShortcutsDialogOpen = ref(false)

export function openThemeDialog() {
  themeDialog.value = true
}
export function closeThemeDialog() {
  themeDialog.value = false
}

export async function openConfirmDialog(label: ConfirmDialogOptions | string): Promise<ConfirmDialogChoice> {
  confirmDialogLabel.value = typeof label === 'string' ? { title: label } : label
  confirmDialogChoice.value = undefined
  isConfirmDialogOpen.value = true

  await until(isConfirmDialogOpen).toBe(false)

  return confirmDialogChoice.value!
}

export function openCommandPanel(isCommandMode = false) {
  commandPanelInput.value = isCommandMode ? '> ' : ''
  isCommandPanelOpen.value = true
}

export function closeCommandPanel() {
  isCommandPanelOpen.value = false
}

export function toggleKeyboardShortcuts() {
  isKeyboardShortcutsDialogOpen.value = !isKeyboardShortcutsDialogOpen.value
}

export function closeKeyboardShortcuts() {
  isKeyboardShortcutsDialogOpen.value = false
}
