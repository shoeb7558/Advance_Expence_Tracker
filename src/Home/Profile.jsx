import React, { useState, useEffect } from 'react';
import './ProfileModule.css';

const Profile = () => {
  // State for form fields
  const [data, setdata] = useState([])
  const [contactDetails, setContactDetails] = useState({
    fullName: '',
    photoLink: '',
  });

  // Function to handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://advanceexpencetracker-default-rtdb.firebaseio.com/contact.json', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      console.log('Contact Details Updated:', contactDetails);
      // Provide feedback to the user that the update was successful
    } catch (error) {
      console.error('Error updating contact details:', error.message);
      // Provide feedback to the user that there was an error
    }
    setContactDetails('')
  };

  // Function to handle changes in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://advanceexpencetracker-default-rtdb.firebaseio.com/contact.json');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const result = await response.json();
        
        // Convert the Firebase data object into an array of contacts
        const contacts = result ? Object.keys(result).map((key) => ({ id: key, ...result[key] })) : [];
        setdata(contacts);
        console.log(contacts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        console.log('done');
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className='contactdiv1'>
      <div>
        <h2>Contact Detail</h2>
      </div>
      <form onSubmit={handleUpdate} className='ContactForm'>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={contactDetails.fullName}
            onChange={handleInputChange}
            required
            className='contactinput'
            placeholder='Full Name'
          />
        </label>
        <br />

        <label>
          Profile Photo URL:
          <input
            className='contactinput'
            type="text"
            name="photoLink"
            value={contactDetails.photoLink}
            onChange={handleInputChange}
            required
            placeholder='Profile Photo URL'
          />
        </label>
        <br />

        <button type="submit" className='contactbutton'>
          Update
        </button>
      </form>
      <div>
      <div>
        {data.map((contact) => (
          <div key={contact.id}>
            
            <p>Full Name: {contact.fullName}</p>
            <div className='profilepohotdiv'>
            <span >Profile Photo URL: <img className='profilepohot' src={contact.photoLink} alt="Profile" /></span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Profile;
