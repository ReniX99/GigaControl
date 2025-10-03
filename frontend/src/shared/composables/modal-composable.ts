import { shallowRef } from 'vue'

export function useModal() {
  const isOpen = shallowRef<boolean>(false)

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, open, close }
}
