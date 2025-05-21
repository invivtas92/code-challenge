import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { configService } from '@services/config/config.service';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: 'en',
    fallbackNS: 'fallback',
    debug: configService.getEnv().MODE === 'production' ? false : true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      useSuspense: true
    },
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json'
    }
  })
  .then((res) => {
    console.log('i18n success', res);
  })
  .catch((err: unknown) => {
    console.log('i18n err', err);
  });

export default i18n;