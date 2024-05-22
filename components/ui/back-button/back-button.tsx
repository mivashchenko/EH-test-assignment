import { Icons } from '../icons'
import styles from './BackButton.module.scss'
import { clsx } from 'clsx'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export const BackButton = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button {...props} className={clsx(styles.root, props.className)}>
      <Icons.BackButton />
    </button>
  )
}
