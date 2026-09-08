import { type FormEvent, useState } from 'react'
import { Button } from '../../atoms/Button'
import { Icon } from '../../atoms/Icon'
import { AuthPrompt } from '../../molecules/AuthPrompt'
import { Divider } from '../../molecules/Divider'
import { FormField } from '../../molecules/FormField'
import { FormOptionsRow } from '../../molecules/FormOptionsRow'
import { SocialLoginList, type SocialProvider } from '../../molecules/SocialLoginList'

export interface SignUpFormValues {
  name: string
  email: string
  password: string
  remember: boolean
}

export interface SignUpFormProps {
  onSubmit: (values: SignUpFormValues) => void
  socialProviders: SocialProvider[]
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
}

const MIN_PASSWORD_LENGTH = 6

function validate(values: SignUpFormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Informe seu nome completo.'
  }

  if (!values.email.trim()) {
    errors.email = 'Informe seu email.'
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Informe um email válido.'
  }

  if (!values.password.trim()) {
    errors.password = 'Informe uma senha.'
  } else if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `A senha deve ter ao menos ${MIN_PASSWORD_LENGTH} caracteres.`
  }

  return errors
}

export function SignUpForm({ onSubmit, socialProviders }: SignUpFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState<FormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values: SignUpFormValues = { name, email, password, remember }
    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6" noValidate>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold leading-normal text-muted">Cadastro</h1>
        <p className="text-xl leading-normal text-muted">Olá! Preencha seus dados.</p>
      </div>

      <div className="flex flex-col gap-4">
        <FormField
          label="Nome"
          placeholder="Nome completo"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
        />
        <FormField
          label="Email"
          type="email"
          placeholder="Digite seu email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />
        <FormField
          label="Senha"
          type="password"
          placeholder="******"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
        <FormOptionsRow
          checkboxProps={{
            id: 'sign-up-remember',
            label: 'Lembrar-me',
            checked: remember,
            onChange: (event) => setRemember(event.target.checked),
          }}
        />
      </div>

      <Button type="submit" icon={<Icon name="arrow_forward" />}>
        Cadastrar
      </Button>

      <Divider>ou entre com outras contas</Divider>

      <SocialLoginList providers={socialProviders} />

      <AuthPrompt
        question="Já tem conta?"
        actionLabel="Faça seu login!"
        to="/login"
        layout="inline"
        icon={<Icon name="login" />}
      />
    </form>
  )
}
