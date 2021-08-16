import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cart-slicer';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const amountItems = useSelector((state) => state.cart.quantity);

  const toggleCartHandler = () => {
    dispatch(cartActions.toggleCart());
  };
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{amountItems}</span>
    </button>
  );
};

export default CartButton;
