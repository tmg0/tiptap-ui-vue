<script setup lang="ts">
import { useEditorContext } from '../../composables/useEditorContext'

interface Props {
  as?: keyof HTMLElementTagNameMap
  extensionName?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  extensionName: 'imageUpload',
  disabled: false,
})

const emit = defineEmits(['click'])
const editor = useEditorContext()

function handleClick(e: MouseEvent) {
  emit('click', e)

  if (!e.defaultPrevented && !props.disabled) {
    handleInsertImage()
  }
}

function handleInsertImage() {
  if (props.disabled)
    return false
  return insertImage()
}

function isImageActive(): boolean {
  if (!editor)
    return false
  return editor.isActive(props.extensionName)
}

function insertImage(): boolean {
  if (!editor)
    return false

  return editor
    .chain()
    .focus()
    .insertContent({
      type: props.extensionName,
    })
    .run()
}
</script>

<template>
  <Component :is="as" @click="handleClick">
    <slot :is-image-active="isImageActive" />
  </Component>
</template>
