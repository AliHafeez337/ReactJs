
import { 
  useState, 
  // useEffect, 
  useCallback 
} from "react";

const useTaskService = ({ method = 'GET', task = null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
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

      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      console.log('loaded tasks', loadedTasks)
      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, [method, task]);

  // useEffect(() => {
  //   fetchTasks();
  // }, [fetchTasks]);

  return { isLoading, tasks, error, fetchTasks };
}

export default useTaskService;