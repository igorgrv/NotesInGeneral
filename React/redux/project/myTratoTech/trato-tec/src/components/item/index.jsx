import classNames from "classnames";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import styles from "./Item.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeFavorite } from "store/reducers/items";
import { changeCart } from "store/reducers/cart";

const iconProps = {
  size: 24,
  color: "#041833",
};

export default function Item(props) {
  const { picture, title, description, price, favorite, id, cart } = props;
  const dispatch = useDispatch();

  const isInCart = useSelector((state) =>
    state.cart.some((cartItem) => cartItem.id === id)
  );

  function handleFavorite() {
    dispatch(changeFavorite(id));
  }

  function handleCart() {
    dispatch(changeCart(id));
  }

  return (
    <div className={classNames(styles.item, {
      [styles.cartItem] : cart
    })}>
      <div className={styles["item-image"]}>
        <img src={picture} alt={title} />
      </div>
      <div className={styles["item-description"]}>
        <div className={styles["item-title"]}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className={styles["item-info"]}>
          <div className={styles["item-price"]}>R$ {price.toFixed(2)}</div>
          <div className={styles["item-actions"]}>
            {favorite ? (
              <AiFillHeart
                {...iconProps}
                color="#ff0000"
                className={styles["item-action"]}
                onClick={handleFavorite}
              />
            ) : (
              <AiOutlineHeart
                {...iconProps}
                className={styles["item-action"]}
                onClick={handleFavorite}
              />
            )}
            <FaCartPlus
              {...iconProps}
              color={isInCart ? "#1875E8" : iconProps.color}
              className={styles["item-action"]}
              onClick={handleCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
