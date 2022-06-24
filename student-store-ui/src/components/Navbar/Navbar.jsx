import * as React from 'react'
import './Navbar.css'
import { Logo } from './Logo'
import { Link } from 'react-router-dom'

export default function Navbar ({ isOpen }) {
  return (
    <nav className={isOpen === true ? 'navbar-open' : 'navbar'}>
      <Logo />
      <ul className="links">
        <Link to="/">Home</Link>
        <Link to="/">About Us</Link>
        <Link to="/">Contact Us</Link>
        <Link to="/">Buy Now</Link>
      </ul>
    </nav>
  )
}
