<script setup lang="ts">
import { useEditorContext } from '../../composables/useEditorContext'

type HistoryAction = 'undo' | 'redo'

interface Props {
  as?: keyof HTMLElementTagNameMap
  disabled?: boolean
  action: HistoryAction
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
    handleAction()
  }
}

function handleAction() {
  if (!editor || props.disabled)
    return
  executeHistoryAction()
}

function executeHistoryAction() {
  if (!editor)
    return false
  const chain = editor.chain().focus()
  return props.action === 'undo' ? chain.undo().run() : chain.redo().run()
}

function isHistoryActionDisabled() {
  if (props.disabled)
    return true
  return !canExecuteHistoryAction()
}

function canExecuteHistoryAction() {
  if (!editor)
    return false
  return props.action === 'undo' ? editor.can().undo() : editor.can().redo()
}
</script>

<template>
  <Component :is="as" @click="handleClick">
    <slot :is-history-action-disabled="isHistoryActionDisabled" />
  </Component>
</template>
