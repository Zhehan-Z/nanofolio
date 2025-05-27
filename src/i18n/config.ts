import { ui, routes } from './ui';

export const languages = {
  en: 'English',
  'zh-CN': '简体中文'
};

export const defaultLang = 'en';
export const showDefaultLang = true;

export function getLangFromUrl(url: URL) {
  const pathSegments = url.pathname.split('/').filter(segment => segment !== '');
  if (pathSegments.length > 0 && pathSegments[0] in languages) {
    return pathSegments[0] as keyof typeof languages;
  }
  return defaultLang;
}

export function getPathWithoutLang(pathname: string) {
  const [, lang, ...rest] = pathname.split('/');
  if (lang && lang in languages) {
    return '/' + rest.join('/');
  }
  return pathname;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function useRouteTranslations(lang: keyof typeof routes) {
  return function r(key: keyof typeof routes[typeof defaultLang]) {
    return routes[lang][key] || routes[defaultLang][key];
  };
}

export function getRelativeUrl(lang: string, currentPath: string) {
  // Remove any existing language prefix
  const pathWithoutLang = getPathWithoutLang(currentPath);
  // Always include the language prefix
  return `/${lang}${pathWithoutLang}`.replace(/\/+/g, '/');
}