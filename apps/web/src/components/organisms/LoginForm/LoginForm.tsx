import { type FormEvent, useState } from 'react'
import { Button } from '../../atoms/Button'
import { Icon } from '../../atoms/Icon'
import { AuthPrompt } from '../../molecules/AuthPrompt'
import { Divider } from '../../molecules/Divider'
import { FormField } from '../../molecules/FormField'
import { FormOptionsRow } from '../../molecules/FormOptionsRow'
import { SocialLoginList, type SocialProvider } from '../../molecules/SocialLoginList'

export interface LoginFormValues {
  identifier: string
  password: string
  remember: boolean
}

export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void
  socialProviders: SocialProvider[]
}

interface FormErrors {
  identifier?: string
  password?: string
}

function validate(values: LoginFormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.identifier.trim()) {
    errors.identifier = 'Informe seu email ou usuário.'
  } else if (values.identifier.includes('@') && !/^\S+@\S+\.\S+$/.test(values.identifier)) {
    errors.identifier = 'Informe um email válido.'
  }

  if (!values.password.trim()) {
    errors.password = 'Informe sua senha.'
  }

  return errors
}

export function LoginForm({ onSubmit, socialProviders }: LoginFormProps) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState<FormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values: LoginFormValues = { identifier, password, remember }
    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6" noValidate>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold leading-normal text-muted">Login</h1>
        <p className="text-xl leading-normal text-muted">Boas-vindas! Faça seu login.</p>
      </div>

      <div className="flex flex-col gap-4">
        <FormField
          label="Email ou usuário"
          placeholder="usuario123"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          error={errors.identifier}
        />
        <FormField
          label="Senha"
          type="password"
          placeholder="******"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
      </div>

      <FormOptionsRow
        checkboxProps={{
          id: 'remember',
          label: 'Lembrar-me',
          checked: remember,
          onChange: (event) => setRemember(event.target.checked),
        }}
        linkLabel="Esqueci a senha"
        linkProps={{ to: '/esqueci-senha', underline: true }}
      />

      <Button type="submit" icon={<Icon name="arrow_forward" />}>
        Login
      </Button>

      <Divider>ou entre com outras contas</Divider>

      <SocialLoginList providers={socialProviders} />

      <AuthPrompt
        question="Ainda não tem conta?"
        actionLabel="Crie seu cadastro!"
        to="/cadastro"
        icon={<Icon name="assignment" />}
      />
    </form>
  )
}
