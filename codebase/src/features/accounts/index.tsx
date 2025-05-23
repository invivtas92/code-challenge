import { lazy } from 'react';

export const AccountsView = lazy(() =>
  import('./AccountsView.js').then(module => ({ default: module.AccountsView }))
);