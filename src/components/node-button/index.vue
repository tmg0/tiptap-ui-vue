<script setup lang="ts">
import { useEditorContext } from '../../composables/useEditorContext'

type NodeType = 'codeBlock' | 'blockquote'

interface Props {
  as?: keyof HTMLElementTagNameMap
  type: NodeType
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
    handleToggle()
  }
}

function handleToggle() {
  if (!props.disabled && editor)
    return toggleNode()
  return false
}

function toggleNode(): boolean {
  if (!editor)
    return false

  if (props.type === 'codeBlock')
    return editor.chain().focus().toggleNode('codeBlock', 'paragraph').run()
  else
    return editor.chain().focus().toggleWrap('blockquote').run()
}

function isNodeActive(): boolean {
  if (!editor)
    return false
  return editor.isActive(props.type)
}
</script>

<template>
  <Component :is="as" @click="handleClick">
    <slot :is-node-active="isNodeActive" />
  </Component>
</template>
