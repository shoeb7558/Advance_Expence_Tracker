import React, { useState, useEffect } from 'react';
import './ExpencesModule.css';
import { toggleTheme } from './ExpenceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { saveAs } from 'file-saver';


const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.expenses.darkMode);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    console.log('dark')
  };

  const addExpense = async (e) => {
    e.preventDefault();

    if (!amount || !description || !category) {
      alert('Please fill in all fields.');
      return;
    }

    const newExpense = {
      amount: parseFloat(amount),
      description,
      category,
    };

    const responseAdd = await fetch('https://advanceexpencetracker-default-rtdb.firebaseio.com/Expences.json', {
      method: 'POST',
      body: JSON.stringify(newExpense),
      headers: {
        'content-type': 'application/json',
      },
    });

    if (responseAdd.ok) {
      const responseDataAdd = await responseAdd.json();
      console.log('Expense added successfully:', responseDataAdd);

      // Update the local state only after the new expense is successfully added
      setExpenses((prevExpenses) => [...prevExpenses, { id: responseDataAdd.name, ...newExpense }]);
      setTotalAmount((prevTotal) => prevTotal + newExpense.amount);

      // Clear input fields
      setAmount('');
      setDescription('');
      setCategory('');

      // If editingExpenseId is not null, update the expense
      if (editingExpenseId !== null) {
        const updatedExpense = {
          id: responseDataAdd.name,
          amount: parseFloat(amount),
          description,
          category,
        };

        // Make the fetch request to update the expense
        const responseUpdate = await fetch(
          `https://advanceexpencetracker-default-rtdb.firebaseio.com/Expences/${editingExpenseId}.json`,
          {
            method: 'PUT',
            body: JSON.stringify(updatedExpense),
            headers: {
              'content-type': 'application/json',
            },
          }
        );

        if (responseUpdate.ok) {
          console.log('Expense updated successfully');
          setEditingExpenseId(null);
        } else {
          console.error('Failed to update expense');
        }
      }
    } else {
      console.error('Failed to add expense');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://advanceexpencetracker-default-rtdb.firebaseio.com/Expences.json');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const result = await response.json();
        const Expences = result ? Object.keys(result).map((key) => ({ id: key, ...result[key] })) : [];
        setExpenses(Expences);

        // Calculate the initial total amount
        const initialTotal = Expences.reduce((total, expense) => total + expense.amount, 0);
        setTotalAmount(initialTotal);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        console.log('done');
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = async (expenseId) => {
    const expenseToDelete = expenses.find((expense) => expense.id === expenseId);

    const response = await fetch(`https://advanceexpencetracker-default-rtdb.firebaseio.com/Expences/${expenseId}.json`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
      setTotalAmount((prevTotal) => prevTotal - expenseToDelete.amount);
    }
  };

  const handleUpdateClick = (expenseId) => {
    setEditingExpenseId(expenseId);

    const editingExpense = expenses.find((expense) => expense.id === expenseId);

    setAmount(editingExpense.amount.toString());
    setDescription(editingExpense.description);
    setCategory(editingExpense.category);
  };

  const handleSaveClick = async () => {
    if (!amount || !description || !category) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedExpense = {
      id: editingExpenseId,
      amount: parseFloat(amount),
      description,
      category,
    };

    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) => (expense.id === editingExpenseId ? { ...expense, ...updatedExpense } : expense))
    );

    const response = await fetch(
      `https://advanceexpencetracker-default-rtdb.firebaseio.com/Expences/${editingExpenseId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(updatedExpense),
        headers: {
          'content-type': 'application/json',
        },
      }
    );

    if (response.ok) {
      console.log('Expense updated successfully');
      setAmount('');
      setDescription('');
      setCategory('');
      setEditingExpenseId(null);
    } else {
      console.error('Failed to update expense');
    }
  };

  const handleCancelClick = () => {
    setAmount('');
    setDescription('');
    setCategory('');
    setEditingExpenseId(null);
  };
  const handlePrimumactivartion =() => {
    console.log('activated')
  }
  const convertToCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,';
    const header = Object.keys(expenses[0]).join(',');

    const csvData = expenses.map(expense => Object.values(expense).join(','));

    const csv = `${csvContent}${header}\n${csvData.join('\n')}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

    saveAs(blob, 'expenses.csv');
  };
 
  return (
    <div className={`expencediv1 ${darkMode ? 'dark-theme' : ''}`}>
      <h2>Expense Tracker</h2>
      <button onClick={handleThemeToggle} className='premiumButton'>
          Dark Theme
        </button>
        <button onClick={convertToCSV} className='downloadButton'>
        Download Expenses CSV
      </button>
      <div>
        <form onSubmit={addExpense} className={`expencediv2 ${darkMode ? 'dark-theme' : ''}`}>
          <label>
            Amount:
            <input
              type='number'
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
              type='text'
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
            <select value={category} onChange={(e) => setCategory(e.target.value)} required className='ExpenceInput'>
              <option value=''>Select Category</option>
              <option value='Food'>Food</option>
              <option value='Petrol'>Petrol</option>
              <option value='Salary'>Salary</option>
            </select>
          </label>
          <br />

          {editingExpenseId ? (
            <>
              <button type='button' onClick={handleSaveClick} className='expencebutton'>
                Save
              </button>
              <button type='button' onClick={handleCancelClick} className='expencebutton'>
                Cancel
              </button>
            </>
          ) : (
            <button type='submit' className='expencebutton'>
              Add Expense
            </button>
          )}
        </form>
      </div>

      {totalAmount > 1000 && (
        <button onClick={handlePrimumactivartion} className='premiumButton'>
          Activate Premium
        </button>
      )}

      {totalAmount <= 1000 && (
        <ul>
          {expenses.map((expense, index) => (
            <li key={index} className='expenceli'>
              <span>
                <strong>AMOUNT : </strong>${expense.amount.toFixed(2)}
              </span>
              <span>
                <strong>DESCRIPTION : </strong>
                {expense.description}
              </span>
              <span>
                <strong>CATEGORY : </strong>
                {expense.category}
              </span>
              <button onClick={() => handleUpdateClick(expense.id)}>Update</button>
              <button onClick={() => handleDeleteClick(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseTracker;
