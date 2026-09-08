import type { AnchorHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router'

export type TextLinkProps =
  | ({ to: LinkProps['to']; href?: never } & Omit<LinkProps, 'to'>)
  | ({ href: string; to?: never } & AnchorHTMLAttributes<HTMLAnchorElement>)

export function TextLink({ className = '', ...props }: TextLinkProps) {
  const linkClassName = `text-accent underline hover:text-accent-strong ${className}`

  if ('to' in props && props.to !== undefined) {
    return <Link className={linkClassName} {...props} />
  }

  const { href, ...anchorProps } = props as Extract<TextLinkProps, { href: string }>
  return <a href={href} className={linkClassName} {...anchorProps} />
}
