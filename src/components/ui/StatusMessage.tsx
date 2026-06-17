import styles from './StatusMessage.module.scss'

interface StatusMessageProps {
  title: string
  message: string
  tone?: 'neutral' | 'error'
}

export function StatusMessage({ title, message, tone = 'neutral' }: StatusMessageProps) {
  return (
    <div
      className={`${styles.message} ${styles[tone]}`}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      <strong>{title}</strong>
      <span>{message}</span>
    </div>
  )
}
