import { AuthTemplate } from '../../components/templates/AuthTemplate'
import { AuthPrompt } from '../../components/molecules/AuthPrompt'

export function SignUpPage() {
  return (
    <AuthTemplate banner={{ src: '/banner-login.png', alt: 'Code Connect' }}>
      <div className="flex w-full flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Cadastro</h1>
          <p className="mt-2 text-muted">Em breve você poderá criar sua conta por aqui.</p>
        </div>
        <AuthPrompt question="Já tem uma conta?" actionLabel="Faça login!" to="/login" />
      </div>
    </AuthTemplate>
  )
}
