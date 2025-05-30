
import { AccountRepository } from "@repositories/account/account.repository.abstract"
import { AccountDTO } from "@repositories/account/dtos/getAccounts.dto"
import { ApiDataValidationError, ApiServerError } from "@commons/error"
import { useCallback, useEffect } from "react"
import { DueChargesRepository } from "@repositories/dueCharges/dueCharges.repository.abstract"
import { useGetDueChargesQuery } from "@commons/data-hooks/dueChargesHooks"
import { useGetAccountsQuery } from "@commons/data-hooks/accountsHooks"
import { simpleWorkerService } from "@/infra/worker/simpleWorker.service"

interface UseAccountsProps {
  accountRepository: AccountRepository,
  dueChargesRepository: DueChargesRepository
}

type AdjustedData = AccountDTO & { balance: number };

interface UseAccountsReturn {
  data?: AdjustedData[],
  isSuccess: boolean,
  isFetching: boolean,
  refetchData: () => void,
  error: {
    accounts: ApiDataValidationError | ApiServerError | null,
    dueCharges: ApiDataValidationError | ApiServerError | null,
  }
}

export const useAccounts = ({ accountRepository, dueChargesRepository }: UseAccountsProps): UseAccountsReturn => {
  const accountsRes = useGetAccountsQuery({ repository: accountRepository });
  const dueChargesRes = useGetDueChargesQuery({ repository: dueChargesRepository });

  useEffect(() => {
    void simpleWorkerService.exec({
      methodName: 'runSumAsync',
      args: [{ count: 10 }]
    });

    void simpleWorkerService.exec({
      methodName: 'runAddMultiple',
      args: [5, 2, 1]
    });
  }, []);


  const refetchData = useCallback((): void => {
    void accountsRes.refetch();
    void dueChargesRes.refetch();
  }, [accountsRes, dueChargesRes]);

  let data: AdjustedData[] | undefined = undefined;

  if (dueChargesRes.isSuccess && accountsRes.isSuccess) {
    const adjustedData: AdjustedData[] = [];
    accountsRes.data?.forEach((accDetails) => {
      adjustedData.push({ ...accDetails, balance: 0 });
    });

    if (adjustedData.length > 0) {
      const balanceMap = new Map<string, number>();
      dueChargesRes.data?.forEach(({ accountId, amount }) => {
        if (balanceMap.has(accountId)) {
          balanceMap.set(accountId, (balanceMap.get(accountId) ?? 0) + amount);
        } else {
          balanceMap.set(accountId, amount);
        }
      });

      balanceMap.forEach((amount, accountId) => {
        const accDetails = adjustedData.find((acc) => {
          return acc.id === accountId;
        });

        if (accDetails !== undefined) {
          accDetails.balance = amount;
        }
      });
    }
    
    data = adjustedData;
  }

  return {
    data,
    isSuccess: accountsRes.isSuccess && dueChargesRes.isSuccess,
    isFetching: accountsRes.isFetching && dueChargesRes.isFetching,
    refetchData,
    error: {
      accounts: accountsRes.error,
      dueCharges: dueChargesRes.error
    }
  }
};

export type { UseAccountsReturn, AdjustedData };