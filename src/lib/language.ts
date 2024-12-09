import { languages } from '../i18n/config';
import { CHINESE_VARIANTS, DEFAULT_LOCALE } from './constants';

export function normalizeLanguage(lang: string): string {
  // Handle Chinese variants
  if (CHINESE_VARIANTS.includes(lang)) {
    return 'zh-CN';
  }
  return lang;
}

export function isChineseVariant(lang: string): boolean {
  return CHINESE_VARIANTS.includes(lang);
}