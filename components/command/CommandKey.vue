<script setup lang="ts">
import { useIsMac } from '~/composables/misc';

const { name } = defineProps<{
  name: string
}>()

const isMac = useIsMac()

const keys = computed(() => name.toLowerCase().split('+'))
</script>

<template>
  <div class="flex items-center px-1">
    <template v-for="(key, index) in keys" :key="key">
      <div v-if="index > 0" class="inline-block px-.5">
        +
      </div>
      <div class="p-1 grid place-items-center rounded-lg shadow-sm xs secondary border-base border">
        <div v-if="key === 'enter'">
          <svg-icon name="keyboard-return-rounded" class="w-4 h-4" />
        </div>
        <div v-else-if=" key === 'meta' && isMac">
          <svg-icon name="command-key" class="w-4 h-4" />
        </div>

        <div v-else-if="key === 'meta' && !isMac">
          <svg-icon name="window-sharp" class="w-4 h-4" />
        </div>
        <div v-else-if="key === 'alt' && isMac">
          <svg-icon name="keyboard-option-key-rounded" class="w-4 h-4" />
        </div>
        <div v-else-if="key === 'arrowup'">
          <svg-icon name="arrow-up-line" class="w-4 h-4" />
        </div>
        <div v-else-if="key === 'arrowdown'">
          <svg-icon name="arrow-down-line" class="w-4 h-4" />
        </div>
        <div v-else-if="key === 'arrowleft'">
          <svg-icon name="arrow-left-line" class="w-4 h-4" />
        </div>
        <div v-else-if="key === 'arrowright'">
          <svg-icon name="arrow-right-line" class="w-4 h-4" />
        </div>
        <template v-else-if="key === 'escape'">
          ESC
        </template>
        <div v-else :class="{ 'px-[0.5]': key.length === 1 }">
          {{ key[0].toUpperCase() + key.slice(1) }}
        </div>
      </div>
    </template>
  </div>
</template>
