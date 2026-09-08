import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthTemplate } from './AuthTemplate'

describe('AuthTemplate', () => {
  it('renders the banner image and the given content', () => {
    render(
      <AuthTemplate
        banner={{ src: '/banner-login.png', alt: 'Code Connect login banner', width: 407, height: 636 }}
      >
        <p>form content</p>
      </AuthTemplate>,
    )

    expect(screen.getByRole('img', { name: 'Code Connect login banner' })).toHaveAttribute(
      'src',
      '/banner-login.png',
    )
    expect(screen.getByText('form content')).toBeInTheDocument()
  })
})
