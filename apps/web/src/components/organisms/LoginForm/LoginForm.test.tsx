import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { LoginForm } from './LoginForm'

const providers = [{ name: 'Github', iconSrc: '/github.png' }]

describe('LoginForm', () => {
  it('submits the entered values', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(
      <MemoryRouter>
        <LoginForm onSubmit={onSubmit} socialProviders={providers} />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText('Email ou usuário'), 'usuario123')
    await user.type(screen.getByLabelText('Senha'), 'senha-secreta')
    await user.click(screen.getByRole('button', { name: /login/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      identifier: 'usuario123',
      password: 'senha-secreta',
      remember: true,
    })
  })

  it('shows validation errors and does not submit when fields are empty', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(
      <MemoryRouter>
        <LoginForm onSubmit={onSubmit} socialProviders={providers} />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /login/i }))

    expect(await screen.findAllByRole('alert')).toHaveLength(2)
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
