<script setup lang="ts">
import { useEditorContext } from '../../composables/useEditorContext'

type TextAlign = 'left' | 'center' | 'right' | 'justify'

interface Props {
  as?: keyof HTMLElementTagNameMap
  align: TextAlign
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  disabled: false,
})

const emit = defineEmits(['click'])
const editor = useEditorContext()

function handleClick(e: MouseEvent) {
  emit('click', e)

  if (!e.defaultPrevented && !props.disabled) {
    handleAlignment()
  }
}

function handleAlignment() {
  if (!editor || props.disabled)
    return false
  return setTextAlign()
}

function setTextAlign(): boolean {
  if (!editor)
    return false

  const chain: any = editor.chain().focus()
  return chain.setTextAlign(props.align).run()
}

function isTextAlignActive(): boolean {
  if (!editor)
    return false
  return editor.isActive({ textAlign: props.align })
}
</script>

<template>
  <Component :is="as" @click="handleClick">
    <slot :is-text-align-active="isTextAlignActive" />
  </Component>
</template>
