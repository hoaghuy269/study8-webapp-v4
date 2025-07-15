import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './i18n/en.json';
import viTranslation from './i18n/vi.json';
import {DEFAULT_LOCALE} from "./libs/locale/locale";
import {LOCALE} from "./libs/constants/local-storage";

const storedLanguage = localStorage.getItem(LOCALE) || DEFAULT_LOCALE;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    vi: { translation: viTranslation },
  },
  lng: storedLanguage,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false },
});

export default i18n;
