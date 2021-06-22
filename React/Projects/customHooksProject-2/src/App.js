import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    setIsLoading(true);
    setError(null);
    axios.get('https://react-my-burger-igor-default-rtdb.firebaseio.com/tasks.json')
    .then((res) => {
      const loadedTasks = [];

      for (const taskKey in res.data) {
        loadedTasks.push({ id: taskKey, text: res.data[taskKey].text });
      }

      setTasks(loadedTasks);
    }).catch((err) => {
      setError(err.message || 'Something went wrong!');
    })
    setIsLoading(false); 
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
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
