import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// Import translations
import en from './translations/en.json';
import vi from './translations/vi.json';

const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false, // Disable Suspense for React Native
  },
});

export default i18n;
