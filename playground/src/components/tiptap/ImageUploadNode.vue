<script setup lang="ts">
import type { NodeViewProps } from '@tiptap/vue-3'
import { ImageUp } from 'lucide-vue-next'
import { ImageUploadNodeComponent } from 'tiptap-ui-vue'

const props = defineProps<NodeViewProps>()
</script>

<template>
  <ImageUploadNodeComponent v-bind="props">
    <template #default="{ src }">
      <img v-if="src" :src="src" class="block rounded">

      <div v-else class="border bg-zinc-50 rounded py-4 flex flex-col w-full items-center cursor-pointer">
        <ImageUp class="size-8 mb-2" />

        <div>
          <a>Click to upload</a>
          <span> or drap and drop</span>
        </div>

        <div class="text-xs text-muted-foreground">
          Maximum file size 5 Mb
        </div>
      </div>
    </template>
  </ImageUploadNodeComponent>
</template>
