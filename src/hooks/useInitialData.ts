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
      // Convert base64url to standard base64, then decode
      const base64 = initialDataParam.replace(/-/g, '+').replace(/_/g, '/');
      const decodedParam = atob(base64);
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
