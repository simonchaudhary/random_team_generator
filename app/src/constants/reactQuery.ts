import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3, // Retry up to 3 times before failing
      refetchOnWindowFocus: false
    }
  }
});

export default queryClient;
