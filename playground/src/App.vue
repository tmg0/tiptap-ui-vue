<script setup lang="ts">
import { EditorContent } from '@tiptap/vue-3'
import { EditorContextProvider } from 'tiptap-ui-vue'
import TiptapHeadingDropdownMenu from './components/tiptap/HeadingDropdownMenu.vue'
import { useTiptap } from './composables/useTiptap'

const { editor } = useTiptap()
</script>

<template>
  <EditorContextProvider :editor="editor">
    <TiptapHeadingDropdownMenu />

    <EditorContent :editor="editor" />
  </EditorContextProvider>
</template>
