export function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function pickRandomItem<T>(items: T[]): T | null {
  if (items.length === 0) {
    return null
  }

  return items[randomInteger(0, items.length - 1)]
}
