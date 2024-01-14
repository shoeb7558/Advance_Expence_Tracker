import React from 'react'
import './homeModule.css'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='homediv1'>
      <h1>Welcome to home page</h1>
      <h5>complete your profile <Link to='/Profile'>complete your profile</Link></h5>
    </div>
  )
}

export default Home
