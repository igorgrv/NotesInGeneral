import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { showCart: false, items: [], quantity: 0 },
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    addItem(state, action) {
      const newItem = {
        id: action.payload.id,
        title: action.payload.title,
        price: action.payload.price,
        quantity: 1,
        totalPrice: action.payload.price,
      };
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push(newItem);
      } else {
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        existingItem.quantity++;
      }

      state.quantity = state.items.length;
    },
    removeItem(state, action) {
      const id = action.payload;
      const itemToBeDeleted = state.items.find((item) => item.id === id);
      if (itemToBeDeleted.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        itemToBeDeleted.quantity--;
        itemToBeDeleted.totalPrice = itemToBeDeleted.totalPrice - itemToBeDeleted.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
