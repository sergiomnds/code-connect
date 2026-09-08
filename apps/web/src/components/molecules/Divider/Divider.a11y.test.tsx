import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from '../../../test/a11y'
import { Divider } from './Divider'

describe('Divider a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(<Divider>ou entre com outras contas</Divider>)

    expect(await axe(container)).toHaveNoViolations()
  })
})
