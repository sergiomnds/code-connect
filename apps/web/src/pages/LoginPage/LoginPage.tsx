import { AuthTemplate } from '../../components/templates/AuthTemplate'
import { LoginForm, type LoginFormValues } from '../../components/organisms/LoginForm'

const socialProviders = [
  { name: 'Github', iconSrc: '/github.png' },
  { name: 'Gmail', iconSrc: '/gmail.png' },
]

export function LoginPage() {
  function handleSubmit(values: LoginFormValues) {
    console.log('login submit', values)
  }

  return (
    <AuthTemplate banner={{ src: '/banner-login.png', alt: 'Code Connect', width: 407, height: 636 }}>
      <LoginForm onSubmit={handleSubmit} socialProviders={socialProviders} />
    </AuthTemplate>
  )
}
