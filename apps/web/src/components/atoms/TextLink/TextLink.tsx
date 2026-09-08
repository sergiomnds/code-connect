import type { AnchorHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router'

interface TextLinkOwnProps {
  /** The Figma design only underlines inline links such as "Esqueci a senha". */
  underline?: boolean
}

export type TextLinkProps = TextLinkOwnProps &
  (
    | ({ to: LinkProps['to']; href?: never } & Omit<LinkProps, 'to'>)
    | ({ href: string; to?: never } & AnchorHTMLAttributes<HTMLAnchorElement>)
  )

export function TextLink({ underline = false, className = '', ...props }: TextLinkProps) {
  const linkClassName = `text-accent transition-colors hover:text-accent-strong ${
    underline ? 'underline' : ''
  } ${className}`

  if ('to' in props && props.to !== undefined) {
    return <Link className={linkClassName} {...props} />
  }

  const { href, ...anchorProps } = props as Extract<TextLinkProps, { href: string }>
  return <a href={href} className={linkClassName} {...anchorProps} />
}
