'use client'

import styles from './SearchInput.module.scss'
import { useTextField } from '@react-aria/textfield'
import { useRef } from 'react'
import { Icons } from '@/components/ui/icons'

interface SearchInputProps {
  placeholder?: string
}

export const SearchInput = (props: SearchInputProps) => {
  const ref = useRef(null)
  const { inputProps } = useTextField(props, ref)
  console.log(inputProps)
  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <Icons.Search />
      </div>

      <input {...inputProps} className={styles.input} />
    </div>
  )
}
