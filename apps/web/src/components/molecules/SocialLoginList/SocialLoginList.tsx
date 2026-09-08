export interface SocialProvider {
  name: string
  iconSrc: string
  onClick?: () => void
}

export interface SocialLoginListProps {
  providers: SocialProvider[]
}

export function SocialLoginList({ providers }: SocialLoginListProps) {
  return (
    <div className="flex items-center justify-center gap-8">
      {providers.map((provider) => (
        <button
          key={provider.name}
          type="button"
          onClick={provider.onClick}
          className="flex flex-col items-center gap-1 text-sm text-muted outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <img src={provider.iconSrc} alt={provider.name} className="h-8 w-8" />
          {provider.name}
        </button>
      ))}
    </div>
  )
}
