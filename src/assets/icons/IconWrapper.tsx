import * as React from 'react'

export type IconProps = {
  color?: string
  size?: number
  autoSize?: boolean
  svgProps?: React.SVGProps<SVGSVGElement>
} & Omit<React.HTMLProps<HTMLSpanElement>, 'color' | 'size'>

export const IconWrapper: React.FC<{ icon: React.ReactNode } & IconProps> = ({
  icon,
  color: colorProp,
  size: sizeProp,
  ...restProps
}) => {
  const color = colorProp ? colorProp : 'var(--color-light-100)'
  const size = sizeProp ? `${sizeProp}px` : '24px'

  return (
    <span
      role="img"
      aria-hidden="true"
      style={{
        color: color,
        width: size,
        height: size,
        display: 'inline-flex',
        fontSize: 'inherit',
      }}
      {...restProps}
    >
      {icon}
    </span>
  )
}
