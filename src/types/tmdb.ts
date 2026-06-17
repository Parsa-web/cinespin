export interface Genre {
  id: number
  name: string
}

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export interface MovieDetails {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  vote_average: number
  genres: Genre[]
  runtime: number | null
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface DiscoverMovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface MovieCreditsResponse {
  id: number
  cast: CastMember[]
}

export interface GenresResponse {
  genres: Genre[]
}

export interface TMDBError {
  status_code: number
  status_message: string
  success: boolean
}

export interface MovieRecommendation {
  details: MovieDetails
  cast: CastMember[]
}

export interface MovieFilters {
  genreId: string
  year: string
  minimumRating: string
}
