import { createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: false };

const counterSlicer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    showCounter(state) {
      state.showCounter = !state.showCounter;
    },
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
  },
});

export const counterActions = counterSlicer.actions;

export default counterSlicer.reducer;
