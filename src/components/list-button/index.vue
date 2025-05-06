<script setup lang="ts">
import { useEditorContext } from '../../composables/useEditorContext'

type ListType = 'bulletList' | 'orderedList' | 'taskList'

interface Props {
  as?: keyof HTMLElementTagNameMap
  type: ListType
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

  if (!e.defaultPrevented && editor) {
    toggleList()
  }
}

function toggleList() {
  if (!editor)
    return

  switch (props.type) {
    case 'bulletList':
      editor.chain().focus().toggleBulletList().run()
      break
    case 'orderedList':
      editor.chain().focus().toggleOrderedList().run()
      break
    case 'taskList':
      editor.chain().focus().toggleTaskList().run()
      break
  }
}

function isListActive(): boolean {
  if (!editor)
    return false

  switch (props.type) {
    case 'bulletList':
      return editor.isActive('bulletList')
    case 'orderedList':
      return editor.isActive('orderedList')
    case 'taskList':
      return editor.isActive('taskList')
    default:
      return false
  }
}
</script>

<template>
  <Component :is="as" @click="handleClick">
    <slot :is-list-active="isListActive" />
  </Component>
</template>
