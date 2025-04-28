<script setup lang="ts">
import type { SearchResult } from '~/types'

defineProps<{
  result: SearchResult
  active: boolean
}>()

function onActivate() {
  (document.activeElement as HTMLElement).blur()
}
</script>

<template>
  <CommonScrollIntoView
    as="RouterLink" :active="active" :to="result.path" :aria-selected="active"
    :class="{ 'bg-active': active }" class="py-2 block px-2 hover:bg-active" @click="() => onActivate()"
  >
    <div>
      {{ result.name }}
    </div>
  </CommonScrollIntoView>
</template>
