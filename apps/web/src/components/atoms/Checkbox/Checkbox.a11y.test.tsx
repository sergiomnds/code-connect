import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from '../../../test/a11y'
import { Checkbox } from './Checkbox'

describe('Checkbox a11y', () => {
  it('has no WCAG 2 AA violations with a label', async () => {
    const { container } = render(<Checkbox id="remember" label="Lembrar-me" />)

    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no WCAG 2 AA violations without a visible label', async () => {
    const { container } = render(<Checkbox id="remember" />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
