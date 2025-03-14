<script setup lang="ts">
import { useAppConfig } from 'nuxt/app'

const { time } = useAppConfig().buildInfo
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${month}-${day} ${hours}:${minutes}`
}
</script>

<template>
  <div class="text-primary flex justify-center items-center gap-3">
    <p>版本更新: <span class="ml-1">{{ formatTimestamp(time) }}</span></p>
  </div>
</template>
