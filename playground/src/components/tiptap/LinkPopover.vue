<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Toggle } from '@/components/ui/toggle'
import { CornerDownLeft, ExternalLink, Link, Trash } from 'lucide-vue-next'
import { LinkButton } from 'tiptap-ui-vue'
import { ref } from 'vue'

const isOpen = ref(false)
const url = ref('')

function handleUpdateOpen(open: boolean, ctx: any) {
  const href = ctx.getLinkHref()
  isOpen.value = open
  url.value = href
}

function handleSetLink(ctx: any) {
  ctx.setLink(url.value)
  isOpen.value = false
}

function handleUnsetLink(ctx: any) {
  ctx.unsetLink()
  isOpen.value = false
}
</script>

<template>
  <LinkButton>
    <template #default="ctx">
      <Popover :open="isOpen" @update:open="handleUpdateOpen($event, ctx)">
        <PopoverTrigger>
          <Toggle size="sm" :model-value="ctx.isLinkActive()" class="cursor-pointer">
            <Link />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent class="p-1 items-center flex">
          <Input v-model="url" class="p-0 ml-2 mr-1 flex-1 shadow-none border-none focus-visible:ring-0" />
          <Button variant="ghost" size="icon" :disabled="!url" class="w-8 h-8 cursor-pointer" @click="handleSetLink(ctx)">
            <CornerDownLeft />
          </Button>

          <div class="h-4 mx-1">
            <Separator orientation="vertical" />
          </div>

          <Button variant="ghost" size="icon" :disabled="!url" class="w-8 h-8 mr-1 cursor-pointer">
            <ExternalLink />
          </Button>
          <Button variant="ghost" size="icon" :disabled="!url" class="w-8 h-8 cursor-pointer" @click="handleUnsetLink(ctx)">
            <Trash />
          </Button>
        </PopoverContent>
      </Popover>
    </template>
  </LinkButton>
</template>
