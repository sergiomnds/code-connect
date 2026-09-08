import type { ReactNode } from 'react'

export interface AuthTemplateProps {
  banner: {
    src: string
    alt: string
    width: number
    height: number
  }
  children: ReactNode
}

export function AuthTemplate({ banner, children }: AuthTemplateProps) {
  const webpSrc = banner.src.replace(/\.png$/, '.webp')
  const webpSrc2x = banner.src.replace(/\.png$/, '@2x.webp')

  return (
    <main className="relative flex min-h-full items-center justify-center overflow-hidden bg-background px-4 py-14">
      <img
        src="/deco-shape.svg"
        alt=""
        aria-hidden="true"
        width={407}
        height={486}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -left-24 -top-32 w-[407px] max-w-none select-none"
      />
      <img
        src="/deco-shape.svg"
        alt=""
        aria-hidden="true"
        width={407}
        height={486}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute -bottom-24 -right-24 w-[407px] max-w-none select-none"
      />

      <div className="relative flex w-full max-w-[996px] flex-col items-center gap-8 rounded-[32px] border border-border bg-surface px-6 py-10 sm:px-12 md:flex-row md:items-stretch md:justify-between md:gap-12 md:px-[78px] md:py-14">
        <picture>
          <source type="image/webp" srcSet={`${webpSrc} 1x, ${webpSrc2x} 2x`} />
          <img
            src={banner.src}
            alt={banner.alt}
            width={banner.width}
            height={banner.height}
            fetchPriority="high"
            decoding="async"
            className="w-full max-w-[296px] rounded-lg object-cover md:h-full md:w-[407px] md:max-w-none"
          />
        </picture>
        <div className="flex w-full items-center md:w-[410px] md:shrink-0 md:px-8">{children}</div>
      </div>
    </main>
  )
}
