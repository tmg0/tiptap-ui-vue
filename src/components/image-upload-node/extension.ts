import type { NodeViewProps } from '@tiptap/vue-3'
import type { Component } from 'vue'
import { mergeAttributes, Node, VueNodeViewRenderer } from '@tiptap/vue-3'

type UploadFunction = (
  file: File,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal
) => Promise<string>

interface ImageUploadNodeOptions {
  /**
   * Acceptable file types for upload.
   * @default 'image/*'
   */
  accept?: string
  /**
   * Maximum number of files that can be uploaded.
   * @default 1
   */
  limit?: number
  /**
   * Upload component for rendering the upload interface.
   */
  children?: Component<NodeViewProps>
  /**
   * Maximum file size in bytes (0 for unlimited).
   * @default 0
   */
  maxSize?: number
  /**
   * Function to handle the upload process.
   */
  upload?: UploadFunction
  /**
   * Callback for upload errors.
   */
  onError?: (error: Error) => void
  /**
   * Callback for successful uploads.
   */
  onSuccess?: (url: string) => void
}

export const ImageUploadNode = Node.create<ImageUploadNodeOptions>({
  name: 'imageUpload',

  group: 'block',

  draggable: true,

  selectable: true,

  atom: true,

  addOptions() {
    return {
      accept: 'image/*',
      limit: 1,
      maxSize: 0,
      children: undefined,
      upload: undefined,
      onError: undefined,
      onSuccess: undefined,
    }
  },

  addAttributes() {
    return {
      accept: {
        default: this.options.accept,
      },
      limit: {
        default: this.options.limit,
      },
      maxSize: {
        default: this.options.maxSize,
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="image-upload"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes({ 'data-type': 'image-upload' }, HTMLAttributes),
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(this.options.children!)
  },
})
