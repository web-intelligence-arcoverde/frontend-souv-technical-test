'use client';

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider, type Persister } from '@tanstack/react-query-persist-client';
import { ReactNode, useState, useEffect } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
      },
    },
  }));

  // Create persister only once
  const [persister, setPersister] = useState<Persister | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storagePersister = createAsyncStoragePersister({
        storage: window.localStorage,
      });
      setPersister(storagePersister);
    }
  }, []);

  if (!persister) {
    return null; // Avoid rendering until persister is ready to prevent hydration mismatch or missing data
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};