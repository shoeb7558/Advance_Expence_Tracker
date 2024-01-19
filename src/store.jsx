// store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Context/authSlice' // Update the path
import expensesReducer from './Expences/ExpenceSlice' // Update the path
import themeReducer from './Expences/ThemeReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    theme: themeReducer,
  },
});

export default store;
