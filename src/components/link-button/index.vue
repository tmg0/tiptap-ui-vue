<script setup lang="ts">
import { useEditorContext } from '../../composables/useEditorContext'

const editor = useEditorContext()

function isLinkActive() {
  if (!editor)
    return false
  return editor.isActive('link')
}

function setLink(url: string) {
  if (!editor)
    return

  const { from, to } = editor.state.selection
  const text = editor.state.doc.textBetween(from, to)

  editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .insertContent({
      type: 'text',
      text: text || url,
      marks: [{ type: 'link', attrs: { href: url } }],
    })
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
