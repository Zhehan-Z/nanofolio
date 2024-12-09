// Save scroll position before navigation
export function saveScrollPosition() {
  if (typeof window === 'undefined') return;
  
  // Save both the scroll position and the current URL
  const scrollData = {
    position: window.scrollY,
    url: window.location.pathname
  };
  sessionStorage.setItem('scrollPosition', JSON.stringify(scrollData));
}

// Restore scroll position after navigation
export function restoreScrollPosition() {
  if (typeof window === 'undefined') return;
  
  try {
    const scrollDataStr = sessionStorage.getItem('scrollPosition');
    if (!scrollDataStr) return;

    const scrollData = JSON.parse(scrollDataStr);
    const currentPath = window.location.pathname;
    
    // Get the path without the language prefix for comparison
    const currentPathNoLang = currentPath.split('/').slice(2).join('/');
    const savedPathNoLang = scrollData.url.split('/').slice(2).join('/');
    
    // Only restore if we're on the same page (ignoring language prefix)
    if (currentPathNoLang === savedPathNoLang) {
      window.scrollTo(0, scrollData.position);
    }
    
    // Clear the saved position after restoration
    sessionStorage.removeItem('scrollPosition');
  } catch (error) {
    console.warn('Error restoring scroll position:', error);
    sessionStorage.removeItem('scrollPosition');
  }
}

// Save entry index for academic section
export function saveEntryIndex(index: number) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('scrollToEntry', index.toString());
}

// Get saved entry index
export function getSavedEntryIndex(): number | null {
  if (typeof window === 'undefined') return null;
  const index = sessionStorage.getItem('scrollToEntry');
  return index ? parseInt(index) : null;
}