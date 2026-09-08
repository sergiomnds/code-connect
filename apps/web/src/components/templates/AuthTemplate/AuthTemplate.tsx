import type { ReactNode } from 'react'

export interface AuthTemplateProps {
  banner: {
    src: string
    alt: string
  }
  children: ReactNode
}

export function AuthTemplate({ banner, children }: AuthTemplateProps) {
  return (
    <main className="relative flex min-h-full items-center justify-center overflow-hidden bg-background px-4 py-12">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] text-muted opacity-10"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="70" cy="70" r="55" stroke="currentColor" strokeWidth="18" />
        <circle cx="140" cy="140" r="55" stroke="currentColor" strokeWidth="18" />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] text-muted opacity-10"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="70" cy="70" r="55" stroke="currentColor" strokeWidth="18" />
        <circle cx="140" cy="140" r="55" stroke="currentColor" strokeWidth="18" />
      </svg>

      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-2xl bg-surface shadow-2xl md:grid-cols-2">
        <img src={banner.src} alt={banner.alt} className="hidden h-full w-full object-cover md:block" />
        <div className="flex items-center px-8 py-10 sm:px-12">{children}</div>
      </div>
    </main>
  )
}
