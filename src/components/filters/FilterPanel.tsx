import { useMemo, useState } from 'react'
import type { Genre, MovieFilters } from '../../types/tmdb'
import { Button } from '../ui/Button'
import { Select } from '../ui/Select'
import { Spinner } from '../ui/Spinner'
import styles from './FilterPanel.module.scss'

interface FilterPanelProps {
  genres: Genre[]
  isLoadingGenres: boolean
  isSpinning: boolean
  onSpin: (filters: MovieFilters) => Promise<void>
}

const ratingOptions = Array.from({ length: 10 }, (_, i) => String(5 + i * 0.5))

export function FilterPanel({
  genres,
  isLoadingGenres,
  isSpinning,
  onSpin,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<MovieFilters>({
    genreId: '',
    year: '',
    minimumRating: '6',
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
          id="genre"
          label="Genre"
          value={filters.genreId}
          disabled={isLoadingGenres || isSpinning}
          onChange={(event) => updateFilter('genreId', event.target.value)}
        >
          <option value="">Any genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Select>

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

        <Select
          id="minimum-rating"
          label="Minimum rating"
          value={filters.minimumRating}
          disabled={isSpinning}
          onChange={(event) => updateFilter('minimumRating', event.target.value)}
        >
          {ratingOptions.map((rating) => (
            <option key={rating} value={rating}>
              {rating}+ / 10
            </option>
          ))}
        </Select>
      </div>

      <Button
        className={styles.spinButton}
        type="submit"
        disabled={isSpinning || isLoadingGenres}
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
