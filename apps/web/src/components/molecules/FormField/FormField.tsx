import { useId } from 'react'
import { Input, type InputProps } from '../../atoms/Input'
import { Label } from '../../atoms/Label'

export interface FormFieldProps extends InputProps {
  label: string
  error?: string
}

export function FormField({ label, error, id, className = '', ...inputProps }: FormFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const errorId = `${fieldId}-error`

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={fieldId}>{label}</Label>
      <Input
        id={fieldId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={className}
        {...inputProps}
      />
      {error && (
        <p id={errorId} role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
