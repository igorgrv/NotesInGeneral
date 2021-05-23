import { useContext } from 'react';
import CartContext from '../../../../state/cart-context';
import CartIcon from './CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);

  const numberOfCartItems = cartContext.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0)

  return <button className={classes.button} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>
      Your items
    </span>
    <span className={classes.badge}>
      {numberOfCartItems}
    </span>
  </button>
}

export default HeaderCartButton;