import { clsx } from 'clsx'

import styles from './style.module.scss'
interface DividerProps {
  direction: 'horizontal' | 'vertical'
}

export const Divider = ({ direction }: DividerProps) => {
  const directionClass: string = {
    horizontal: styles.horizontal,
    vertical: styles.vertical,
  }[direction]

  return <hr className={clsx(styles.root, directionClass)} />
}
