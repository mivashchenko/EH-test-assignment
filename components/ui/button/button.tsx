import React, { ReactNode } from 'react'
import styles from './style.module.scss'
import { clsx } from 'clsx'

interface ButtonProps {
  children: ReactNode
  variant: 'contained' | 'outlined'
}
const Button = ({ children, variant = 'contained', ...props }: ButtonProps) => {
  const variantClassName = {
    contained: styles.contained,
    outlined: styles.outlined,
  }[variant]

  return (
    <button className={clsx(styles.button, variantClassName)} {...props}>
      {children}
    </button>
  )
}

export default Button
