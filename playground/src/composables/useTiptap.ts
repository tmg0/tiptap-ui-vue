import Image from '@tiptap/extension-image'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { Editor } from '@tiptap/vue-3'
import { ImageUploadNode } from 'tiptap-ui-vue'
import { onUnmounted } from 'vue'
import ImageUploadNodeComponent from '../components/tiptap/ImageUploadNode.vue'

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
      TaskList,
      TaskItem.configure({ nested: true }),
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
    ],
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
