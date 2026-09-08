import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { axe } from '../../../test/a11y'
import { FormOptionsRow } from './FormOptionsRow'

describe('FormOptionsRow a11y', () => {
  it('has no WCAG 2 AA violations with only the checkbox', async () => {
    const { container } = render(
      <FormOptionsRow checkboxProps={{ id: 'remember', label: 'Lembrar-me' }} />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no WCAG 2 AA violations with the checkbox and a link', async () => {
    const { container } = render(
      <MemoryRouter>
        <FormOptionsRow
          checkboxProps={{ id: 'remember', label: 'Lembrar-me' }}
          linkLabel="Esqueci a senha"
          linkProps={{ to: '/esqueci-senha' }}
        />
      </MemoryRouter>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
