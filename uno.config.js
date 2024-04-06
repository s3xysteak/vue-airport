import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'

import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex-items-center flex-justify-center',
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify({
      prefix: 'uno-',
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
