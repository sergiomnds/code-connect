import { AuthTemplate } from '../../components/templates/AuthTemplate'
import { SignUpForm, type SignUpFormValues } from '../../components/organisms/SignUpForm'

const socialProviders = [
  { name: 'Github', iconSrc: '/github.png' },
  { name: 'Gmail', iconSrc: '/gmail.png' },
]

export function SignUpPage() {
  function handleSubmit(values: SignUpFormValues) {
    console.log('sign up submit', values)
  }

  return (
    <AuthTemplate banner={{ src: '/banner-cadastro.png', alt: 'Code Connect', width: 407, height: 683 }}>
      <SignUpForm onSubmit={handleSubmit} socialProviders={socialProviders} />
    </AuthTemplate>
  )
}
