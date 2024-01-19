// expensesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expensesList: [],
  },
  reducers: {
    setExpenses(state, action) {
      state.expensesList = action.payload;
    },
    addExpense(state, action) {
      state.expensesList.push(action.payload);
    },
  },
});

export const { setExpenses, addExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
