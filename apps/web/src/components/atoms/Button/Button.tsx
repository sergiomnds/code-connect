import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'ghost'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  icon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'w-full bg-accent text-petrol font-semibold hover:bg-accent-strong disabled:opacity-50 disabled:cursor-not-allowed',
  ghost: 'bg-transparent text-muted hover:opacity-80',
}

export function Button({ variant = 'primary', icon, className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-lg leading-normal outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon}
    </button>
  )
}
