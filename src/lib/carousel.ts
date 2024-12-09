import type { CarouselState, CarouselOptions } from './types';
import { getRandomIndices, getNextUniqueIndex, formatPhotoSrc, formatPhotoAlt } from './photoUtils';

const DEFAULT_OPTIONS: CarouselOptions = {
  interval: 5000,
  transitionDuration: 500
};

export function initializeCarousel(
  element: HTMLElement, 
  totalPhotos: number,
  options: CarouselOptions = {}
) {
  const { interval, transitionDuration } = { ...DEFAULT_OPTIONS, ...options };
  
  // Initialize with random unique photos
  const state: CarouselState = {
    currentIndices: getRandomIndices(totalPhotos, 3),
    transitioning: false
  };

  const containers = element.querySelectorAll('[data-photo-index]');
  
  // Update a single photo with transition
  async function updatePhoto(containerIndex: number) {
    if (state.transitioning) return;
    state.transitioning = true;

    const container = containers[containerIndex];
    const img = container.querySelector('img');
    if (!img) return;

    // Start transition
    img.style.opacity = '0';
    
    // Wait for fade out
    await new Promise(resolve => setTimeout(resolve, transitionDuration / 2));
    
    // Get next unique index
    const otherIndices = state.currentIndices.filter((_, i) => i !== containerIndex);
    const nextIndex = getNextUniqueIndex(
      state.currentIndices[containerIndex],
      otherIndices,
      totalPhotos
    );
    
    // Update state and image
    state.currentIndices[containerIndex] = nextIndex;
    img.src = formatPhotoSrc(nextIndex);
    img.alt = formatPhotoAlt(nextIndex);
    
    // Trigger reflow
    void img.offsetHeight;
    
    // Fade in
    img.style.opacity = '1';
    
    // Wait for fade in
    await new Promise(resolve => setTimeout(resolve, transitionDuration / 2));
    state.transitioning = false;
  }

  // Rotate through photos one at a time
  let currentContainer = 0;
  const rotationInterval = setInterval(() => {
    updatePhoto(currentContainer);
    currentContainer = (currentContainer + 1) % containers.length;
  }, interval);

  // Initial setup
  containers.forEach((container, i) => {
    const img = container.querySelector('img');
    if (img) {
      img.src = formatPhotoSrc(state.currentIndices[i]);
      img.alt = formatPhotoAlt(state.currentIndices[i]);
      img.style.transition = `opacity ${transitionDuration}ms ease-in-out`;
    }
  });

  return rotationInterval;
}