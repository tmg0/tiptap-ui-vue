<script setup lang="ts">
import { useEditorContext } from '../../composables/useEditorContext'

type Level = 1 | 2 | 3 | 4 | 5 | 6

interface Props {
  as?: keyof HTMLElementTagNameMap
  level?: Level
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  level: 1,
  disabled: false,
})

const emit = defineEmits(['click'])
const editor = useEditorContext()

function handleClick(e: MouseEvent) {
  emit('click', e)

  if (!e.defaultPrevented && !props.disabled && editor) {
    toggleHeading(props.level)
  }
}

function toggleHeading(level: Level): void {
  if (!editor)
    return

  if (editor.isActive('heading', { level })) {
    editor.chain().focus().setNode('paragraph').run()
  }
  else {
    editor.chain().focus().toggleNode('heading', 'paragraph', { level }).run()
  }
}

function isHeadingActive() {
  if (!editor)
    return false
  return editor.isActive?.('heading', { level: props.level })
}

function isHeadingButtonDisabled() {
  if (!editor)
    return true
  if (props.disabled)
    return true
  if (!canToggleHeading())
    return true
  return false
}

function canToggleHeading() {
  if (!editor)
    return false

  try {
    return editor.can().toggleNode('heading', 'paragraph', { level: props.level })
  }
  catch {
    return false
  }
}
</script>

<template>
  <Component :is="as" @click="handleClick">
    <slot :is-heading-active="isHeadingActive" :is-heading-button-disabled="isHeadingButtonDisabled" />
  </Component>
</template>
