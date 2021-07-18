import { useContext } from 'react';
import { ToDoContext } from '../store/todos-context';
import Todo from './Todo';
import classes from './Todos.module.css';

const Todos: React.FC = () => {
  const todoCtx = useContext(ToDoContext);

  return (
    <ul className={classes.todos}>
      {todoCtx.items.map((item, index) => (
        <Todo key={index} text={item} onClickToDo={todoCtx.removeTodo.bind(null, index)} />
      ))}
    </ul>
  );
};

export default Todos;
