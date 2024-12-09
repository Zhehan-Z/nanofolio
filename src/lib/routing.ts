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
    if (storedLang && languages[normalizeLanguage(storedLang)]) {
      return normalizeLanguage(storedLang);
    }

    // Check browser language
    const browserLang = navigator.language;
    const normalized = normalizeLanguage(browserLang);
    if (languages[normalized]) {
      return normalized;
    }

    // Handle Chinese variants
    if (browserLang.toLowerCase().startsWith('zh')) {
      return 'zh-CN';
    }

    // Handle English variants
    if (browserLang.toLowerCase().startsWith('en')) {
      return 'en';
    }

    return DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function normalizeLanguageCode(lang: string): string {
  if (lang.toLowerCase() === 'zh-cn') return 'zh-CN';
  if (lang.toLowerCase() === 'en') return 'en';
  return lang;
}

export function hasValidLanguagePrefix(path: string): boolean {
  const match = path.match(/^\/([^/]+)/);
  if (!match) return false;
  const prefix = match[1].toLowerCase();
  return prefix === 'en' || prefix === 'zh-cn';
}

export function getPathWithoutLang(path: string): string {
  return path.replace(/^\/(?:en|zh-cn|zh-CN)(?:\/|$)/i, '/');
}

export function getLanguagePrefixedPath(path: string, lang?: string): string {
  // Return as-is for public paths
  if (isPublicPath(path)) {
    return path;
  }

  // Remove any existing language prefix
  const pathWithoutLang = getPathWithoutLang(path);
  
  // Use provided lang or detect preferred language
  let targetLang = lang || detectPreferredLanguage();
  targetLang = normalizeLanguageCode(targetLang);
  
  // Construct the new path, ensuring no double slashes
  return `/${targetLang}${pathWithoutLang}`.replace(/\/+/g, '/');
}

// Function to handle initial routing
export function handleInitialRouting(): void {
  const path = window.location.pathname;
  
  // Skip for public paths
  if (isPublicPath(path)) {
    return;
  }

  // If path has a valid language prefix but wrong case, normalize it
  if (hasValidLanguagePrefix(path)) {
    const [, lang, ...rest] = path.split('/');
    const normalizedLang = normalizeLanguageCode(lang);
    if (normalizedLang !== lang) {
      const newPath = `/${normalizedLang}/${rest.join('/')}`.replace(/\/+/g, '/');
      window.location.replace(newPath);
    }
    return;
  }

  // If path doesn't have a valid language prefix, add one
  const newPath = getLanguagePrefixedPath(path);
  if (newPath !== path) {
    window.location.replace(newPath);
  }
}