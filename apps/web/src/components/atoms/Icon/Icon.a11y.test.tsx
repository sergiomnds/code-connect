import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from '../../../test/a11y'
import { Icon } from './Icon'

describe('Icon a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(<Icon name="arrow_forward" />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
