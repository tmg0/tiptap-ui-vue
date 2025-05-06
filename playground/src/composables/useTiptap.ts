import { Highlight } from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline } from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { Editor } from '@tiptap/vue-3'
import { ImageUploadNode } from 'tiptap-ui-vue'
import { onUnmounted } from 'vue'
import { ImageUploadNode as ImageUploadNodeComponent } from '../components/tiptap'
import content from '../data/content.json'

function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = (e) => {
      resolve(e.target!.result as string)
    }
    fr.onerror = reject
    fr.readAsDataURL(blob)
  })
}

export function useTiptap() {
  const editor = new Editor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,

      ImageUploadNode.configure({
        children: ImageUploadNodeComponent,
        async upload(files: File[] = []) {
          const [file] = files
          if (!file)
            return ''
          return blobToBase64(file)
        },
      }),

      Link.configure({
        HTMLAttributes: {
          class: 'cursor-pointer',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none',
      },
    },
    content,
  })

  onUnmounted(() => {
    editor.destroy()
  })

  return {
    editor,
  }
}
