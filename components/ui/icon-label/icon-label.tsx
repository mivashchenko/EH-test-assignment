import { ReactNode } from 'react'
import styles from '@/components/ui/icon-label/style.module.scss'
import { clsx } from 'clsx'

interface IconLabelProps {
  icon?: ReactNode
  value?: string
  background?: 'grey' | 'white' | 'transparent'
}
export const IconLabel = ({
  icon,
  value,
  background = 'transparent',
}: IconLabelProps) => {
  const backgroundClass: string = {
    grey: styles.bg_grey,
    white: styles.bg_white,
    transparent: styles.bg_transparent,
  }[background]

  return (
    <div className={clsx(styles.root, backgroundClass)}>
      {icon}
      <span>{value}</span>
    </div>
  )
}
