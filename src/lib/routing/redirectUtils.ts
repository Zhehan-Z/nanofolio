import { isPublicPath, getPathSegments, normalizePath } from './pathUtils';
import { normalizeLanguageCode, detectPreferredLanguage } from './languageUtils';

export function shouldRedirect(path: string): boolean {
  if (isPublicPath(path)) {
    return false;
  }

  const { lang } = getPathSegments(path);
  if (!lang) {
    return true;
  }

  const normalizedLang = normalizeLanguageCode(lang);
  return normalizedLang !== lang;
}

export function getRedirectPath(path: string): string {
  if (isPublicPath(path)) {
    return path;
  }

  const { lang, rest } = getPathSegments(path);
  const targetLang = lang ? normalizeLanguageCode(lang) : detectPreferredLanguage();
  
  return normalizePath(`/${targetLang}/${rest}`);
}