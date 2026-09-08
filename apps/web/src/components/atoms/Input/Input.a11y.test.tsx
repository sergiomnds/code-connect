import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from '../../../test/a11y'
import { Input } from './Input'

describe('Input a11y', () => {
  it('has no WCAG 2 AA violations when labelled', async () => {
    const { container } = render(
      <>
        <label htmlFor="username">Usuário</label>
        <Input id="username" />
      </>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
