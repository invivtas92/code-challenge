import { I18nextProvider } from 'react-i18next';
import i18n from './config';
import { ReactNode, Suspense } from 'react';

interface I18NProviderPRops {
  children: ReactNode
}

export const I18nProvider = ({ children }: I18NProviderPRops) => {
  return <Suspense fallback={<div>Loading i18n</div>}>
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  </Suspense>
};