'use client'
import { SearchIcon } from '@/components/ui/icons/icons'

import styles from './style.module.scss'
import { useTextField } from '@react-aria/textfield'
import { useRef } from 'react'

interface SearchInputProps {
  placeholder?: string
}

export const SearchInput = (props: SearchInputProps) => {
  let ref = useRef(null)
  let {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
  } = useTextField(props, ref)

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <SearchIcon />
      </div>

      <input {...inputProps} className={styles.input} />
    </div>
  )
}
