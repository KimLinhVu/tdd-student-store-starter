import * as React from 'react'
import './Navbar.css'
import { Logo } from './Logo'
import { Link } from 'react-router-dom'

export default function Navbar ({ isOpen }) {
  return (
    <nav className={isOpen === true ? 'navbar-open' : 'navbar'}>
      <Logo />
      <div className="links">
        <Link to="/">Home</Link>
        <a href='/#about'>About Us</a>
        <a href="/#contact">Contact Us</a>
        <Link to="/orders">Past Orders</Link>
      </div>
    </nav>
  )
}
