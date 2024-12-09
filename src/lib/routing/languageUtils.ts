import { LANGUAGE_REDIRECTS, VALID_LANGUAGES } from './constants';

export function normalizeLanguageCode(lang: string): string {
  const normalized = lang.toLowerCase();
  return LANGUAGE_REDIRECTS[normalized] || VALID_LANGUAGES[normalized] || 'en';
}

export function detectPreferredLanguage(): string {
  try {
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) {
      return normalizeLanguageCode(storedLang);
    }

    const browserLang = navigator.language;
    const baseLang = browserLang.split('-')[0].toLowerCase();
    
    return normalizeLanguageCode(baseLang);
  } catch {
    return 'en';
  }
}