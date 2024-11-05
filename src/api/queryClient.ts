import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,         // 기본 staleTime
      retry: 1,                         // 기본 재시도 횟수
      refetchOnWindowFocus: false,      // 포커스 시 재요청 비활성화
    },
  },
});
