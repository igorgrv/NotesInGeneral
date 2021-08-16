import { configureStore } from '@reduxjs/toolkit';
import cartSlicer from './cart-slicer';

const store = configureStore({
  reducer: { cart: cartSlicer}
})

export default store;