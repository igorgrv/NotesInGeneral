import { useContext } from 'react';
import { useRef } from 'react';
import { ToDoContext } from '../store/todos-context';
import classes from './TodoForm.module.css';

const TodoForm: React.FC = () => {
  const todoCtx = useContext(ToDoContext);
  const todoTextInputRef = useRef<HTMLInputElement>(null);
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    let enteredText = todoTextInputRef.current!.value;
    if (enteredText.trim().length === 0) return;

    todoCtx.addTodo(enteredText);
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.form}>
      <label>To do text:</label>
      <input type="text" ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default TodoForm;
