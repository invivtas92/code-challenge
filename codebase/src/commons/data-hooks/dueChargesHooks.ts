import { useQuery } from "@tanstack/react-query";
import { ApiDataValidationError, ApiServerError } from "@commons/error";
import { DueChargesRepository } from "@repositories/dueCharges/dueCharges.repository.abstract";
import { GetDueChargesDTO } from "@repositories/dueCharges/dtos/getDueCharges.dto";
import { DUE_CHARGES_QUERY_KEYS } from "@repositories/dueCharges/queryKeys";

interface UseDueChargesQueryProps {
  repository: DueChargesRepository
}

interface UseAccountsQueryReturn {
  isSuccess: boolean,
  isFetching: boolean,
  refetch: () => Promise<unknown>,
  data?: GetDueChargesDTO,
  error: null | ApiDataValidationError | ApiServerError
}

export const useGetDueChargesQuery = ({ repository }: UseDueChargesQueryProps): UseAccountsQueryReturn => {
  const query = useQuery<GetDueChargesDTO, ApiDataValidationError | ApiServerError>({
    queryKey: DUE_CHARGES_QUERY_KEYS.getDueCharges,
    queryFn: () => repository.getDueCharges()
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
