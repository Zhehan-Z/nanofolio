// Get random unique indices
export function getRandomIndices(total: number, count: number): number[] {
  if (count > total) {
    throw new Error('Cannot select more items than available');
  }
  const indices = Array.from({ length: total }, (_, i) => i);
  return shuffleArray(indices).slice(0, count);
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get next available unique index
export function getNextUniqueIndex(current: number, usedIndices: number[], total: number): number {
  let nextIndex = (current + 1) % total;
  while (usedIndices.includes(nextIndex)) {
    nextIndex = (nextIndex + 1) % total;
  }
  return nextIndex;
}

// Format photo source URL
export function formatPhotoSrc(index: number): string {
  return `/photos/home/photo-${index + 1}.jpeg`;
}

// Format photo alt text
export function formatPhotoAlt(index: number): string {
  return `Photo ${index + 1}`;
}