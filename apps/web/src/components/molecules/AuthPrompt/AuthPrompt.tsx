import type { ReactNode } from 'react'
import { TextLink } from '../../atoms/TextLink'

export type AuthPromptLayout = 'stacked' | 'inline'

export interface AuthPromptProps {
  question: string
  actionLabel: string
  to: string
  /** `stacked` matches the login design, `inline` the sign up one. */
  layout?: AuthPromptLayout
  icon?: ReactNode
}

export function AuthPrompt({ question, actionLabel, to, layout = 'stacked', icon }: AuthPromptProps) {
  if (layout === 'inline') {
    return (
      <p className="flex items-center gap-2 text-lg leading-normal text-muted">
        {question}
        <TextLink to={to} className="inline-flex items-center gap-3">
          {actionLabel}
          {icon}
        </TextLink>
      </p>
    )
  }

  return (
    <p className="text-center text-lg leading-normal text-muted">
      {question}
      <br />
      <TextLink to={to} className="inline-flex items-center gap-3">
        {actionLabel}
        {icon}
      </TextLink>
    </p>
  )
}
