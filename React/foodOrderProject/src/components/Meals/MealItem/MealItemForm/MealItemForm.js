import { useRef, useState } from 'react';
import Input from '../../../UI/Input/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const amountVolume = useRef();
  
  const [isAmountValid, setIsAmountValid] = useState(true);
  
  const submitHandler = (event) => {
    const enteredAmount = amountVolume.current.value;
    const enteredAmountNumber = +enteredAmount;
    event.preventDefault();

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setIsAmountValid(false);
      return;
    }

    props.onSubmit(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={amountVolume}
        input={{
          id: 'amount_' + props.id,
          min: '1',
          max: '5',
          defaultValue: '1',
          type: 'number',
          step: '1',
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Amount not valid</p>}
    </form>
  );
};

export default MealItemForm;
