const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export function getPosterUrl(path: string | null, size = 'w500'): string | null {
  if (!path) {
    return null
  }

  return `${IMAGE_BASE_URL}/${size}${path}`
}
