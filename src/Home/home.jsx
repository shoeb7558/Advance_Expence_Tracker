import React from 'react';
import './homeModule.css';

function Home() {
  const verifyEmail = async () => {
    try {
      // Retrieve email and token from localStorage
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');

      // Check if email and token are present
      if (!email || !token) {
        throw new Error('User not authenticated');
      }

      // Prepare the request payload
      const requestBody = JSON.stringify({
        requestType: 'VERIFY_EMAIL',
        idToken: token,
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

      console.log('Verification email sent successfully');
      // Provide feedback to the user that the verification email was sent
    } catch (error) {
      console.error('Error sending verification email:', error.message);
      // Handle other possible errors, such as user not authenticated
    }
  };

  return (
    <>
      <div className='homediv1'>
        <h1>Welcome to the home page</h1>
        <h5>Complete your profile</h5>
      </div>
      <div className='verifydiv'>
        <button className='verifybutton' onClick={verifyEmail}>
          Verify Email
        </button>
      </div>
    </>
  );
}

export default Home;
