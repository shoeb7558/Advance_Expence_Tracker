// LoginForm.js
import React, { useState, useContext } from 'react';
import './LogInModule.css'
import AuthContext from '../Context/AuthContext';
import {Link, useNavigate  } from 'react-router-dom';



const LoginForm =() => {
  const [useremail, setEmail] = useState('');
  const [userpassword, setPassword] = useState('');
  const Navigate = useNavigate ();

  const AuthCtx =  useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7QKapHcEvF2moBWyukFSQBVPh3_Xd3ew',
    {
        method: 'POST',
        body: JSON.stringify({
            email: useremail,
            password : userpassword,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).then((res) => {
        if(res.ok){
            return res.json()
            
        }else{
            return res.json().then(() => {
                let errorMessage = 'Login Fail'
                
                alert(error.errorMessage)
                throw new Error(errorMessage)
            })
        }
    }).then((data)=>{
      AuthCtx.login(data.idToken, data.email);

      Navigate('/');
       
       
  })
    .catch((error)=>{
        alert(error.errorMessage)
    })
    
    setEmail('')
    setPassword('')
  };

  return (
    <div className='LogIndiv'>
    <form onSubmit={handleLogin} className='loginForm'>
      <h3>Log-In</h3>
      <label>Email:</label>
      <input className='FormInput' type="email" value={useremail} onChange={(e) => setEmail(e.target.value)} required />
      <label>Password:</label>
      <input className='FormInput' type="password" value={userpassword} onChange={(e) => setPassword(e.target.value)} required />
      <button className='FormButton' type="submit">Login</button>
      <Link to="/ForgotPassword">Forgot Password</Link>
    </form>
    </div>
  );
};

export default LoginForm;


