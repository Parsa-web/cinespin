import { useCallback, useState } from 'react'
import {
  discoverMovies,
  getMovieCredits,
  getMovieDetails,
} from '../services/tmdb'
import type { MovieFilters, MovieRecommendation } from '../types/tmdb'
import { pickRandomItem, randomInteger } from '../utils/random'

const TMDB_MAX_PAGE = 500

interface MovieDiscoveryState {
  recommendation: MovieRecommendation | null
  isSpinning: boolean
  error: string | null
}

interface MovieDiscoveryActions {
  spin: (filters: MovieFilters) => Promise<void>
  clearError: () => void
}

export function useMovieDiscovery(): MovieDiscoveryState & MovieDiscoveryActions {
  const [recommendation, setRecommendation] = useState<MovieRecommendation | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const spin = useCallback(async (filters: MovieFilters) => {
    setIsSpinning(true)
    setError(null)

    try {
      const firstPage = await discoverMovies(filters, 1)

      if (firstPage.total_results === 0 || firstPage.results.length === 0) {
        setRecommendation(null)
        setError('No movies matched those filters. Try widening the search a little.')
        return
      }

      const pageLimit = Math.min(firstPage.total_pages, TMDB_MAX_PAGE)
      const randomPageNumber = randomInteger(1, pageLimit)
      const randomPage =
        randomPageNumber === 1
          ? firstPage
          : await discoverMovies(filters, randomPageNumber)

      const movie = pickRandomItem(randomPage.results)

      if (!movie) {
        setRecommendation(null)
        setError('TMDB returned an empty page. Please spin again.')
        return
      }

      const [details, credits] = await Promise.all([
        getMovieDetails(movie.id),
        getMovieCredits(movie.id),
      ])

      setRecommendation({
        details,
        cast: credits.cast.slice(0, 5),
      })
    } catch (spinError) {
      setRecommendation(null)
      setError(
        spinError instanceof Error
          ? spinError.message
          : 'The spin failed. Please try again in a moment.',
      )
    } finally {
      setIsSpinning(false)
    }
  }, [])

  return {
    recommendation,
    isSpinning,
    error,
    spin,
    clearError,
  }
}
