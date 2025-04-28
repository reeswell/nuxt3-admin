<script setup lang="ts">
const emit = defineEmits(['close'])

interface ShortcutDef {
  keys: string[]
  isSequence: boolean
}

interface ShortcutItem {
  description: string
  shortcut: ShortcutDef
}

interface ShortcutItemGroup {
  name: string
  items: ShortcutItem[]
}

const isMac = useIsMac()
const modifierKeyName = computed(() => isMac.value ? '⌘' : 'Ctrl')

const shortcutItemGroups = computed<ShortcutItemGroup[]>(() => [

  {
    name: 'title',
    items: [
      {
        description: 'search',
        shortcut: { keys: [modifierKeyName.value, 'k'], isSequence: false },
      },
      {
        description: 'command_mode',
        shortcut: { keys: [modifierKeyName.value, '/'], isSequence: false },
      },
    ],
  },
  {
    name: 'title',
    items: [],
  },
])
</script>

<template>
  <div class="px-3 sm:px-5 py-2 sm:py-4 max-w-220 relative max-h-screen">
    <button
      class="btn-action-icon absolute top-1 sm:top-2 right-1 sm:right-2 m1" aria-label="aria_label_close"
      @click="emit('close')"
    >
      <div i-ri:close-fill />
    </button>
    <h2 class="text-xl font-700 mb3">
      dialog_header
    </h2>
    <div class="mb2 grid grid-cols-1 md:grid-cols-3 gap-y- md:gap-x-6 lg:gap-x-8">
      <div v-for="group in shortcutItemGroups" :key="group.name">
        <h3 class="font-700 my-2 text-lg">
          {{ group.name }}
        </h3>
        <div
          v-for="item in group.items" :key="item.description"
          class="flex my-1 lg:my-2 justify-between place-items-center max-w-full text-base"
        >
          <div class="mr-2 break-words overflow-hidden leading-4 h-full inline-block align-middle">
            {{ item.description }}
          </div>
          <div>
            <template v-for="(key, idx) in item.shortcut.keys" :key="idx">
              <span v-if="idx !== 0" class="mx1 text-sm opacity-80">{{ item.shortcut.isSequence ? 'sequence_then' : '+'
              }}</span>
              <code
                class="px2 px md:px1.5 lg:px2 lg:px2 py0 lg:py-0.5 rounded bg-code shadow-sm my1 font-mono font-600 $c-border-code"
              >{{ key }}</code>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
