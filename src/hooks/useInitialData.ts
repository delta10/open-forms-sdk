import {useSearchParams} from 'react-router';

export const PARAM_NAME = 'initial_data';

export interface UseInitialDataResult {
  initialData: Record<string, string> | null;
}

/**
 * Hook to extract the initial data from query parameters.
 *
 * The initial_data parameter should be a base64-encoded, JSON-encoded object.
 */
const useInitialData = (): UseInitialDataResult => {
  const [searchParams] = useSearchParams();
  const initialDataParam: string | null = searchParams?.get(PARAM_NAME);

  let initialData: Record<string, string> | null = null;
  if (initialDataParam) {
    try {
      // Try to decode as base64 first
      const decodedParam = atob(initialDataParam);
      initialData = JSON.parse(decodedParam);
    } catch {
      // Fallback: try parsing as plain JSON (backward compatibility)
      try {
        initialData = JSON.parse(initialDataParam);
      } catch (fallbackError) {
        console.error('Failed to parse initial_data parameter:', fallbackError);
      }
    }
  }

  return {initialData};
};

export default useInitialData;
