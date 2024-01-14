import React, { useState } from 'react';
import Login from './LogIn'; // Assuming you have a Login component
import './SignUpModule.css';
import { Link } from 'react-router-dom';
const Signup = () => {
  const [useremail, setemail] = useState('');
  const [userpassword, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!useremail || !userpassword || !confirmPassword) {
      alert('All fields are mandatory!');
      return;
    }

    // Check if passwords match
    if (userpassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7QKapHcEvF2moBWyukFSQBVPh3_Xd3ew',
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
            console.log('successful signin')
        }else{
            return res.json().then(data => {
                console.log(data)
                alert('SignIn Fail')
            })
        }
    })

    setemail('');
    setpassword('');
    setconfirmPassword('');
  };

  const handleLoginLinkClick = (e) => {
    e.preventDefault();
    setShowLogin(true);
  };

  return (
    <div className='SignUpdiv'>
      <div className='h2div'>
        
      </div>
      <div className='formdiv'>
      
        {showLogin ? (
          <Login />
        ) : (
          
          <form onSubmit={handleSignupSubmit} className='SignUpForm'>
            <h2>Signup Page</h2>
            <input
              type="email"
              value={useremail}
              onChange={(e) => setemail(e.target.value)}
              name="email"
              required
              placeholder='Email'
              className='FormInput'
            />
            <input
              type="password"
              name="password"
              value={userpassword}
              onChange={(e) => setpassword(e.target.value)}
              required
              placeholder='Password'
              className='FormInput'
            />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
              placeholder='Confirm Password'
              className='FormInput'
            />
            <button type="submit" className='FormButton'>
              Signup
            </button>
            <div>
                  <Link to="/Login">Already have an account? Login</Link>
              </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;

