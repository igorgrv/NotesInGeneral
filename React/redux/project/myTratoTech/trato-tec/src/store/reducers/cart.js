import { createSlice } from "@reduxjs/toolkit";

// { id: xxxx, quantity: n}
const initialState = [];

const cartSlicer = createSlice({
  name: "cartSlicer",
  initialState,
  reducers: {
    changeCart(state, { payload }) {
      // some returns a boolean if a value exist
      const hasItem = state.some((item) => item.id === payload);

      // if hasItem, it means we want to remove it when clicking
      if (hasItem) return state.filter((item) => item.id !== payload);

      // if !hasItem, we want to add the item to state
      state.push({
        id: payload,
        quantity: 1,
      });
    },
    changeQuantity(state, { payload }) {
      const item = state.find((item) => item.id === payload.id);
      if (item.quantity >= 0) item.quantity += payload.quantity;
    },
  },
});

export const { changeCart, changeQuantity } = cartSlicer.actions;

export default cartSlicer.reducer;
