import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AuthPrompt } from './AuthPrompt'

describe('AuthPrompt', () => {
  it('renders the question and links the action to the given route', () => {
    render(
      <MemoryRouter>
        <AuthPrompt
          question="Ainda não tem conta?"
          actionLabel="Crie seu cadastro!"
          to="/cadastro"
        />
      </MemoryRouter>,
    )

    expect(screen.getByText('Ainda não tem conta?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveAttribute(
      'href',
      '/cadastro',
    )
  })
})
