import type { InputHTMLAttributes } from 'react'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  const checkbox = (
    <input
      id={id}
      type="checkbox"
      className={`h-4 w-4 rounded border border-muted bg-transparent accent-accent outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
      {...props}
    />
  )

  if (!label) return checkbox

  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm text-muted">
      {checkbox}
      {label}
    </label>
  )
}
