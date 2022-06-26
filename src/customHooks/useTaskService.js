
import { 
  useState, 
  // useEffect, 
  useCallback 
} from "react";

const useTaskService = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async ({ method = 'GET', task = null }) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('fetchin tasks')

      const response = await fetch(
        'https://testing-272511.firebaseio.com/tasks.json',
        {
          method,
          body: task ? JSON.stringify({ text: task }) : null,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      console.log('data', data)

      callback(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, [callback]);

  return { isLoading, error, fetchTasks };
}

export default useTaskService;