import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { FormOptionsRow } from './FormOptionsRow'

describe('FormOptionsRow', () => {
  it('toggles the checkbox and renders the link target', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <MemoryRouter>
        <FormOptionsRow
          checkboxProps={{ id: 'remember', label: 'Lembrar-me', onChange }}
          linkLabel="Esqueci a senha"
          linkProps={{ to: '/esqueci-senha' }}
        />
      </MemoryRouter>,
    )

    await user.click(screen.getByLabelText('Lembrar-me'))
    expect(onChange).toHaveBeenCalledTimes(1)

    expect(screen.getByRole('link', { name: 'Esqueci a senha' })).toHaveAttribute(
      'href',
      '/esqueci-senha',
    )
  })

  it('renders only the checkbox when no link is provided', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <MemoryRouter>
        <FormOptionsRow checkboxProps={{ id: 'remember', label: 'Lembrar-me', onChange }} />
      </MemoryRouter>,
    )

    await user.click(screen.getByLabelText('Lembrar-me'))
    expect(onChange).toHaveBeenCalledTimes(1)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
