import { languages } from '../i18n/config';
import { normalizeLanguage } from './language';
import { DEFAULT_LOCALE, PUBLIC_PATHS } from './constants';

export function isPublicPath(path: string): boolean {
  if (path.startsWith('/fonts/')) return true;
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
    if (storedLang && storedLang in languages) {
      return storedLang;
    }

    // Fallback to browser language
    const browserLang = navigator.language;
    const normalized = normalizeLanguage(browserLang);
    if (normalized in languages) {
      return normalized;
    }

    // Check language without region code
    const base = browserLang.split('-')[0];
    if (base === 'zh') {
      return 'zh-CN';
    }

    return DEFAULT_LOCALE;
  } catch (error) {
    console.warn('Error detecting preferred language:', error);
    return DEFAULT_LOCALE;
  }
}

export function handleLanguageRouting() {
  // Skip for public paths
  if (isPublicPath(window.location.pathname)) {
    return;
  }

  const { firstSegment, remainingPath } = getPathSegments(window.location.pathname);

  // Handle root path
  if (!firstSegment) {
    const preferredLang = detectPreferredLanguage();
    window.location.pathname = `/${preferredLang}`;
    return;
  }

  // Check if first segment is a valid language code
  const normalizedLang = normalizeLanguage(firstSegment);
  if (normalizedLang in languages) {
    return;
  }

  // If first segment is not a language code, redirect to preferred language
  const preferredLang = detectPreferredLanguage();
  window.location.pathname = `/${preferredLang}/${firstSegment}${remainingPath ? `/${remainingPath}` : ''}`;
}