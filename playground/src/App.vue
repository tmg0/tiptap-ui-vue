<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { EditorContent } from '@tiptap/vue-3'
import { ImagePlus, Redo2, Undo2 } from 'lucide-vue-next'
import { EditorContextProvider, ImageUploadButton, UndoRedoButton } from 'tiptap-ui-vue'
import TiptapHeadingDropdownMenu from './components/tiptap/HeadingDropdownMenu.vue'
import TiptapListDropdownMenu from './components/tiptap/ListDropdownMenu.vue'
import { useTiptap } from './composables/useTiptap'

const { editor } = useTiptap()
</script>

<template>
  <EditorContextProvider :editor="editor">
    <div>
      <div class="flex gap-1 items-center justify-center shadow py-1 fixed top-0 w-full bg-white z-10">
        <UndoRedoButton action="undo">
          <template #default="{ isHistoryActionDisabled }">
            <Button variant="ghost" size="icon" :disabled="isHistoryActionDisabled()" class="w-8 h-8 cursor-pointer">
              <Undo2 />
            </Button>
          </template>
        </UndoRedoButton>

        <UndoRedoButton action="redo">
          <template #default="{ isHistoryActionDisabled }">
            <Button variant="ghost" size="icon" :disabled="isHistoryActionDisabled()" class="w-8 h-8 cursor-pointer">
              <Redo2 />
            </Button>
          </template>
        </UndoRedoButton>

        <div class="h-4">
          <Separator orientation="vertical" />
        </div>

        <TiptapHeadingDropdownMenu />
        <TiptapListDropdownMenu />

        <ImageUploadButton>
          <Button variant="ghost" size="icon" class="w-8 h-8 cursor-pointer">
            <ImagePlus />
          </Button>
        </ImageUploadButton>
      </div>

      <div class="mt-8">
        <EditorContent :editor="editor" class="w-xl mx-auto p-12" />
      </div>
    </div>
  </EditorContextProvider>
</template>
