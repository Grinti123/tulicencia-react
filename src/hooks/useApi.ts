import { useState } from 'react';
import { ApiResponse } from '../types';
import { API_BASE_URL } from '../constants';

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

interface UseApiResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  makeRequest: (endpoint: string, config?: RequestConfig) => Promise<void>;
}

export const useApi = <T>(): UseApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = async (endpoint: string, config?: RequestConfig) => {
    try {
      setIsLoading(true);
      setError(null);

      const { params, ...restConfig } = config || {};
      const queryString = params
        ? `?${new URLSearchParams(params).toString()}`
        : '';

      const response = await fetch(`${API_BASE_URL}${endpoint}${queryString}`, {
        ...restConfig,
        headers: {
          'Content-Type': 'application/json',
          ...restConfig?.headers,
        },
      });

      const result: ApiResponse<T> = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'An error occurred');
      }

      if (result.data) {
        setData(result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, makeRequest };
};