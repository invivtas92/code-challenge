import './index.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SimpleRouter } from './router/SimpleRouter.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SimpleRouter />
  </StrictMode>,
);