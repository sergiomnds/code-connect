import type { SVGAttributes } from 'react'

const paths = {
  arrow_forward: 'M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z',
  assignment:
    'M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z',
  login:
    'M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z',
} as const

export type IconName = keyof typeof paths

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  name: IconName
}

export function Icon({ name, className = '', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 -960 960 960"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  )
}
