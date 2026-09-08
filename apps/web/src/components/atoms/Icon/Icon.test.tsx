import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Icon } from './Icon'

describe('Icon', () => {
  it('renders an inline SVG glyph that stays hidden from assistive tech', () => {
    render(
      <span data-testid="wrapper">
        <Icon name="arrow_forward" />
      </span>,
    )

    const icon = screen.getByTestId('wrapper').firstElementChild

    expect(icon?.tagName.toLowerCase()).toBe('svg')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
    expect(icon?.querySelector('path')).toBeInTheDocument()
  })

  it('renders a different path for a different glyph name', () => {
    const { container: forwardContainer } = render(<Icon name="arrow_forward" />)
    const { container: loginContainer } = render(<Icon name="login" />)

    const forwardPath = forwardContainer.querySelector('path')?.getAttribute('d')
    const loginPath = loginContainer.querySelector('path')?.getAttribute('d')

    expect(forwardPath).toBeTruthy()
    expect(loginPath).toBeTruthy()
    expect(forwardPath).not.toBe(loginPath)
  })

  it('keeps custom classes on the svg element', () => {
    render(
      <span data-testid="wrapper">
        <Icon name="login" className="text-2xl" />
      </span>,
    )

    const icon = screen.getByTestId('wrapper').firstElementChild

    expect(icon).toHaveClass('text-2xl')
  })
})
