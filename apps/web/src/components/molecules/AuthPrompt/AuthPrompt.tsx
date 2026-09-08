import { TextLink } from '../../atoms/TextLink'

export interface AuthPromptProps {
  question: string
  actionLabel: string
  to: string
}

export function AuthPrompt({ question, actionLabel, to }: AuthPromptProps) {
  return (
    <p className="text-center text-sm text-muted">
      {question}
      <br />
      <TextLink to={to} className="font-semibold">
        {actionLabel}
      </TextLink>
    </p>
  )
}
