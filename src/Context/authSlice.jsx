// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: localStorage.getItem('token') || null, // Get token from local storage
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); // Save token to local storage
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token'); // Remove token from local storage on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
