import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../services/auth';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await logout(); // Call logout API
    setUser(null);
    navigate('/'); // Redirect to homepage
  };

  return (
    <header className="header">
      <Link to="/" className="logo">Logo</Link>

      <nav className="navbar">
        {user ? (
          <>
            <Link to="/DiscoverPage">Discover</Link>
            <Link to={`/ProfilePage/${user._id}`}>Profile</Link>
            <Link to="/ChatPage">Messages</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/">Home123</Link>
            <Link to="/AboutUs">About</Link>
            <Link to="/WhyUs">Why Us</Link>
            <Link to="/LoginRegister">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;