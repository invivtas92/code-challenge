import { useQuery } from '../hooks/useQuery';
import { ApiDataValidationError, ApiServerError } from "@/commons/error";
import { AccountRepository } from "@repositories/account/account.repository.abstract";
import { GetAccountsDTO } from "@repositories/account/dtos/getAccounts.dto";

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

