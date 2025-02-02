import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const isConfirmed = window.confirm("Ви точно хочете вийти?");
    if (isConfirmed) {
      await logout(); // Call logout API
      setUser(null);
      navigate('/LoginRegister'); // Redirect to Login/Register page
    }
  };

  return (
    <header className="header">
      <Link to="/" className="logo">SkillSwap</Link>

      <nav className="navbar">
        {user ? (
          <>
            <Link to="/DiscoverPage">Discover</Link>
            <Link to={`/ProfilePage/${user._id}`}>Profile</Link>
            <Link to="/ChatPage">Messages</Link>
            <Link onClick={handleLogout} className="logout-btn">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
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