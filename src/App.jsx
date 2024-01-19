// App.js or App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogIn from './Authentication/LogIn';
import Home from './Home/home';
import Signup from './Authentication/SignUp';
import Profile from './Home/Profile';
import ForgotPassword from './Authentication/ForgotPassword';

const App = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
          {!auth.isLoggedIn && <Route path="/signup" element={<Signup />} />}
          {!auth.isLoggedIn && <Route path="/login" element={<LogIn />} />}
          {!auth.isLoggedIn && <Route path="/forgotPassword" element={<ForgotPassword />} />}
          <Route path="/" element={<Home/>} />
      <Route path="/profile" element={<Profile />} />
    </Routes>

    </Router>
  );
};

export default App;
