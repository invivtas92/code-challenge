import { useQuery } from '../hooks/useQuery';
import { ApiDataValidationError, ApiServerError } from "@commons/error";
import { DueChargesRepository } from "@repositories/dueCharges/dueCharges.repository.abstract";
import { GetDueChargesDTO } from "@repositories/dueCharges/dtos/getDueCharges.dto";
import { useCallback } from 'react';

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
    queryFn: useCallback(() => repository.getDueCharges(), [repository])
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
