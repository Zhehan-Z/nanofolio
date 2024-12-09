import { nav } from './translations/nav';
import { home } from './translations/home';
import { academic } from './translations/academic';
import { common } from './translations/common';
import { meta } from './translations/meta';
import { routeTranslations } from './translations/routes';

export const ui = {
  en: {
    ...nav.en,
    ...home.en,
    ...academic.en,
    ...common.en,
    ...meta.en,
  },
  'zh-CN': {
    ...nav['zh-CN'],
    ...home['zh-CN'],
    ...academic['zh-CN'],
    ...common['zh-CN'],
    ...meta['zh-CN'],
  }
} as const;

export const routes = routeTranslations;