import { configureStore } from '@reduxjs/toolkit';
import counterSlicer from './counter';
import authSlicer from './auth';

const store = configureStore({
  reducer: { counter: counterSlicer, auth: authSlicer },
});

export default store;
