import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export const Logo = () => {
  return (
    <div className='logo'>
      <Link to="/">
        <img src="../cabin.svg" alt="welcome logo"/>
      </Link>
    </div>
  )
}
