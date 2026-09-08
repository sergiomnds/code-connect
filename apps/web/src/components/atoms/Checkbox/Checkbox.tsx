import type { InputHTMLAttributes } from 'react'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  const checkbox = (
    <input
      id={id}
      type="checkbox"
      className={`h-6 w-6 rounded-[4px] border-2 border-field bg-transparent accent-accent outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
      {...props}
    />
  )

  if (!label) {
    return checkbox
  }

  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm leading-normal text-field">
      {checkbox}
      {label}
    </label>
  )
}
