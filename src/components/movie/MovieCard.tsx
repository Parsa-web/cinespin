import type { MovieRecommendation } from '../../types/tmdb'
import { getPosterUrl } from '../../utils/tmdbImages'
import styles from './MovieCard.module.scss'

interface MovieCardProps {
  recommendation: MovieRecommendation
}

function getReleaseYear(releaseDate: string): string {
  return releaseDate ? releaseDate.slice(0, 4) : 'Unknown year'
}

export function MovieCard({ recommendation }: MovieCardProps) {
  const { details, cast } = recommendation
  const posterUrl = getPosterUrl(details.poster_path)
  const rating = details.vote_average.toFixed(1)

  return (
    <article className={styles.card} aria-labelledby="movie-title">
      <div className={styles.posterShell}>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${details.title} poster`}
            className={styles.poster}
          />
        ) : (
          <div className={styles.posterFallback} aria-label="No poster available">
            No poster
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Tonight's pick</p>
            <h2 id="movie-title">{details.title}</h2>
          </div>
          <div className={styles.rating} aria-label={`Rating ${rating} out of 10`}>
            {rating}
          </div>
        </div>

        <div className={styles.meta}>
          <span>{getReleaseYear(details.release_date)}</span>
          {details.runtime ? <span>{details.runtime} min</span> : null}
        </div>

        <ul className={styles.genres} aria-label="Genres">
          {details.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>

        <p className={styles.overview}>
          {details.overview || 'TMDB does not have an overview for this movie yet.'}
        </p>

        <div className={styles.castBlock}>
          <h3>Featured cast</h3>
          {cast.length > 0 ? (
            <ul className={styles.cast}>
              {cast.map((member) => (
                <li key={`${member.id}-${member.order}`}>
                  <span>{member.name}</span>
                  {member.character ? <small>{member.character}</small> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noCast}>Cast information is not available.</p>
          )}
        </div>
      </div>
    </article>
  )
}
