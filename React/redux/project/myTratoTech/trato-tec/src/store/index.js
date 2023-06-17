import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/categories";
import itemSlicer from "./reducers/items";
import cartSlicer from "./reducers/cart";
import searchSlicer from "./reducers/search";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    items: itemSlicer,
    cart: cartSlicer,
    search: searchSlicer
  },
});

export default store;
