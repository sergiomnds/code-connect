import type { ReactNode } from 'react'

export interface DividerProps {
  children: ReactNode
}

export function Divider({ children }: DividerProps) {
  return (
    <div className="flex items-center gap-4 text-sm text-muted">
      <span className="h-px flex-1 bg-muted/40" />
      {children}
      <span className="h-px flex-1 bg-muted/40" />
    </div>
  )
}
