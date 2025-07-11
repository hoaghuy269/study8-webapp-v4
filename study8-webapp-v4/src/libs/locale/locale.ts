import { axiosClient } from '../axios/axios-client';

type Locale = 'en' | 'vi' | 'jp' | 'ko';

const LocaleMap = {
  EN: 'en' as Locale,
  VI: 'vi' as Locale,
  JP: 'jp' as Locale,
  KO: 'ko' as Locale,
} as const;

export const SUPPORTED_LOCALES: Locale[] = Object.values(LocaleMap);

export const DEFAULT_LOCALE: Locale = LocaleMap.EN;

export const setLocale = (locale?: Locale) => {
  axiosClient.defaults.headers.common['Accept-Language'] =
    locale && SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
};
