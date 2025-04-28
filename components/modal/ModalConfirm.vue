<script setup lang="ts">
import type { ConfirmDialogChoice, ConfirmDialogOptions } from '~/types'

const { title, description, confirm, cancel, svgName = 'warning' } = defineProps<ConfirmDialogOptions>()

const emit = defineEmits<{
  (evt: 'choice', choice: ConfirmDialogChoice): void
}>()

function handleChoice(choice: ConfirmDialogChoice['choice']) {
  const dialogChoice = {
    choice,
  }
  emit('choice', dialogChoice)
}
</script>

<template>
  <div class="flex flex-col">
    <header class="text-center text-[16px] relative ">
      <h4 v-if="title">
        {{ title }}
      </h4>
      <button class="absolute focus:outline-none top-0 right-0 text-center cursor-pointer text-[16px] text-[#AAAAAA] hover:text-primary" @click="handleChoice('cancel')">
        <svg-icon name="close" class="w-4 h-4" />
      </button>
    </header>
    <div class="px-[22px] flex flex-col mt-2 gap-3">
      <div class="w-full flex justify-center items-center">
        <svg-icon :name="svgName" class="w-[38px] h-[38px] " />
      </div>
      <p v-if="description" class="text-center text-[14px] text-[#666666]">
        {{ description }}
      </p>

      <div class="flex justify-center items-center gap-[26px]">
        <button class="btn-outline w-[110px] h-[38px]" @click="handleChoice('cancel')">
          {{ cancel || '取消' }}
        </button>
        <button class="btn-solid w-[110px] h-[38px]" @click="handleChoice('confirm')">
          {{ confirm || '确定' }}
        </button>
      </div>
    </div>
  </div>
</template>
