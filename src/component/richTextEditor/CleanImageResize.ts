// CleanImageResize.ts
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import { mergeAttributes } from '@tiptap/core'

export const CleanImageResize = ImageResize.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        renderHTML: ({ width }) => width ? { style: `width: ${width}px` } : {},
      },
      height: {
        default: null,
        renderHTML: ({ height }) => height ? { style: `height: ${height}px` } : {},
      },
      containerStyle: {

        default: null,
        renderHTML: ( { containerStyle }) => containerStyle ? { style: containerStyle }: {}

      },
      wrapperStyle: {

        default: null,
        renderHTML: ( { wrapperStyle }) => wrapperStyle ? { style: wrapperStyle }: {}

      }
    }
  },

  renderHTML({ HTMLAttributes }) {
    // Only real <img> attributes end up in HTML
    return ['img', mergeAttributes(HTMLAttributes)]
  },
})
