<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Toggle } from '@/components/ui/toggle'
import { ChevronDown, Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'lucide-vue-next'
import { HeadingButton, useEditorContext } from 'tiptap-ui-vue'
import { ref } from 'vue'

const HEADING_LEVELS = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6]

const editor = useEditorContext()
const isOpen = ref(false)
</script>

<template>
  <DropdownMenu v-model:open="isOpen">
    <DropdownMenuTrigger>
      <Toggle size="sm" :model-value="editor.isActive?.('heading')" class="cursor-pointer gap-0">
        <Heading class="h-4 w-4" />
        <ChevronDown class="size-3" :class="{ 'rotate-180': isOpen }" />
      </Toggle>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="flex flex-col gap-0.5 min-w-0">
      <DropdownMenuItem v-for="(lv, i) in HEADING_LEVELS" :key="i" class="p-0">
        <HeadingButton :level="i + 1">
          <template #default="{ isHeadingActive }">
            <Toggle size="sm" :model-value="isHeadingActive()" class="cursor-pointer">
              <Component :is="lv" class="h-4 w-4" />
            </Toggle>
          </template>
        </HeadingButton>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
