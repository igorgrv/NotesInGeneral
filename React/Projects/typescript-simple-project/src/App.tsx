import './App.css';
import TodoForm from './components/TodoForm';
import Todos from './components/Todos';
import ToDoContextProvider from './store/todos-context';

function App() {
  return (
    <ToDoContextProvider>
      <TodoForm />
      <Todos />
    </ToDoContextProvider>
  );
}

export default App;
