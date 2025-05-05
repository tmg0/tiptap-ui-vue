import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { Editor } from '@tiptap/vue-3'
import { ImageUploadNode } from 'tiptap-ui-vue'
import { onUnmounted } from 'vue'
import { ImageUploadNode as ImageUploadNodeComponent } from '../components/tiptap'

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
    content: `<h1>Getting started</h1><p>Welcome to the <em><mark data-color="var(--tt-highlight-yellow)" style="background-color: var(--tt-highlight-yellow); color: inherit">Simple Editor</mark></em> template! This template integrates <strong>open source</strong> UI components and Tiptap extensions licensed under <strong>MIT</strong>.</p><p>Integrate it by following the <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/docs/ui-components/templates/simple-editor">Tiptap UI Components docs</a> or using our CLI tool.</p><pre><code>npx @tiptap/cli init</code></pre><h2>Features</h2><blockquote><p><em>A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown </em><code>**</code><em> or use keyboard shortcuts </em><code>⌘+B</code> for <s>most</s> all common markdown marks. 🪄</p></blockquote><p style="text-align: left">Add images, customize alignment, and apply <mark data-color="var(--tt-highlight-blue)" style="background-color: var(--tt-highlight-blue); color: inherit">advanced formatting</mark> to make your writing more engaging and professional.</p><img src="https://template.tiptap.dev/images/placeholder-image.png" contenteditable="false" draggable="true"><ul><li><p style="text-align: left"><strong>Superscript</strong> (x<sup>2</sup>) and <strong>Subscript</strong> (H<sub>2</sub>O) for precision.</p></li><li><p style="text-align: left"><strong>Typographic conversion</strong>: automatically convert to <code>-&gt;</code> an arrow <strong>→</strong>.</p></li></ul><p style="text-align: left"><em>→ </em><a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/docs/ui-components/templates/simple-editor#features">Learn more</a></p><hr contenteditable="false"><h2 style="text-align: left">Make it your own</h2><p style="text-align: left">Switch between light and dark modes, and tailor the editor's appearance with customizable CSS to match your style.</p><ul data-type="taskList"><li data-checked="true"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p style="text-align: left">Test template</p></div></li><li data-checked="false"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p style="text-align: left"><a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/docs/ui-components/templates/simple-editor">Integrate the free template</a></p></div></li></ul><p style="text-align: left"><br class="ProseMirror-trailingBreak"></p>`,
  })

  onUnmounted(() => {
    editor.destroy()
  })

  return {
    editor,
  }
}
