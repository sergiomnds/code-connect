import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from '../../../test/a11y'
import { FormField } from './FormField'

describe('FormField a11y', () => {
  it('has no WCAG 2 AA violations', async () => {
    const { container } = render(<FormField label="Email ou usuário" placeholder="usuario123" />)

    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no WCAG 2 AA violations with an error message', async () => {
    const { container } = render(
      <FormField label="Senha" type="password" error="Informe sua senha." />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
