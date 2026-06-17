import axios from 'axios'
import type {
  DiscoverMovieResponse,
  GenresResponse,
  MovieCreditsResponse,
  MovieDetails,
  MovieFilters,
  TMDBError,
} from '../types/tmdb'

const apiKey = import.meta.env.VITE_TMDB_API_KEY as string | undefined

const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: apiKey,
    language: 'en-US',
  },
  timeout: 12000,
})

export class TMDBServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TMDBServiceError'
  }
}

function getFriendlyError(error: unknown): string {
  if (axios.isAxiosError<TMDBError>(error)) {
    return (
      error.response?.data.status_message ??
      error.message ??
      'The movie service could not be reached.'
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Something unexpected happened while talking to TMDB.'
}

function ensureApiKey(): void {
  if (!apiKey) {
    throw new TMDBServiceError('TMDB API key is missing. Add VITE_TMDB_API_KEY to .env.')
  }
}

export async function getGenres(): Promise<GenresResponse> {
  ensureApiKey()

  try {
    const response = await tmdbClient.get<GenresResponse>('/genre/movie/list')
    return response.data
  } catch (error) {
    throw new TMDBServiceError(getFriendlyError(error))
  }
}

export async function discoverMovies(
  filters: MovieFilters,
  page = 1,
): Promise<DiscoverMovieResponse> {
  ensureApiKey()

  try {
    const response = await tmdbClient.get<DiscoverMovieResponse>('/discover/movie', {
      params: {
        page,
        sort_by: 'popularity.desc',
        include_adult: false,
        include_video: false,
        'vote_count.gte': 80,
        with_genres: filters.genreId || undefined,
        'primary_release_date.gte': filters.year ? `${filters.year}-01-01` : undefined,
        'primary_release_date.lte': filters.year ? `${new Date().getFullYear()}-12-31` : undefined,
        'vote_average.gte': filters.minimumRating || undefined,
      },
    })

    return response.data
  } catch (error) {
    throw new TMDBServiceError(getFriendlyError(error))
  }
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  ensureApiKey()

  try {
    const response = await tmdbClient.get<MovieDetails>(`/movie/${movieId}`)
    return response.data
  } catch (error) {
    throw new TMDBServiceError(getFriendlyError(error))
  }
}

export async function getMovieCredits(movieId: number): Promise<MovieCreditsResponse> {
  ensureApiKey()

  try {
    const response = await tmdbClient.get<MovieCreditsResponse>(
      `/movie/${movieId}/credits`,
    )
    return response.data
  } catch (error) {
    throw new TMDBServiceError(getFriendlyError(error))
  }
}
