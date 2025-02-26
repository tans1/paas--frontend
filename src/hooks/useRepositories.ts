// useRepositories.ts
import { AxiosRequestConfig } from 'axios';
import useDataFetch from './useDataFetch';

// TODO: data type here matters check it out
export interface Repository {
  id: number;
  name: string;
  description: string;
  lastUpdated: string;
}

const useRepositories = (githubUsername: string) => {

  const config: AxiosRequestConfig = {
  params: {
    githubUsername,
  },
  };

  const { data, loading, error } = useDataFetch<Repository[]>(`${process.env.REACT_APP_BACK_END_URL}/repositories/user`, config);

  return { repositories: data, loading, error };
};

export default useRepositories;
