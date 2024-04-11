import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'

import transformerDirectives from '@unocss/transformer-directives'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex-items-center flex-justify-center',
  },
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        my: FileSystemIconLoader(
          './src/assets/svg-icons',
          svg => svg.replace(/#fff/, 'currentColor'),
        ),
      },
    }),
    presetAttributify({
      prefix: 'uno-',
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
