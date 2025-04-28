import type { ActiveHeadEntry, UseHeadInput, UseHeadOptions } from '@unhead/vue'
import type { SchemaAugmentations } from '@unhead/schema'
import { toValue } from '@vueuse/core'
import { onActivated, onDeactivated, ref } from 'vue'

export function useAppHead<T extends SchemaAugmentations>(input: UseHeadInput<T>, options?: UseHeadOptions): ActiveHeadEntry<UseHeadInput<T>> | void {
  if (input && typeof input === 'object' && !('value' in input)) {
    const title = 'title' in input ? input.title : undefined
    if (title) {
      input.meta = input.meta || []
      if (Array.isArray(input.meta)) {
        input.meta.push(
          { property: 'og:title', content: (typeof input.title === 'function' ? input.title() : input.title) as string },
        )
      }
      (input as any).title = () => typeof title === 'function' ? title() : title
    }
  }
  return useHead(toValue(input), options)
}

/**
 * ### Whether the current component is running in the background
 *
 * for handling problems caused by the keepalive function
 */
export function useDeactivated() {
  const deactivated = ref(false)
  onActivated(() => deactivated.value = false)
  onDeactivated(() => deactivated.value = true)

  return deactivated
}
