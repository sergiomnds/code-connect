import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    expect(screen.getByRole('link', { name: 'Faça seu login!' })).toHaveAttribute('href', '/login')
  })

  it('renders the sign-up fields and validates them on submit', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(await screen.findAllByRole('alert')).toHaveLength(3)
  })
})
