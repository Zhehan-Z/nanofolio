import { languages } from '../i18n/config';
import { normalizeLanguage } from './language';
import { DEFAULT_LOCALE, PUBLIC_PATHS } from './constants';

export function isPublicPath(path: string): boolean {
  if (path.startsWith('/fonts/')) return true;
  if (path.match(/\.(ico|png|jpg|jpeg|svg|css|js|json|txt|xml)$/)) return true;
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
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && storedLang in languages) {
      return storedLang;
    }

    const browserLang = navigator.language;
    const normalized = normalizeLanguage(browserLang);
    if (normalized in languages) {
      return normalized;
    }

    const base = browserLang.split('-')[0];
    if (base === 'zh') {
      return 'zh-CN';
    }

    return DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function hasValidLanguagePrefix(path: string): boolean {
  return /^\/(?:en|zh-CN)(?:\/|$)/.test(path);
}

export function getLanguagePrefixedPath(path: string, lang?: string): string {
  if (isPublicPath(path)) return path;
  
  // Remove any existing language prefix
  const cleanPath = path.replace(/^\/(?:en|zh-CN)/, '');
  
  // Use provided lang or detect preferred language
  const targetLang = lang || detectPreferredLanguage();
  
  // Ensure we don't duplicate the language prefix
  return `/${targetLang}${cleanPath}`.replace(/\/+/g, '/');
}