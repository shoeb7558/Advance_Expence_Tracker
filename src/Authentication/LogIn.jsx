// LoginForm.js
import React, { useState } from 'react';
import './LogInModule.css';
// import AuthContext from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Context/authSlice'; // Update the path

const LoginForm = () => {
  const [useremail, setEmail] = useState('');
  const [userpassword, setPassword] = useState('');
  const Navigate = useNavigate();
  // const AuthCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7QKapHcEvF2moBWyukFSQBVPh3_Xd3ew',
        {
          method: 'POST',
          body: JSON.stringify({
            email: useremail,
            password: userpassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      const data = await response.json();
      dispatch(login({ token: data.idToken }));
      // AuthCtx.login(data.idToken, data.email);
      Navigate('/');
    } catch (error) {
      alert(error.message);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="LogIndiv">
      <form onSubmit={handleLogin} className="loginForm">
        <h3>Log-In</h3>
        <label>Email:</label>
        <input
          className="FormInput"
          type="email"
          value={useremail}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          className="FormInput"
          type="password"
          value={userpassword}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="FormButton" type="submit">
          Login
        </button>
        <Link to="/ForgotPassword">Forgot Password</Link>
      </form>
    </div>
  );
};

export default LoginForm;
