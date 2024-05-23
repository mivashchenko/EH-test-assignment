import { ReactNode } from 'react'
import styles from '@/components/ui/icon-label/IconLabel.module.scss'
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
  const backgroundClass: string | undefined =
    background &&
    {
      grey: styles.bgGrey,
      white: styles.bgWhite,
      transparent: styles.bgTransparent,
    }[background]

  return (
    <div className={clsx(styles.root, backgroundClass)}>
      {icon}
      <span>{value}</span>
    </div>
  )
}
