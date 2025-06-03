import { lazy } from 'react';

export const AccountsView = lazy(() =>
  import('./CanvasPlaygroundView.js').then(module => ({ default: module.CanvasPlaygroundView }))
);