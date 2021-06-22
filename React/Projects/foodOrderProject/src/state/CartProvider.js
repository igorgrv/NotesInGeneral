import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartValue = {
  items: [],
  totalAmount: 0,
};

const cardReducer = (prevState, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = prevState.totalAmount + action.item.price * action.item.amount;
    const currentCartItemIndex = prevState.items.findIndex((item) => item.id === action.item.id); // 1, 2
    const currentCartItem = prevState.items[currentCartItemIndex]; // name: xx, amount: 2

    let updatedItems;

    if (currentCartItem) {
      const updatedItem = { ...currentCartItem, amount: currentCartItem.amount + action.item.amount }; // irá pegar o objeto item existente e atualizar o amount
      updatedItems = [...prevState.items]; // recupera a lista de todos items
      updatedItems[currentCartItemIndex] = updatedItem; // atualiza somente o item q teve o amount alterado
    } else {
      updatedItems = prevState.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === 'REMOVE') {
    const currentCartItemIndex = prevState.items.findIndex((item) => item.id === action.id); // 1, 2
    const currentCartItem = prevState.items[currentCartItemIndex];
    const updatedTotalAmount = prevState.totalAmount - currentCartItem.price;

    let updatedItems;
    if (currentCartItem.amount === 1) {
      updatedItems = prevState.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = {...currentCartItem, amount: currentCartItem.amount - 1}
      updatedItems = [...prevState.items];
      updatedItems[currentCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  return defaultCartValue;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cardReducer, defaultCartValue);

  const addItemHandler = (item) => {
    dispatchCart({ type: 'ADD', item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCart({ type: 'REMOVE', id: id });
  };

  const cartValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return <CartContext.Provider value={cartValue}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
