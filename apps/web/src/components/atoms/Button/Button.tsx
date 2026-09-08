import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'ghost'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  icon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'w-full bg-accent text-gray-900 font-semibold hover:bg-accent-strong disabled:opacity-50 disabled:cursor-not-allowed',
  ghost: 'bg-transparent text-white hover:opacity-80',
}

export function Button({
  variant = 'primary',
  icon,
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon}
    </button>
  )
}
