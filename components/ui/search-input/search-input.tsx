'use client'

import styles from './SearchInput.module.scss'
import { useTextField } from '@react-aria/textfield'
import { useEffect, useRef, useState } from 'react'
import { Icons } from '@/components/ui/icons'
import { AriaTextFieldProps } from 'react-aria'
import { useDebounce } from 'use-debounce'

export const SearchInput = (props: AriaTextFieldProps) => {
  const ref = useRef(null)

  const [inputValue, setInputValue] = useState<string | undefined>('')
  const [debouncedValue] = useDebounce(inputValue, 500)

  const handleChange = (value: string) => {
    setInputValue(value)
  }

  const { inputProps } = useTextField(
    {
      label: 'search properties',
      ...props,
      onChange: handleChange,
      value: inputValue,
    },
    ref
  )

  useEffect(() => {
    if (!props.onChange) return
    props.onChange(debouncedValue as string)
  }, [debouncedValue])

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <Icons.Search />
      </div>

      <input {...inputProps} className={styles.input} />
    </div>
  )
}
