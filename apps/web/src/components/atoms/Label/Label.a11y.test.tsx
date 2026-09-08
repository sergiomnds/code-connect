import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from '../../../test/a11y'
import { Label } from './Label'

describe('Label a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
