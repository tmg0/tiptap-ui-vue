import type { Editor } from '@tiptap/vue-3'
import { inject, provide } from 'vue'

export function useProvideEditorContext(editor: Editor) {
  provide('__TIPTAP:EDITOR', editor)
}

export function useEditorContext() {
  return inject<Editor>('__TIPTAP:EDITOR')
}
