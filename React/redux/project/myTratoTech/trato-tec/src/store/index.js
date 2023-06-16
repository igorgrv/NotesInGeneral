import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/categories";
import itemSlice from "./reducers/items";
import cartSlicer from "./reducers/cart";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    items: itemSlice,
    cart: cartSlicer
  },
});

export default store;
