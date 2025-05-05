<script setup lang="ts">
import { useEditorContext } from '../../composables/useEditorContext'

interface Props {
  as?: keyof HTMLElementTagNameMap
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  as: 'div',
  disabled: false,
})

const emit = defineEmits(['click'])
const editor = useEditorContext()

function handleClick(e: MouseEvent) {
  emit('click', e)
}

function isLinkActive() {
  if (!editor)
    return false
  return editor.isActive('link')
}

function setLink(href: string) {
  if (!editor)
    return
  editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href })
    .run()
}
</script>

<template>
  <Component :is="as" @click="handleClick">
    <slot :is-link-active="isLinkActive" :set-link="setLink" />
  </Component>
</template>
