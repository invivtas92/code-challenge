import { configService } from "@services/config/config.service";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: configService.getEnv().MODE === 'test' ?
    {
      queries: {
        refetchInterval: false,
        retry: false
      },
    } : {
      queries: {
        staleTime: 15 * 1000, // 15 secs
        gcTime: 60 * 5 * 1000, // 5 mins,
        refetchInterval: false,
        retry: 3,
        retryDelay: 1000
      },
    }
});