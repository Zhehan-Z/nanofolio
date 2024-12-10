import type { CarouselState, CarouselOptions } from './types';
import { getRandomIndices, getNextUniqueIndex, formatPhotoSrc, formatPhotoAlt } from './photoUtils';

const DEFAULT_OPTIONS: CarouselOptions = {
  interval: 5000,
  transitionDuration: 500
};

// Preload an image and return a promise
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

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
  
  // Preload next batch of images
  async function preloadNextImages(currentIndex: number): Promise<number> {
    const otherIndices = state.currentIndices.filter((_, i) => i !== currentIndex);
    const nextIndex = getNextUniqueIndex(
      state.currentIndices[currentIndex],
      otherIndices,
      totalPhotos
    );
    
    try {
      await preloadImage(formatPhotoSrc(nextIndex));
      return nextIndex;
    } catch (error) {
      console.error('Failed to preload image:', error);
      return nextIndex; // Continue with the index even if preload fails
    }
  }

  // Update a single photo with transition
  async function updatePhoto(containerIndex: number) {
    if (state.transitioning) return;
    state.transitioning = true;

    const container = containers[containerIndex];
    const img = container.querySelector('img');
    if (!img) return;

    try {
      // Preload next image before starting transition
      const nextIndex = await preloadNextImages(containerIndex);
      
      // Start fade out
      img.style.opacity = '0';
      
      // Wait for fade out
      await new Promise(resolve => setTimeout(resolve, transitionDuration / 2));
      
      // Update image source and state
      state.currentIndices[containerIndex] = nextIndex;
      img.src = formatPhotoSrc(nextIndex);
      img.alt = formatPhotoAlt(nextIndex);
      
      // Force browser reflow
      void img.offsetHeight;
      
      // Start fade in
      img.style.opacity = '1';
      
      // Wait for fade in to complete
      await new Promise(resolve => setTimeout(resolve, transitionDuration / 2));
    } catch (error) {
      console.error('Error updating photo:', error);
    } finally {
      state.transitioning = false;
    }
  }

  // Rotate through photos one at a time
  let currentContainer = 0;
  const rotationInterval = setInterval(() => {
    updatePhoto(currentContainer);
    currentContainer = (currentContainer + 1) % containers.length;
  }, interval);

  // Initial setup with preloading
  (async () => {
    // Preload initial images
    const initialLoadPromises = state.currentIndices.map(index => 
      preloadImage(formatPhotoSrc(index))
    );

    try {
      await Promise.all(initialLoadPromises);
      
      // Set initial images after preload
      containers.forEach((container, i) => {
        const img = container.querySelector('img');
        if (img) {
          img.src = formatPhotoSrc(state.currentIndices[i]);
          img.alt = formatPhotoAlt(state.currentIndices[i]);
          img.style.transition = `opacity ${transitionDuration}ms ease-in-out`;
          img.style.opacity = '1';
        }
      });
    } catch (error) {
      console.error('Error during initial image load:', error);
    }
  })();

  return rotationInterval;
}