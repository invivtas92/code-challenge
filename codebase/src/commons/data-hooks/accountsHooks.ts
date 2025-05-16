import { useQuery } from "@tanstack/react-query";
import { ApiDataValidationError, ApiServerError } from "@/commons/error";
import { AccountRepository } from "@repositories/account/account.repository.abstract";
import { GetAccountsDTO } from "@repositories/account/dtos/getAccounts.dto";
import { ACCOUNT_QUERY_KEYS } from "@repositories/account/queryKeys";


interface UseAccountsQueryProps {
  repository: AccountRepository
}

interface UseAccountsQueryReturn {
  isSuccess: boolean,
  isFetching: boolean,
  refetch: () => Promise<unknown>,
  data?: GetAccountsDTO,
  error: null | ApiDataValidationError | ApiServerError
}

export const useGetAccountsQuery = ({ repository }: UseAccountsQueryProps): UseAccountsQueryReturn => {
  const query = useQuery<GetAccountsDTO, ApiDataValidationError | ApiServerError>({
    queryKey: ACCOUNT_QUERY_KEYS.getAccounts,
    queryFn: () => repository.getAccounts()
  });
  
  return {
    isFetching: query.isFetching,
    isSuccess: query.isSuccess,
    refetch: async () => {
      await query.refetch(); 
    },
    data: query.data,
    error: query.error
  };
};

