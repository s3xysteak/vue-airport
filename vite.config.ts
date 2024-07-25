/// <reference types="vitest" />
import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import UtilsResolver from '@s3xysteak/utils/resolver'

export default defineConfig({
  base: '',
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    UnoCSS(),
    AutoImport({
      dts: 'types/auto-imports.d.ts',
      dirs: [
        'src/composables/**',
        'src/utils/**',
      ],
      imports: [
        'vue',
      ],
      resolvers: [
        UtilsResolver(),
      ],
    }),
    Components({
      extensions: ['vue', 'ts'],
      dts: 'types/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '~': r('./src'),
      '~pub': '',

      '@': r('./src'),
      '@pub': '',
    },
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    environment: 'jsdom',
    includeSource: ['./src/**/*.ts'],
  },
})

function r(path: string) {
  return fileURLToPath(new URL(path, import.meta.url))
}
