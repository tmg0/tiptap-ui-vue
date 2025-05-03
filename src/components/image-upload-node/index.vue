<script setup lang="ts">
import type { NodeViewProps } from '@tiptap/vue-3'
import { NodeViewWrapper } from '@tiptap/vue-3'
import { useDropZone, useFileDialog } from '@vueuse/core'
import { ref } from 'vue'

interface Props extends NodeViewProps {
  as?: keyof HTMLElementTagNameMap
  accept?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  accept: 'image/*',
})

const domRef = ref()
const src = ref('')

useDropZone(domRef, {
  onDrop: handleUpload,
  dataTypes: [props.accept],
  multiple: false,
  preventDefaultForUnhandled: false,
})

const { open, onChange } = useFileDialog({
  accept: props.accept,
  multiple: false,
  directory: false,
})

onChange(handleUpload)

async function handleUpload(files: File[] | FileList | null) {
  if (!files?.length)
    return
  src.value = await props.extension.options.upload(files)
}
</script>

<template>
  <NodeViewWrapper ref="domRef" :as="as" @click="open">
    <slot :src="src" />
  </NodeViewWrapper>
</template>
