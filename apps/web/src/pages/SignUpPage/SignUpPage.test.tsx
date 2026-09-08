import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { SignUpPage } from './SignUpPage'

describe('SignUpPage', () => {
  it('renders the sign-up heading and the link back to login', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Faça login!' })).toHaveAttribute('href', '/login')
  })
})
