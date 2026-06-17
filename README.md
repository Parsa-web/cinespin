# CineSpin

Let fate choose your next movie.

CineSpin is a responsive React + TypeScript movie discovery app. Users choose a genre,
release year, and minimum rating, then the app uses TMDB discovery results to select a
genuinely random movie page and movie. The recommendation is enriched with movie details
and the first five cast members.

## Tech Stack

- React 19
- TypeScript
- Vite
- Axios
- SCSS Modules
- ESLint
- Prettier

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Lint the project:

```bash
npm run lint
```

Format files:

```bash
npm run format
```

## Environment

The app reads the TMDB key from `.env` locally and from the GitHub Actions
deployment environment in CI:

```env
VITE_TMDB_API_KEY=0876fdb99803f2843203ed1e84f812a3
```

API keys are accessed only through `import.meta.env` inside the service layer.

## Architecture

- `src/services/tmdb.ts` contains all TMDB API calls.
- `src/hooks/useMovieDiscovery.ts` owns loading, error, genre, and spin state.
- `src/types/tmdb.ts` defines strict TMDB and app interfaces.
- `src/components/ui` contains reusable controls.
- `src/components/filters` contains filter-specific UI.
- `src/components/movie` contains the recommendation card.
- `src/components/layout` contains page layout primitives and the hero.
- `src/styles` contains global reset/theme variables.

## Discovery Flow

1. Load TMDB genres.
2. User selects filters.
3. Fetch the first discover page to get available result counts.
4. Pick a random page from the available TMDB page range.
5. Pick a random movie from that page.
6. Fetch movie details and credits.
7. Render the final recommendation card.
