import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@router/root';
import { SimpleErrorAndReload } from '@commons/components/SimpleErrorAndReload';
import { SimpleLoading } from '@commons/components/SimpleLoading';
import { mockAccountRepository } from '@repositories/account/account.mock.repository';
import { ACCOUNT_QUERY_KEYS } from '@repositories/account/queryKeys';
import { mockDueChargesRepository } from '@repositories/dueCharges/dueCharges.mock.repository';
import { DUE_CHARGES_QUERY_KEYS } from '@repositories/dueCharges/queryKeys';

const pageName = 'Accounts';
const path = '/';

const accountsRoute = createRoute({
  beforeLoad: () => {
    return {
      pageName,
      accountRepository: mockAccountRepository,
      dueChargesRepository: mockDueChargesRepository
    };
  },
  loader: ({ context: { accountRepository, dueChargesRepository, queryClient } }) => {
    return Promise.all(
      [
        queryClient.ensureQueryData({
          queryKey: ACCOUNT_QUERY_KEYS.getAccounts,
          queryFn: () => accountRepository.getAccounts()
        }),
        queryClient.ensureQueryData({
          queryKey: DUE_CHARGES_QUERY_KEYS.getDueCharges,
          queryFn: () => dueChargesRepository.getDueCharges()
        }),
      ]);
  },
  errorComponent: ({ error }) => <SimpleErrorAndReload error={error} pageName={pageName} />,
  pendingComponent: () => <SimpleLoading />,
  getParentRoute: () => rootRoute,
  path,

}).lazy(() => import('./ViewContainer').then((i) => i.Route));

export { accountsRoute, pageName, path};