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
    <div className="flex items-center justify-center gap-6">
      {providers.map((provider) => (
        <button
          key={provider.name}
          type="button"
          onClick={provider.onClick}
          className="flex flex-col items-center gap-1 text-xs leading-normal text-muted outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <img
            src={provider.iconSrc}
            alt={provider.name}
            width={32}
            height={32}
            loading="lazy"
            className="h-8 w-8 object-contain"
          />
          {provider.name}
        </button>
      ))}
    </div>
  )
}
