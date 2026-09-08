import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from '../../../test/a11y'
import { SocialLoginList } from './SocialLoginList'

describe('SocialLoginList a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const providers = [
      { name: 'Github', iconSrc: '/github.png' },
      { name: 'Gmail', iconSrc: '/gmail.png' },
    ]

    const { container } = render(<SocialLoginList providers={providers} />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
