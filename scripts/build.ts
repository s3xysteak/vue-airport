import { createWriteStream, existsSync, promises as fs } from 'node:fs'
import { URL, fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { consola } from 'consola'
import archiver from 'archiver'

execSync('pnpm build:only', { stdio: 'inherit' })

consola.box('Start compress')
consola.start('Compressing `dist` to `dist.zip`...')

const zipPath = fileURLToPath(new URL('../dist.zip', import.meta.url))
if (existsSync(zipPath))
  await fs.unlink(zipPath)

await zip()

consola.success('Compress success. See `dist.zip`.')

async function zip() {
  const output = createWriteStream(zipPath)
  const archive = archiver('zip', {
    zlib: { level: 9 },
  })

  archive
    .on('error', (err) => {
      throw err
    })
    .pipe(output)

  archive.glob('dist/**/*', {
    cwd: fileURLToPath(new URL('../', import.meta.url)),
  })

  await archive.finalize()
}
