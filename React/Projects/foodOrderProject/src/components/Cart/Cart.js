import { useContext } from 'react';
import Modal from '../UI/Modal/Modal';
import classes from './Cart.module.css';
import CartContext from '../../state/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const hasItems = cartContext.items.length > 0;
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.items.map((item) => (
        <CartItem
          name={item.name}
          amount={item.amount}
          price={item.price}
          key={item.id}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.hideCartClick}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.hideCartClick}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
