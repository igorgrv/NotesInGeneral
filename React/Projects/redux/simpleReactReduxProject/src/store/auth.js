import { createSlice } from '@reduxjs/toolkit';

const initialStateAuth = { isLoggedIn: false };

const authSlicer = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlicer.actions;

export default authSlicer.reducer;
