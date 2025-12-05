import {useSearchParams} from 'react-router';

export const PARAM_NAME = 'initial_data';

export interface UseInitialDataResult {
  initialData: Record<string, string> | null;
}

/**
 * Hook to extract the initial data from query parameters.
 *
 * The initial_data parameter should be a JSON-encoded object.
 */
const useInitialData = (): UseInitialDataResult => {
  const [searchParams] = useSearchParams();
  const initialDataParam: string | null = searchParams?.get(PARAM_NAME);

  let initialData: Record<string, string> | null = null;
  if (initialDataParam) {
    try {
      initialData = JSON.parse(initialDataParam);
    } catch (error) {
      console.error('Failed to parse initial_data parameter:', error);
    }
  }

  return {initialData};
};

export default useInitialData;
