import type { InputHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-md bg-field px-4 py-2 text-gray-900 placeholder-gray-600 outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
      {...props}
    />
  )
}
