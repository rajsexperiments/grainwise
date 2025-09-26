import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
interface UseApiReturn<T> {
  data: T | null;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}
export function useApi<T>(path: string): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await api<T>(path);
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to fetch data from ${path}`, {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [path]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { data, setData, isLoading, error, refetch: fetchData };
}