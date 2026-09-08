import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from '../../../test/a11y'
import { AuthTemplate } from './AuthTemplate'

describe('AuthTemplate a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(
      <AuthTemplate banner={{ src: '/banner-login.png', alt: 'Code Connect', width: 407, height: 636 }}>
        <p>Conteúdo</p>
      </AuthTemplate>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
