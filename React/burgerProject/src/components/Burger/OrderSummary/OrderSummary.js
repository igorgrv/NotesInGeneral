import React from 'react';
import Aux from '../../../HOC/Aux';
import classes from './OrderSummary.css';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  
  const ingredientSummary = Object.keys(props.ingredients)
    .map(ingredient => {
      return <li key={ingredient}>
          <span className={classes.upper}>
            {ingredient}
          </span>
          : {props.ingredients[ingredient]}
        </li>
    })

  return ( 
    <Aux>
      <h3>Your Order</h3>
      <p>Total Price: {props.totalPrice.toFixed(2)}</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to checkout</p>
      <Button clicked={props.modalClosed} type="Danger">CANCEL</Button>
      <Button clicked={props.orderNow} type="Success">ORDER</Button>
    </Aux>
   ); 
}
 
export default orderSummary;