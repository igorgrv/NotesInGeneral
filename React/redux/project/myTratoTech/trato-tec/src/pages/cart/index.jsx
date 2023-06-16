import Header from "components/Header";
import Item from "components/item";
import styles from "./Cart.module.scss";
import { useSelector } from "react-redux";

export default function Cart() {
  // [{item + qntity do carrinho}]
  const cartItems = useSelector((state) => {
    // state = store inteiro

    // state.cart = {id, qnty}
    const cartItemArray = state.cart.reduce((finalCart, actualCart) => {
      // item = {title, description, id}
      const item = state.items.find((item) => item.id === actualCart.id);

      // finalCart = [{item + qntyt(state.cart)}]
      finalCart.push({
        ...item,
        quantity: actualCart.quantity,
      });
      return finalCart;
    }, []);
    return cartItemArray;
  });

  console.log(cartItems);

  return (
    <div>
      <Header title="My cart" description="Everything you will buy" />
      <div className={styles.cart}>
        {cartItems.map((cartItem) => (
          <Item key={cartItem.id} {...cartItem} cart />
        ))}
        <div className={styles.total}>
          <strong>Your order</strong>
          <span>
            Subtotal: <strong> R$ {(0.0).toFixed(2)} </strong>
          </span>
        </div>
        <button className={styles.submit}>Submit</button>
      </div>
    </div>
  );
}
