import { Checkbox, type CheckboxProps } from '../../atoms/Checkbox'
import { TextLink, type TextLinkProps } from '../../atoms/TextLink'

export interface FormOptionsRowProps {
  checkboxProps: CheckboxProps
  linkLabel: string
  linkProps: TextLinkProps
}

export function FormOptionsRow({ checkboxProps, linkLabel, linkProps }: FormOptionsRowProps) {
  return (
    <div className="flex items-center justify-between">
      <Checkbox {...checkboxProps} />
      <TextLink {...linkProps}>{linkLabel}</TextLink>
    </div>
  )
}
