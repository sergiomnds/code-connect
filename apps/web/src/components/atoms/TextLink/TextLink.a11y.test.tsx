import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { axe } from '../../../test/a11y'
import { TextLink } from './TextLink'

describe('TextLink a11y', () => {
  it('has no WCAG 2 AA violations for an internal link', async () => {
    const { container } = render(
      <MemoryRouter>
        <TextLink to="/cadastro">Crie seu cadastro!</TextLink>
      </MemoryRouter>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no WCAG 2 AA violations for an external link', async () => {
    const { container } = render(<TextLink href="https://example.com">Saiba mais</TextLink>)

    expect(await axe(container)).toHaveNoViolations()
  })
})
