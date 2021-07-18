import * as React from 'react';
import { useState } from 'react';

type toDoObject = {
  items: string[];
  addTodo: (toDoText: string) => void;
  removeTodo: (index: number) => void;
};

export const ToDoContext = React.createContext<toDoObject>({
  items: [],
  addTodo: (toDoText: string) => {},
  removeTodo: (index: number) => {},
});

const ToDoContextProvider: React.FC = (props) => {
  const [toDo, setTodo] = useState<string[]>([]);

  const addTodoHandler = (toDoText: string) => {
    setTodo((prevToDo) => {
      return prevToDo.concat(toDoText);
    });
  };

  const removeToDoHandler = (toDoIndex: number) => {
    const newToDoAray = [...toDo];
    newToDoAray.splice(toDoIndex, 1);
    setTodo(newToDoAray);
  };

  const contextValue: toDoObject = {
    items: toDo,
    addTodo: addTodoHandler,
    removeTodo: removeToDoHandler,
  };
  return <ToDoContext.Provider value={contextValue}>{props.children}</ToDoContext.Provider>;
};

export default ToDoContextProvider;
