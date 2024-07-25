import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
} from 'unocss'

import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  shortcuts: {
    'bg-full': [{
      'background-size': '100% 100%',
    }],
    'clip-triangle': [{
      'clip-path': 'polygon(0 0, 100% 0, 50% 50%)',
    }],
    'flex-center': 'flex-items-center flex-justify-center',
  },
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        gb: FileSystemIconLoader(
          './src/assets/svg',
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
