import React, { useState } from 'react';
import './ExpencesModule.css'

const ExpenseTracker = () => {
  // State to store expense details
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  // Function to handle form submission
  const addExpense = (e) => {
    e.preventDefault();

    // Check if all input fields are filled
    if (!amount || !description || !category) {
      alert('Please fill in all fields.');
      return;
    }

    // Create a new expense object
    const newExpense = {
     // Unique ID based on timestamp
      amount: parseFloat(amount),
      description,
      category,
    };

    // Update the expenses state with the new expense
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    // Clear input fields
    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    <div className='expencediv1'>

      <h2>Expense Tracker</h2>
      <div>
      <form onSubmit={addExpense} className='expencediv2'>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder='Enter Amount'
            className='ExpenceInput'
          />
        </label>
        <br />

        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='ExpenceInput'
            placeholder='Enter discription'
          />
        </label>
        <br />

        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className='ExpenceInput'
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            {/* Add more categories as needed */}
          </select>
        </label>
        <br />

        <button type="submit" className='expencebutton'>Add Expense</button>
      </form>
      </div>

      <ul>
        {/* Map through expenses and display them in list items */}
        {expenses.map((expense) => (
          <li key={expense.id} className='expenceli'>
             <span><strong>AMOUNT : </strong>${expense.amount.toFixed(2)}</span>
             <span><strong>DESCRIPTION : </strong>{expense.description}</span>
             <span><strong>CATEGORY : </strong>{expense.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
