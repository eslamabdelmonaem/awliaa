import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './public/locales/en/common.json';
import commonAr from './public/locales/ar/common.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      common: commonEn,
    },
    ar: {
      common: commonAr,
    },
  },
});

export default i18n;
