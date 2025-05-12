import { queryClient } from "@infra/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

interface CreateTestReactQueryProps {
  children: React.ReactNode
}

export const createWrapperWithTestReactQuery = ({ children }: CreateTestReactQueryProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
