import { clsx } from 'clsx'

import styles from './Divider.module.scss'
interface DividerProps {
  direction: 'horizontal' | 'vertical'
  className?: string
}

export const Divider = ({ direction, className }: DividerProps) => {
  const directionClass: string = {
    horizontal: styles.horizontal,
    vertical: styles.vertical,
  }[direction]

  return <hr className={clsx(styles.root, directionClass, className)} />
}
