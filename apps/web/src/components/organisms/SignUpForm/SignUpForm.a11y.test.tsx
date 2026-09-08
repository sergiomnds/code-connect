import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { axe } from '../../../test/a11y'
import { SignUpForm } from './SignUpForm'

const providers = [{ name: 'Github', iconSrc: '/github.png' }]

describe('SignUpForm a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <SignUpForm onSubmit={vi.fn()} socialProviders={providers} />
      </MemoryRouter>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
