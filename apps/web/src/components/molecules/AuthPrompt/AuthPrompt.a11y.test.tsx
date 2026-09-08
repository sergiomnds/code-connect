import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { axe } from '../../../test/a11y'
import { AuthPrompt } from './AuthPrompt'

describe('AuthPrompt a11y', () => {
  it('has no WCAG 2 AA violations (stacked layout)', async () => {
    const { container } = render(
      <MemoryRouter>
        <AuthPrompt question="Ainda não tem conta?" actionLabel="Crie seu cadastro!" to="/cadastro" />
      </MemoryRouter>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no WCAG 2 AA violations (inline layout)', async () => {
    const { container } = render(
      <MemoryRouter>
        <AuthPrompt question="Já tem conta?" actionLabel="Faça seu login!" to="/login" layout="inline" />
      </MemoryRouter>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
