import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginRegister from '../../Pages/LoginRegister/LoginRegister';
import LandingPage from '../../Pages/LandingPage/LandingPage';
import AboutUs from '../../Pages/AboutUs/AboutUs';
import UserProfile from '../../Pages/UserProfile/UserProfile';
import DiscoverPage from '../../Pages/DiscoverPage/DIscoverPage';
import ProfilePage from '../../Pages/ProfilePage/ProfilePage';
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