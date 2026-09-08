import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { axe } from '../../test/a11y'
import { SignUpPage } from './SignUpPage'

describe('SignUpPage a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
