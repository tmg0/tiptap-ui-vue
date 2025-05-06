<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Toggle } from '@/components/ui/toggle'
import { EditorContent } from '@tiptap/vue-3'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Code, FileCode2, ImagePlus, Italic, Redo2, Strikethrough, Subscript, Superscript, TextQuote, Underline, Undo2 } from 'lucide-vue-next'
import { EditorContextProvider, ImageUploadButton, MarkButton, NodeButton, TextAlignButton, UndoRedoButton } from 'tiptap-ui-vue'
import TiptapHeadingDropdownMenu from './components/tiptap/HeadingDropdownMenu.vue'
import TiptapLinkPopover from './components/tiptap/LinkPopover.vue'
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

        <NodeButton type="codeBlock">
          <template #default="{ isNodeActive }">
            <Toggle size="sm" :model-value="isNodeActive()" class="cursor-pointer">
              <FileCode2 />
            </Toggle>
          </template>
        </NodeButton>

        <NodeButton type="blockquote">
          <template #default="{ isNodeActive }">
            <Toggle size="sm" :model-value="isNodeActive()" class="cursor-pointer">
              <TextQuote />
            </Toggle>
          </template>
        </NodeButton>

        <div class="h-4">
          <Separator orientation="vertical" />
        </div>

        <MarkButton type="bold">
          <template #default="{ isMarkActive }">
            <Toggle size="sm" :model-value="isMarkActive()" class="cursor-pointer">
              <Bold />
            </Toggle>
          </template>
        </MarkButton>

        <MarkButton type="italic">
          <template #default="{ isMarkActive }">
            <Toggle size="sm" :model-value="isMarkActive()" class="cursor-pointer">
              <Italic />
            </Toggle>
          </template>
        </MarkButton>

        <MarkButton type="strike">
          <template #default="{ isMarkActive }">
            <Toggle size="sm" :model-value="isMarkActive()" class="cursor-pointer">
              <Strikethrough />
            </Toggle>
          </template>
        </MarkButton>

        <MarkButton type="code">
          <template #default="{ isMarkActive }">
            <Toggle size="sm" :model-value="isMarkActive()" class="cursor-pointer">
              <Code />
            </Toggle>
          </template>
        </MarkButton>

        <MarkButton type="underline">
          <template #default="{ isMarkActive }">
            <Toggle size="sm" :model-value="isMarkActive()" class="cursor-pointer">
              <Underline />
            </Toggle>
          </template>
        </MarkButton>

        <TiptapLinkPopover />

        <div class="h-4">
          <Separator orientation="vertical" />
        </div>

        <MarkButton type="superscript">
          <template #default="{ isMarkActive }">
            <Toggle size="sm" :model-value="isMarkActive()" class="cursor-pointer">
              <Superscript />
            </Toggle>
          </template>
        </MarkButton>

        <MarkButton type="subscript">
          <template #default="{ isMarkActive }">
            <Toggle size="sm" :model-value="isMarkActive()" class="cursor-pointer">
              <Subscript />
            </Toggle>
          </template>
        </MarkButton>

        <div class="h-4">
          <Separator orientation="vertical" />
        </div>

        <TextAlignButton align="left">
          <template #default="{ isTextAlignActive }">
            <Toggle size="sm" :model-value="isTextAlignActive()" class="cursor-pointer">
              <AlignLeft />
            </Toggle>
          </template>
        </TextAlignButton>

        <TextAlignButton align="center">
          <template #default="{ isTextAlignActive }">
            <Toggle size="sm" :model-value="isTextAlignActive()" class="cursor-pointer">
              <AlignCenter />
            </Toggle>
          </template>
        </TextAlignButton>

        <TextAlignButton align="right">
          <template #default="{ isTextAlignActive }">
            <Toggle size="sm" :model-value="isTextAlignActive()" class="cursor-pointer">
              <AlignRight />
            </Toggle>
          </template>
        </TextAlignButton>

        <TextAlignButton align="justify">
          <template #default="{ isTextAlignActive }">
            <Toggle size="sm" :model-value="isTextAlignActive()" class="cursor-pointer">
              <AlignJustify />
            </Toggle>
          </template>
        </TextAlignButton>

        <div class="h-4">
          <Separator orientation="vertical" />
        </div>

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
