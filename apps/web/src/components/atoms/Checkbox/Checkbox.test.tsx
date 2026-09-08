import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('toggles checked state via its associated label', async () => {
    const user = userEvent.setup()
    render(<Checkbox id="remember" label="Lembrar-me" defaultChecked={false} />)

    const checkbox = screen.getByLabelText('Lembrar-me')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })
})
