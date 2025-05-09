import {
  createRouter,
} from '@tanstack/react-router';
import { queryClient } from '@infra/react-query';
import { rootRoute } from './root';
import { accountsRoute } from '@features/accounts';

const rootPageName = 'Code Challenge';

const routeTree = rootRoute.addChildren([
  accountsRoute
]);

// Inject react query client and repositories to router for prefetching data
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    pageName: rootPageName
  },
  defaultPendingComponent: () => <p>Default Loading...</p>,
  defaultNotFoundComponent:  () => <p>Default page not found</p>,
  defaultErrorComponent: () => <p>Default error component. Something went wrong.</p>,
});

// Register router type to TSR to ensure type safety e.g. type safe route paths when using Link components
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
};

export { router };