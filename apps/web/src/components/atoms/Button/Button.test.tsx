import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('fires onClick, renders its icon, and respects disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    const { rerender } = render(
      <Button onClick={onClick} icon={<span data-testid="arrow-icon">→</span>}>
        Login
      </Button>,
    )

    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /login/i }))
    expect(onClick).toHaveBeenCalledTimes(1)

    rerender(
      <Button onClick={onClick} disabled>
        Login
      </Button>,
    )
    await user.click(screen.getByRole('button', { name: /login/i }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
