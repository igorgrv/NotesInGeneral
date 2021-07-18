import classes from './Todo.module.css';

interface ITodoProps {
  text: string;
  onClickToDo: () => void;
}

const Todo: React.FunctionComponent<ITodoProps> = (props) => {
  return (
    <li className={classes.item} onClick={props.onClickToDo}>
      {props.text}
    </li>
  );
};

export default Todo;
