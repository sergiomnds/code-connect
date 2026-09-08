import type { InputHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-[4px] bg-field px-4 py-2 text-sm leading-normal text-surface outline-none placeholder:text-surface/70 focus-visible:ring-2 focus-visible:ring-accent ${className}`}
      {...props}
    />
  )
}
