import { VALID_LANGUAGES } from './constants';

export function isPublicPath(path: string): boolean {
  return !!(
    path.startsWith('/fonts/') ||
    path.match(/\.(ico|png|jpg|jpeg|svg|css|js|json|txt|xml)$/) ||
    path.startsWith('/api/')
  );
}

export function getPathSegments(path: string): { lang: string; rest: string } {
  const [, lang = '', ...rest] = path.split('/');
  return {
    lang: lang.toLowerCase(),
    rest: rest.join('/')
  };
}

export function hasValidLanguagePrefix(path: string): boolean {
  const { lang } = getPathSegments(path);
  return lang in VALID_LANGUAGES;
}

export function normalizePath(path: string): string {
  return path.replace(/\/+/g, '/');
}