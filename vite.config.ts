import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

import { autoImport as AutoImportUtils } from '@s3xysteak/utils'

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
        AutoImportUtils(),
      ],
    }),
    Components({
      extensions: ['vue', 'ts'],
      dts: 'types/components.d.ts',
      resolvers: [
        ArcoResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '~pub': '',
      ...toAlias({
        '~': './src',
      }),
    },
  },
})

function toAlias(aliasMap: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(aliasMap).map(([key, value]) => [
      key,
      fileURLToPath(new URL(value, import.meta.url)),
    ]),
  )
}
