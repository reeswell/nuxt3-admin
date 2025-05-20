<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import ModalConfirm from './ModalConfirm.vue'
import ModalDialog from './ModalDialog.vue'
import type { ConfirmDialogChoice } from '~/types'
import CommandPanel from '~/components/command/CommandPanel.vue'
import MagickeysKeyboardShortcuts from '~/components/magickeys/MagickeysKeyboardShortcuts.vue'
import ThemeSwitcher from '~/components/settings/ThemeSwitcher.vue'
import { closeCommandPanel, closeKeyboardShortcuts, isCommandPanelOpen, isConfirmDialogOpen, isKeyboardShortcutsDialogOpen, openCommandPanel, themeDialog } from '~/composables/dialog'

const isMac = useIsMac()

// TODO: temporary, await for keybind system
// open search panel
// listen to ctrl+k on windows/linux or cmd+k on mac
// open command panel
// listen to ctrl+/ on windows/linux or cmd+/ on mac
// or shift+ctrl+k on windows/linux or shift+cmd+k on mac
useEventListener('keydown', (e: KeyboardEvent) => {
  if ((e.key === 'k' || e.key === 'л') && (isMac.value ? e.metaKey : e.ctrlKey)) {
    e.preventDefault()
    openCommandPanel(e.shiftKey)
  }
  if ((e.key === '/' || e.key === ',') && (isMac.value ? e.metaKey : e.ctrlKey)) {
    e.preventDefault()
    openCommandPanel(true)
  }
})

function handleConfirmChoice(choice: ConfirmDialogChoice) {
  confirmDialogChoice.value = choice
  isConfirmDialogOpen.value = false
}
</script>

<template>
  <ModalDialog v-model="isConfirmDialogOpen" class="py-[22px] px-[18px]   bg-background">
    <ModalConfirm v-if="confirmDialogLabel" v-bind="confirmDialogLabel" @choice="handleConfirmChoice" />
  </ModalDialog>
  <ModalDialog v-model="isCommandPanelOpen" class="max-w-[fit-content] flex ">
    <CommandPanel @close="closeCommandPanel()" />
  </ModalDialog>
  <ModalDialog
    v-model="isKeyboardShortcutsDialogOpen"
    class="max-w-full sm:max-w-140 md:max-w-170 lg:max-w-220 md:min-w-160"
  >
    <MagickeysKeyboardShortcuts @close="closeKeyboardShortcuts()" />
  </ModalDialog>
  <ThemeSwitcher v-model="themeDialog" />
</template>

<style>

</style>
