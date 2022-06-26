import React, { 
  useEffect,
  // useMemo, 
  useCallback,
  useState 
} from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

import useTaskService from './customHooks/useTaskService';

function App() {
  const [tasks, setTasks] = useState([]);

  const doneFetching = useCallback(data => {
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);
  const { isLoading, error, fetchTasks } = useTaskService(doneFetching);

  useEffect(() => {
    fetchTasks({});
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    fetchTasks({});
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
