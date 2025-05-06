<script setup lang="ts">
import { useEditorContext } from '../../composables/useEditorContext'

const editor = useEditorContext()

function isLinkActive() {
  if (!editor)
    return false
  return editor.isActive('link')
}

function setLink(href: string) {
  if (!editor)
    return
  editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href })
    .run()
}

function unsetLink() {
  if (!editor)
    return
  editor.commands.unsetLink()
}

function getLinkHref() {
  if (!editor)
    return ''
  return editor.getAttributes('link').href
}
</script>

<template>
  <slot :is-link-active="isLinkActive" :set-link="setLink" :unset-link="unsetLink" :get-link-href="getLinkHref" />
</template>
