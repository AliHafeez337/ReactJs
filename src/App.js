import React, { 
  useEffect,
  useMemo, 
  // useState 
} from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

import useTaskService from './customHooks/useTaskService';

function App() {
  const { isLoading, tasks, error, fetchTasks } = useTaskService(useMemo(() => { return {} })); // it was also working without "useMemo" to return an object witch never changes... the point to add it here is that we don't want the object to be changed... because otherwise the object param in "useTaskService" will change which will cause the "fetchTasks" to run again which inturn will cause the "useEffect" to run again hence creating infine loop...

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    fetchTasks();
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
