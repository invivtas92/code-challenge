import { lazy } from 'react';

export const AccountsView = lazy(() =>
  import('./PlaygroundView.js').then(module => ({ default: module.PlaygroundView }))
);