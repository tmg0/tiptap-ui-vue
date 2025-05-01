import StarterKit from '@tiptap/starter-kit'
import { Editor } from '@tiptap/vue-3'
import { onUnmounted } from 'vue'

export function useTiptap() {
  const editor = new Editor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none',
      },
    },
    content: '<p>Hello World!</p>',
  })

  onUnmounted(() => {
    editor.destroy()
  })

  return {
    editor,
  }
}
