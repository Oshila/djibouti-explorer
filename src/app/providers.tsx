'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#F2E8D4',
            color: '#141414',
            borderRadius: '12px',
            border: '1px solid #1E3D47',
          },
          success: {
            iconTheme: {
              primary: '#72803A',
              secondary: '#F2E8D4',
            },
          },
          error: {
            iconTheme: {
              primary: '#C0532C',
              secondary: '#F2E8D4',
            },
          },
        }}
      />
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}