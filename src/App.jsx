// App.js or App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import LogIn from './Authentication/LogIn';
import Home from './Home/home';
import Signup from './Authentication/SignUp';
import Profile from './Home/Profile';
import ForgotPassword from './Authentication/ForgotPassword';
import { toggleTheme } from './Expences/ExpenceSlice'
import './style.css'

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.expenses.darkMode);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    console.log('theme')
  };

  return (
    <Router>
      <div className={`Appdiv ${darkMode ? 'dark-theme' : ''}`}>
        <h5>Toggle</h5>
      <button className='toggletheme' onClick={handleThemeToggle}>Switch Dark</button>
      <Routes>
          {!auth.isLoggedIn && <Route path="/signup" element={<Signup />} />}
          {!auth.isLoggedIn && <Route path="/login" element={<LogIn />} />}
          {!auth.isLoggedIn && <Route path="/forgotPassword" element={<ForgotPassword />} />}
          <Route path="/" element={<Home/>} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </div>
    </Router>
  );
};

export default App;
