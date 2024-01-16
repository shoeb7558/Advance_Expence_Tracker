import React, { useState, useEffect } from 'react';
import './ExpencesModule.css'

const ExpenseTracker = () => {
  // State to store expense details
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  // const [data, setdata] = useState([])

  // Function to handle form submission
  const addExpense = async (e) => {
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
    const response = await fetch('https://advanceexpencetracker-default-rtdb.firebaseio.com/Expences.json', {
      method: 'POST',
      body: JSON.stringify(newExpense),
      headers: {
        'content-type': 'application/json'
      }
    });
    const responseData = await response.json();
    console.log(responseData);
   

    // Clear input fields
    setAmount('');
    setDescription('');
    setCategory('');
  };


  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await fetch('https://advanceexpencetracker-default-rtdb.firebaseio.com/Expences.json');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const result = await response.json();
        // Convert the Firebase data object into an array of movies
        const Expences = result ? Object.keys(result).map((key) => ({ id: key, ...result[key] })) : [];
        setExpenses(Expences);
        // console.log(Expences);
      } catch (error) {
        console.error('Error fetching data:', error);
        
      } finally {
       console.log('done')
      }
    };

    fetchData();
  }, []);

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
        {expenses.map((expense, index) => (
          <li key={index} className='expenceli'>
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
