import styles from './Hero.module.scss'

export function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.kicker}>Movie discovery, randomized</div>
      <h1>CineSpin</h1>
      <p className={styles.subtitle}>Let fate choose your next movie.</p>
      <p className={styles.description}>
        Pick a year and CineSpin searches TMDB for movies from that year to today. It rolls
        through real result pages and hands you one polished recommendation instead of another
        endless scroll.
      </p>
    </header>
  )
}
