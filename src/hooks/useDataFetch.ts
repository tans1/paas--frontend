// useDataFetch.ts
import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

function useDataFetch<T>(url: string, options?: AxiosRequestConfig): { data: T | null; loading: boolean; error: any } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const source: CancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<T>(url, {
          cancelToken: source.token,
          ...options,
        });
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
}

export default useDataFetch;
