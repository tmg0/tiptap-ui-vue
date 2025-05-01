<script setup lang="ts">
import { Toggle } from '@/components/ui/toggle'
import { EditorContent } from '@tiptap/vue-3'
import { EditorContextProvider, HeadingButton } from 'tiptap-ui-vue'
import Bold from '~icons/heroicons/bold'
import { useTiptap } from './composables/useTiptap'

const { editor } = useTiptap()
</script>

<template>
  <EditorContextProvider :editor="editor">
    <HeadingButton>
      <template #default="{ isHeadingActive }">
        <Toggle size="sm" :model-value="isHeadingActive(1)" class="cursor-pointer">
          <Bold class="h-4 w-4" />
        </Toggle>
      </template>
    </HeadingButton>

    <EditorContent :editor="editor" />
  </EditorContextProvider>
</template>
