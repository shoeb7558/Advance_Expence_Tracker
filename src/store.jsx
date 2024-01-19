// store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Context/authSlice' // Update the path
import expensesReducer from './Expences/ExpenceSlice' // Update the path

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
  },
});

export default store;
