import type { LabelHTMLAttributes } from 'react'

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className = '', ...props }: LabelProps) {
  return <label className={`text-lg leading-normal text-muted ${className}`} {...props} />
}
