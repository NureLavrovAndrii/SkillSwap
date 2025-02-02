import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <>
      <header className="header">
          <Link to="/DiscoverPage" className="logo">Logo</Link>

          <nav className="navbar">
             <Link to="/">Home</Link>
             <Link to="/AboutUs">About</Link>
             <Link to="/WhyUs">Why us</Link>
             <Link to="/LoginRegister">Login</Link>
         </nav>

      </header>
      
    </>
  )
}

export default Navbar