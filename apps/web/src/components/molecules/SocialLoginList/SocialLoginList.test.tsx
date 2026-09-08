import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SocialLoginList } from './SocialLoginList'

describe('SocialLoginList', () => {
  it('renders a button per provider and calls the right callback on click', async () => {
    const user = userEvent.setup()
    const onGithubClick = vi.fn()
    const onGmailClick = vi.fn()

    render(
      <SocialLoginList
        providers={[
          { name: 'Github', iconSrc: '/github.png', onClick: onGithubClick },
          { name: 'Gmail', iconSrc: '/gmail.png', onClick: onGmailClick },
        ]}
      />,
    )

    expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /gmail/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /gmail/i }))
    expect(onGmailClick).toHaveBeenCalledTimes(1)
    expect(onGithubClick).not.toHaveBeenCalled()
  })
})
