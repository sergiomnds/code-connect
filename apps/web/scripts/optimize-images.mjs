// Generates WebP versions of the auth banners referenced from public/.
// Run with `pnpm images` (proxied from the repo root as `pnpm web:images`).
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '..', 'public')

const WEBP_QUALITY = 80

function toKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

async function optimizeBanner(fileName) {
  const inputPath = path.join(publicDir, fileName)
  const baseName = fileName.replace(/\.png$/, '')

  const inputStat = await stat(inputPath)
  const image = sharp(inputPath)
  const metadata = await image.metadata()

  const outputPath1x = path.join(publicDir, `${baseName}.webp`)
  const outputPath2x = path.join(publicDir, `${baseName}@2x.webp`)

  await image.clone().webp({ quality: WEBP_QUALITY }).toFile(outputPath1x)

  await sharp(inputPath)
    .resize({ width: (metadata.width ?? 0) * 2 })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath2x)

  const output1xStat = await stat(outputPath1x)
  const output2xStat = await stat(outputPath2x)

  console.log(`${fileName}: ${toKb(inputStat.size)} -> ${baseName}.webp ${toKb(output1xStat.size)}, ${baseName}@2x.webp ${toKb(output2xStat.size)}`)
}

async function main() {
  const entries = await readdir(publicDir)
  const banners = entries.filter((entry) => entry.startsWith('banner-') && entry.endsWith('.png'))

  if (banners.length === 0) {
    console.log('No banner-*.png files found in public/.')
    return
  }

  for (const banner of banners) {
    await optimizeBanner(banner)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
