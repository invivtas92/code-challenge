
import i18n from 'i18next';
import {
  accountsLng,
  commonsLng,
  fallbackLng
} from './locales/en';
import { I18nextProvider, initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    lng: 'en',
    fallbackNS: 'fallback',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    resources: {
      en: {
        accounts: accountsLng,
        commons: commonsLng,
        fallback: fallbackLng,
      }
    }
  })
  .then((res) => {
    console.log('i18n success', res);
  })
  .catch((err: unknown) => {
    console.log('i18n err', err);
  });

interface CreateWrapperWithTestI18nProps {
  children: React.ReactNode
}

export const createWrapperWithTestI18n = ({ children }: CreateWrapperWithTestI18nProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};
