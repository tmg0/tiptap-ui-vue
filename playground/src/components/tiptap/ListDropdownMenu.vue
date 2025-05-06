<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Toggle } from '@/components/ui/toggle'
import { ChevronDown, List, ListOrdered, ListTodo } from 'lucide-vue-next'
import { ListButton, useEditorContext } from 'tiptap-ui-vue'
import { ref } from 'vue'

const editor = useEditorContext()
const isOpen = ref(false)

function isActive() {
  const TASK_TYPES = ['bulletList', 'orderedList', 'taskList']
  for (const k of TASK_TYPES) {
    if (editor.isActive(k))
      return true
  }
  return false
}
</script>

<template>
  <DropdownMenu v-model:open="isOpen">
    <DropdownMenuTrigger>
      <Toggle size="sm" :model-value="isActive()" class="cursor-pointer gap-0">
        <List class="size-4" />
        <ChevronDown class="size-3" :class="{ 'rotate-180': isOpen }" />
      </Toggle>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="flex flex-col gap-0.5 min-w-0">
      <DropdownMenuItem class="p-0">
        <ListButton type="bulletList">
          <template #default="{ isListActive }">
            <Toggle size="sm" :model-value="isListActive()" class="cursor-pointer">
              <List class="size-4" />
            </Toggle>
          </template>
        </ListButton>
      </DropdownMenuItem>

      <DropdownMenuItem class="p-0">
        <ListButton type="orderedList">
          <template #default="{ isListActive }">
            <Toggle size="sm" :model-value="isListActive()" class="cursor-pointer">
              <ListOrdered class="size-4" />
            </Toggle>
          </template>
        </ListButton>
      </DropdownMenuItem>

      <DropdownMenuItem class="p-0">
        <ListButton type="taskList">
          <template #default="{ isListActive }">
            <Toggle size="sm" :model-value="isListActive()" class="cursor-pointer">
              <ListTodo class="size-4" />
            </Toggle>
          </template>
        </ListButton>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
