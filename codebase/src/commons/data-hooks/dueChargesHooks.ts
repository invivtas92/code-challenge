import { useQuery } from "@tanstack/react-query";
import { ApiDataValidationError, ApiServerError } from "@commons/error";
import { DueChargesRepository } from "@repositories/dueCharges/dueCharges.repository.abstract";
import { GetDueChargesDTO } from "@repositories/dueCharges/dtos/getDueCharges.dto";
import { DUE_CHARGES_QUERY_KEYS } from "@repositories/dueCharges/queryKeys";

interface UseDueChargesQueryProps {
  repository: DueChargesRepository
}

export const useGetDueChargesQuery = ({ repository }: UseDueChargesQueryProps) => {
  const query = useQuery<GetDueChargesDTO, ApiDataValidationError | ApiServerError>({
    queryKey: DUE_CHARGES_QUERY_KEYS.getDueCharges,
    queryFn: () => repository.getDueCharges()
  });
  return query;
};
