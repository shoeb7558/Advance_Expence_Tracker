// expensesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expensesList: [],
    showPremiumButton: false,
    darkMode: false,
  },
  reducers: {
    setExpenses(state, action) {
      state.expensesList = action.payload;
    },
    addExpense(state, action) {
      state.expensesList.push(action.payload);
    },
    setPremiumButtonVisibility: (state, action) => {
      state.showPremiumButton = action.payload;
    },
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});
export const { toggleTheme } = expensesSlice.actions;
export const { setExpenses, addExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
