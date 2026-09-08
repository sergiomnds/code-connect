import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { TextLink } from './TextLink'

describe('TextLink', () => {
  it('navigates via react-router when given a "to" prop', () => {
    render(
      <MemoryRouter>
        <TextLink to="/cadastro">Crie seu cadastro!</TextLink>
      </MemoryRouter>,
    )

    const link = screen.getByRole('link', { name: 'Crie seu cadastro!' })
    expect(link).toHaveAttribute('href', '/cadastro')
  })

  it('renders a plain anchor when given an "href" prop', () => {
    render(<TextLink href="https://example.com">Esqueci a senha</TextLink>)

    const link = screen.getByRole('link', { name: 'Esqueci a senha' })
    expect(link).toHaveAttribute('href', 'https://example.com')
  })
})
