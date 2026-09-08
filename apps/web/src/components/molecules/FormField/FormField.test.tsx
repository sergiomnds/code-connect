import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FormField } from './FormField'

describe('FormField', () => {
  it('links the label to the input', () => {
    render(<FormField label="Email ou usuário" placeholder="usuario123" />)

    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
  })

  it('shows an accessible error message and marks the input invalid', () => {
    render(<FormField label="Senha" error="Campo obrigatório" />)

    const input = screen.getByLabelText('Senha')
    const error = screen.getByRole('alert')

    expect(error).toHaveTextContent('Campo obrigatório')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', error.id)
  })
})
