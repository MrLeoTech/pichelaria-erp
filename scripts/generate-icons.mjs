/**
 * Generates PWA icons from favicon.svg
 * Run: npm run icons
 */
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

async function generate() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.log('Installing sharp...')
    const { execSync } = await import('child_process')
    execSync('npm install sharp --save-dev', { stdio: 'inherit', cwd: join(__dirname, '..') })
    sharp = (await import('sharp')).default
  }

  const svg = readFileSync(join(publicDir, 'favicon.svg'))

  for (const size of [192, 512]) {
    const out = join(publicDir, `icon-${size}.png`)
    await sharp(svg).resize(size, size).png().toFile(out)
    console.log(`Created icon-${size}.png`)
  }
}

generate().catch(err => {
  console.error('Icon generation failed:', err.message)
  process.exit(1)
})
