<script setup lang="ts">
import { useEditorContext } from '../../composables/useEditorContext'

type Mark =
  | 'bold'
  | 'italic'
  | 'strike'
  | 'code'
  | 'underline'
  | 'superscript'
  | 'subscript'

interface Props {
  as?: keyof HTMLElementTagNameMap
  type: Mark
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

  if (!e.defaultPrevented && !props.disabled && editor) {
    toggleMark()
  }
}

function toggleMark(): void {
  if (!editor)
    return
  editor.chain().focus().toggleMark(props.type).run()
}

function canToggleMark(): boolean {
  if (!editor)
    return false

  try {
    return editor.can().toggleMark(props.type)
  }
  catch {
    return false
  }
}

function isMarkButtonDisabled(): boolean {
  if (!editor)
    return true
  if (props.disabled)
    return true
  if (editor.isActive('codeBlock'))
    return true
  if (!canToggleMark())
    return true
  return false
}

function isMarkActive(): boolean {
  if (!editor)
    return false
  return editor.isActive(props.type)
}
</script>

<template>
  <Component :is="as" @click="handleClick">
    <slot :is-mark-button-disabled="isMarkButtonDisabled" :is-mark-active="isMarkActive" />
  </Component>
</template>
