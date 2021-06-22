import axios from 'axios';
import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterTaskHandler = (taskText) => {
    setIsLoading(true);
    setError(null);
    axios.post('https://react-my-burger-igor-default-rtdb.firebaseio.com/tasks.json', JSON.stringify({ text: taskText }))
    .then((res) => {
      const generatedId = res.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    }).catch((err) => {
      setError(err.message || 'Something went wrong!');
    })
    setIsLoading(false);
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
