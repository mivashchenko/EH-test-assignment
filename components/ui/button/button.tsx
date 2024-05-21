import React, { ReactNode } from 'react'
import styles from './Button.module.scss'
import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'contained' | 'outlined'
  size?: 'small' | 'large'
  active?: boolean
}
const Button = ({
  children,
  variant = 'contained',
  size = 'large',
  active,
  ...props
}: ButtonProps) => {
  const variantClassName = {
    contained: styles.contained,
    outlined: styles.outlined,
  }[variant]

  const sizeClassName = {
    small: styles.small,
    large: styles.large,
  }[size]

  return (
    <button
      className={clsx(
        styles.button,
        variantClassName,
        sizeClassName,
        active && styles.active
      )}
      {...props}
    >
      {children}
    </button>
  )
}

interface ButtonGroupProps {
  children: ReactNode
  variant?: 'contained' | 'outlined'
  size: 'large' | 'small'
}

const ButtonGroup = ({
  children,
  variant = 'contained',
  size = 'large',
}: ButtonGroupProps) => {
  const sizeClassName = {
    small: styles.small,
    large: styles.large,
  }[size]

  return (
    <div
      className={clsx(styles.buttonGroup, {
        [styles.contained]: variant === 'contained',
        [styles.outlined]: variant === 'outlined',
      })}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { variant, size } as ButtonProps)
        }
        return child
      })}
    </div>
  )
}

export { Button, ButtonGroup }
