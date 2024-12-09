import { languages } from '../i18n/config';
import { normalizeLanguage } from './language';
import { DEFAULT_LOCALE, PUBLIC_PATHS } from './constants';
import type { Headers } from 'node-fetch';

export function detectPreferredLanguage(headers?: Headers): string {
  try {
    // First check localStorage if we're in the browser
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('preferredLanguage');
      if (storedLang && storedLang in languages) {
        return storedLang;
      }
    }

    // Check Accept-Language header
    const acceptLang = headers?.get('accept-language');
    if (acceptLang) {
      // Parse the Accept-Language header with quality values
      const langs = acceptLang.split(',')
        .map(lang => {
          const [l, q = '1'] = lang.split(';q=');
          return {
            lang: l.trim(),
            q: parseFloat(q)
          };
        })
        .sort((a, b) => b.q - a.q); // Sort by quality value

      // Try to find a matching language
      for (const { lang } of langs) {
        const normalized = normalizeLanguage(lang);
        if (normalized in languages) {
          return normalized;
        }

        // Check language without region code
        const base = lang.split('-')[0];
        if (base === 'zh') {
          return 'zh-CN';
        }
      }
    }

    return DEFAULT_LOCALE;
  } catch (error) {
    console.warn('Error detecting preferred language:', error);
    return DEFAULT_LOCALE;
  }
}

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