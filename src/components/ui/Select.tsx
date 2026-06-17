import type { SelectHTMLAttributes } from 'react'
import styles from './Select.module.scss'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  id: string
}

export function Select({ label, id, children, className, ...props }: SelectProps) {
  const classNames = [styles.field, className].filter(Boolean).join(' ')

  return (
    <label className={classNames} htmlFor={id}>
      <span>{label}</span>
      <select id={id} {...props}>
        {children}
      </select>
    </label>
  )
}
