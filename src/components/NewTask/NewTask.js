import { 
  useCallback, 
  // useState 
} from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

import useTaskService from '../../customHooks/useTaskService';

const NewTask = (props) => {

  const { onAddTask } = props;
  const callback = useCallback((createdTask) => {
    onAddTask(createdTask)
  }, [onAddTask]);
  const { isLoading, error, fetchTasks } = useTaskService(callback);

  const enterTaskHandler = async (taskText) => {
    fetchTasks({
      method: 'POST',
      task: taskText
    })
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
