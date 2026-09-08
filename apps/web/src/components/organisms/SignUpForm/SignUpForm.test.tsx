import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { SignUpForm } from './SignUpForm'

const providers = [{ name: 'Github', iconSrc: '/github.png' }]

function renderForm(onSubmit = vi.fn()) {
  render(
    <MemoryRouter>
      <SignUpForm onSubmit={onSubmit} socialProviders={providers} />
    </MemoryRouter>,
  )
  return onSubmit
}

describe('SignUpForm', () => {
  it('submits the entered values', async () => {
    const user = userEvent.setup()
    const onSubmit = renderForm()

    await user.type(screen.getByLabelText('Nome'), 'Sergio Mendes')
    await user.type(screen.getByLabelText('Email'), 'sergio@example.com')
    await user.type(screen.getByLabelText('Senha'), 'senha-secreta')
    await user.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Sergio Mendes',
      email: 'sergio@example.com',
      password: 'senha-secreta',
      remember: true,
    })
  })

  it('shows validation errors and does not submit when fields are empty', async () => {
    const user = userEvent.setup()
    const onSubmit = renderForm()

    await user.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(await screen.findAllByRole('alert')).toHaveLength(3)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('rejects a malformed email and a too short password', async () => {
    const user = userEvent.setup()
    const onSubmit = renderForm()

    await user.type(screen.getByLabelText('Nome'), 'Sergio Mendes')
    await user.type(screen.getByLabelText('Email'), 'sergio@example')
    await user.type(screen.getByLabelText('Senha'), '123')
    await user.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(screen.getByText('Informe um email válido.')).toBeInTheDocument()
    expect(screen.getByText('A senha deve ter ao menos 6 caracteres.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('links back to the login page', () => {
    renderForm()

    expect(screen.getByRole('link', { name: 'Faça seu login!' })).toHaveAttribute('href', '/login')
  })
})
