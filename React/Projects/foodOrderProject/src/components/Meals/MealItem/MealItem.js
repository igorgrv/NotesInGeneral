import { useContext } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm/MealItemForm';
import CartContext from '../../../state/cart-context';

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartContext = useContext(CartContext);
  const addToCartHandler = (amount) => {
    const item = {
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      amount: amount,
    };

    cartContext.addItem(item);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onSubmit={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
