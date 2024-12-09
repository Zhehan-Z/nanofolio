import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { useTranslations } from "../i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(date);
}

export function readingTime(html: string, lang: string, t: (key: string) => string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = ((wordCount / 200) + 1).toFixed();
  return t('read.time').replace('{0}', readingTimeMinutes);
}

export function dateRange(
  startDate: Date,
  endDate: Date | string | undefined,
  lang: string,
  t: ReturnType<typeof useTranslations>
): string {
  const locale = lang === 'zh-CN' ? 'zh-CN' : 'en-US';
  const formatOptions = t('date.format');

  const start = startDate.toLocaleDateString(locale, formatOptions);
  
  if (!endDate) {
    return start;
  }
  
  const end = typeof endDate === 'string' ? 
    t('date.present') : 
    endDate.toLocaleDateString(locale, formatOptions);
  
  return `${start} - ${end}`;
}