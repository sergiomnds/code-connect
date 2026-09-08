import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from '../../../test/a11y'
import { Button } from './Button'

describe('Button a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(<Button>Login</Button>)

    expect(await axe(container)).toHaveNoViolations()
  })
})
