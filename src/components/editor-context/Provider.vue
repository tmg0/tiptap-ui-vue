<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { useProvideEditorContext } from '../../composables/useEditorContext'

const props = defineProps<{
  editor: Editor
}>()

useProvideEditorContext(props.editor)
</script>

<template>
  <slot :editor="editor" />
</template>
