import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@router/root';
import { SimpleErrorAndReload } from '@commons/components/SimpleErrorAndReload';
import { SimpleLoading } from '@commons/components/SimpleLoading';

const pageName = 'Accounts';
const path = '/';

const accountsRoute = createRoute({
  beforeLoad: () => {
    return {
      pageName
    };
  },
  // loader: ({ context: { apiUserRepository, queryClient } }) => {
  //   // return the promise so react router's Suspense catches it (Promise will be thrown by the router) 
  //   // which then causes it to render the pendingComponent while the promise is pending
  //   // if you want to let ViewContainer component to handle rendering the loading component e.g. when the 
  //   // loading state is more complex then don't return the promise e.g. void queryClient.ensureQueryData(...);
  //   // this will cause the router to not render pending component and unable to handle thrown errors or rejections as no promise
  //   // returned, this means it will not be able to rethrow error or promise rejections to the router's error boundary
  //   // which renders the error component). Return multiple queries within Promise.all for querying multiple data,
  //   // we can put query that needs to be loaded before rendering component in the promise array, other queries
  //   // can be run outside of the query and loading state rendered by the view container 
  //   return queryClient.ensureQueryData({
  //     queryKey: apiUserRepository.queryKeys.getUsers,
  //     queryFn: () => apiUserRepository.getUsers()
  //   });
  // },
  errorComponent: ({ error }) => <SimpleErrorAndReload error={error} pageName={pageName} />,
  pendingComponent: () => <SimpleLoading />,
  getParentRoute: () => rootRoute,
  path,

}).lazy(() => import('./ViewContainer').then((i) => i.Route));

export { accountsRoute, pageName, path};