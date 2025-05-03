import Image from '@tiptap/extension-image'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { Editor } from '@tiptap/vue-3'
import { ImageUploadNode } from 'tiptap-ui-vue'
import { onUnmounted } from 'vue'
import ImageUploadNodeComponent from '../components/tiptap/ImageUploadNode.vue'

export function useTiptap() {
  const editor = new Editor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({ nested: true }),
      Image,

      ImageUploadNode.configure({
        children: ImageUploadNodeComponent,
        upload(files: any) {
          console.log(files)
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
