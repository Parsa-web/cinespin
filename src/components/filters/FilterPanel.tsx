import { useMemo, useState } from 'react'
import type { MovieFilters } from '../../types/tmdb'
import { Button } from '../ui/Button'
import { Select } from '../ui/Select'
import { Spinner } from '../ui/Spinner'
import styles from './FilterPanel.module.scss'

interface FilterPanelProps {
  isSpinning: boolean
  onSpin: (filters: MovieFilters) => Promise<void>
}

export function FilterPanel({
  isSpinning,
  onSpin,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<MovieFilters>({
    year: '',
  })

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: currentYear - 1969 }, (_, index) =>
      String(currentYear - index),
    )
  }, [])

  function updateFilter(key: keyof MovieFilters, value: string): void {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    await onSpin(filters)
  }

  return (
    <form className={styles.panel} onSubmit={handleSubmit} aria-label="Movie filters">
      <div className={styles.controls}>
        <Select
          id="year"
          label="From year"
          value={filters.year}
          disabled={isSpinning}
          onChange={(event) => updateFilter('year', event.target.value)}
        >
          <option value="">Any year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </div>

      <Button
        className={styles.spinButton}
        type="submit"
        disabled={isSpinning}
      >
        {isSpinning ? (
          <>
            <Spinner />
            Spinning...
          </>
        ) : (
          '🎲 Spin'
        )}
      </Button>
    </form>
  )
}
