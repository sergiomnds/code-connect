import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { axe } from '../../../test/a11y'
import { LoginForm } from './LoginForm'

const providers = [{ name: 'Github', iconSrc: '/github.png' }]

describe('LoginForm a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <LoginForm onSubmit={vi.fn()} socialProviders={providers} />
      </MemoryRouter>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
