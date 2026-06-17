import { FilterPanel } from '../components/filters/FilterPanel'
import { Container } from '../components/layout/Container'
import { Hero } from '../components/layout/Hero'
import { Section } from '../components/layout/Section'
import { MovieCard } from '../components/movie/MovieCard'
import { StatusMessage } from '../components/ui/StatusMessage'
import { useMovieDiscovery } from '../hooks/useMovieDiscovery'
import styles from './HomePage.module.scss'

export function HomePage() {
  const { recommendation, isSpinning, error, spin } =
    useMovieDiscovery()

  return (
    <main className={styles.page}>
      <Container>
        <Hero />

        <Section ariaLabelledBy="filters-heading" className={styles.filterSection}>
          <div className={styles.sectionHeader}>
            <h2 id="filters-heading">Set the rules</h2>
            <p>Keep it broad for surprise, or narrow the field for the exact mood.</p>
          </div>
          <FilterPanel
            isSpinning={isSpinning}
            onSpin={spin}
          />
        </Section>

        <Section ariaLabelledBy="result-heading" className={styles.resultSection}>
          <div className={styles.sectionHeader}>
            <h2 id="result-heading">Your result</h2>
          </div>

          {error ? (
            <StatusMessage title="Spin interrupted" message={error} tone="error" />
          ) : null}

          {recommendation ? (
            <MovieCard recommendation={recommendation} />
          ) : (
            <StatusMessage
              title="Ready when you are"
              message="Choose your filters and spin to get a random movie recommendation."
            />
          )}
        </Section>
      </Container>
    </main>
  )
}
