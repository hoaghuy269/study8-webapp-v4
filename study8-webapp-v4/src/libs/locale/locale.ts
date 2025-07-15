import {LOCALE} from "../constants/local-storage";
import { axiosClient } from '../axios/axios-client';

export type Locale = 'en' | 'vi' | 'jp' | 'ko';

const LocaleMap = {
  EN: 'en' as Locale,
  VI: 'vi' as Locale,
  JP: 'jp' as Locale,
  KO: 'ko' as Locale,
} as const;

export const SUPPORTED_LOCALES: Locale[] = Object.values(LocaleMap);
export const DEFAULT_LOCALE: Locale = LocaleMap.EN;

export const setLocale = (locale?: Locale) => {
  const finalLocale = locale && SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;

  axiosClient.defaults.headers.common['Accept-Language'] = finalLocale;
  localStorage.setItem(LOCALE, finalLocale);
};

export const getLocale = (): Locale => {
  const storedLocale = localStorage.getItem(LOCALE) as Locale | null;
  if (storedLocale && SUPPORTED_LOCALES.includes(storedLocale)) {
    return storedLocale;
  }
  return DEFAULT_LOCALE;
};
