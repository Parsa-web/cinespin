import type { PropsWithChildren } from 'react'
import styles from './Section.module.scss'

interface SectionProps extends PropsWithChildren {
  id?: string
  className?: string
  ariaLabelledBy?: string
}

export function Section({ id, className, ariaLabelledBy, children }: SectionProps) {
  const classNames = [styles.section, className].filter(Boolean).join(' ')

  return (
    <section id={id} className={classNames} aria-labelledby={ariaLabelledBy}>
      {children}
    </section>
  )
}
