import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AuthPrompt } from './AuthPrompt'

describe('AuthPrompt', () => {
  it('renders the question and links the action to the given route', () => {
    render(
      <MemoryRouter>
        <AuthPrompt question="Ainda não tem conta?" actionLabel="Crie seu cadastro!" to="/cadastro" />
      </MemoryRouter>,
    )

    expect(screen.getByText('Ainda não tem conta?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveAttribute(
      'href',
      '/cadastro',
    )
  })

  it('keeps the question and the action on a single line in the inline layout', () => {
    render(
      <MemoryRouter>
        <AuthPrompt
          question="Já tem conta?"
          actionLabel="Faça seu login!"
          to="/login"
          layout="inline"
          icon={<span data-testid="prompt-icon" />}
        />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Faça seu login!' })).toHaveAttribute('href', '/login')
    expect(screen.getByTestId('prompt-icon')).toBeInTheDocument()
    expect(screen.queryByRole('link')?.parentElement?.querySelector('br')).toBeNull()
  })
})
