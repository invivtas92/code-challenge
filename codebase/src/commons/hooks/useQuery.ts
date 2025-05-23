import { useCallback, useEffect, useState } from "react";

interface SuccessRes<Success> {
  isSuccess: true,
  data: Success,
  error: null,
}

interface ErrorRes<Error> {
  isSuccess: false,
  error: Error,
  data?: undefined,
}

type UseQueryReturn<Success, Error> = {
  isFetching: boolean,
  refetch: () => Promise<Success | Error>
} & (SuccessRes<Success> | ErrorRes<Error>)

interface UseQueryProps<Success> {
  queryFn: () => Promise<Success> | Success
}

export const useQuery = <Success, Error>({ queryFn }: UseQueryProps<Success>): UseQueryReturn<Success, Error> => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Success | null>(null);

  const refetch = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await queryFn();
      setData(res);
      setIsSuccess(true);
      return res;
    } catch (err) {
      setError(err as Error);
      setIsSuccess(false);
      return err as Error;
    } finally {
      setIsFetching(false);
    }
  }, [queryFn]);

  useEffect(() => {
    void refetch();
  }, [refetch])

  if (isSuccess) {
    return {
      isFetching,
      refetch,
      isSuccess: true,
      data: data as Success,
      error: null
    };
  } else {
    return {
      isFetching,
      refetch,
      isSuccess: false,
      error: error as Error
    };
  }
}