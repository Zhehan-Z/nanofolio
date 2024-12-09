import { languages } from '../i18n/config';
import { normalizeLanguage } from './language';
import { DEFAULT_LOCALE, PUBLIC_PATHS } from './constants';

export function isPublicPath(path: string): boolean {
  if (path.startsWith('/fonts/')) return true;
  if (path.match(/\.(ico|png|jpg|jpeg|svg|css|js|json|txt|xml)$/)) return true;
  if (path.startsWith('/api/')) return true;
  return PUBLIC_PATHS.has(path);
}

export function getPathSegments(pathname: string): { firstSegment: string; remainingPath: string } {
  const [, firstSegment = '', ...rest] = pathname.split('/');
  return {
    firstSegment,
    remainingPath: rest.join('/')
  };
}

export function detectPreferredLanguage(): string {
  try {
    // Check localStorage first
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && languages[storedLang]) {
      return storedLang;
    }

    // Check browser language
    const browserLang = navigator.language;
    const normalized = normalizeLanguage(browserLang);
    if (languages[normalized]) {
      return normalized;
    }

    // Handle Chinese variants
    if (browserLang.startsWith('zh')) {
      return 'zh-CN';
    }

    // Handle English variants
    if (browserLang.startsWith('en')) {
      return 'en';
    }

    return DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function hasValidLanguagePrefix(path: string): boolean {
  return /^\/(?:en|zh-CN)(?:\/|$)/.test(path);
}

export function cleanPath(path: string): string {
  // Remove any existing language prefix and clean up slashes
  return path
    .replace(/^\/(?:en|zh-CN)/, '') // Remove language prefix
    .replace(/^\/+/, '')            // Remove leading slashes
    .replace(/\/+$/, '')            // Remove trailing slashes
    .replace(/\/+/g, '/');          // Replace multiple slashes with single slash
}

export function getLanguagePrefixedPath(path: string, lang?: string): string {
  // Return as-is for public paths
  if (isPublicPath(path)) {
    return path;
  }
  
  // Clean the path first
  const cleaned = cleanPath(path);
  
  // Use provided lang or detect preferred language
  const targetLang = lang || detectPreferredLanguage();
  
  // Construct the new path
  return `/${targetLang}${cleaned ? `/${cleaned}` : ''}`;
}

// Function to handle initial routing
export function handleInitialRouting(): void {
  const path = window.location.pathname;
  
  // Skip for public paths
  if (isPublicPath(path)) {
    return;
  }

  // Check if path starts with a valid language prefix
  if (!hasValidLanguagePrefix(path)) {
    const newPath = getLanguagePrefixedPath(path);
    window.location.replace(newPath);
  }
}