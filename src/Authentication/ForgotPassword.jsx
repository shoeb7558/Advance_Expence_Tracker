import React, { useState } from 'react'
import './ForgotPasswordModule.css'
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('')

    const ResetPass = async () => {

   
        try {     
          // Prepare the request payload
          const requestBody = JSON.stringify({
             requestType:"PASSWORD_RESET",
            email:email
        });
    
          // Send the HTTP POST request to send email verification
          const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA7QKapHcEvF2moBWyukFSQBVPh3_Xd3ew`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: requestBody,
            }
          );
    
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
    
          console.log('Link sendes');
          // Provide feedback to the user that the verification email was sent
        } catch (error) {
          console.error('Error:', error.message);
          // Handle other possible errors, such as user not authenticated
        }
      };

  return (
    <div className='FPdiv1'>
        <div className='FPdiv2'>
      <h1 className='FPh1'>Reset password</h1>
      <div className='FPdiv3'>
      <h4>Enter the mail with which you have register</h4>
      <input 
      className='FPinput'
      placeholder='Email'
      type='email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      <button className='FPbutton' onClick={ResetPass}>Send Link</button>
      </div>
      <Link to='/login'>Login Now</Link>
      </div>
    </div>
  )
}

export default ForgotPassword
