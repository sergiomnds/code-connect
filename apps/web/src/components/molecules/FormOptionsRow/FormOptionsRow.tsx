import { Checkbox, type CheckboxProps } from '../../atoms/Checkbox'
import { TextLink, type TextLinkProps } from '../../atoms/TextLink'

export interface FormOptionsRowProps {
  checkboxProps: CheckboxProps
  /** Omit both link props to render only the checkbox (as in the sign up design). */
  linkLabel?: string
  linkProps?: TextLinkProps
}

export function FormOptionsRow({ checkboxProps, linkLabel, linkProps }: FormOptionsRowProps) {
  const hasLink = Boolean(linkLabel && linkProps)

  return (
    <div className={`flex items-center ${hasLink ? 'justify-between' : 'justify-start'}`}>
      <Checkbox {...checkboxProps} />
      {hasLink && (
        <TextLink {...(linkProps as TextLinkProps)} className="text-sm">
          {linkLabel}
        </TextLink>
      )}
    </div>
  )
}
