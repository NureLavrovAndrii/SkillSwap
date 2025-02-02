import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import "./ProfilePage.css";
import UserProfile from '../../Pages/UserProfile/UserProfile';
import { FaGithub, FaLinkedin, FaLink } from "react-icons/fa";

const ProfilePage = () => {
  const profile = {
    username: "Andryi Lox",
    bio: "Computer Science student specialising in data science and machine learning",
    skills: ["React.JS", "JavaScript"],
    socialLinks: {
      github: "#",
      linkedin: "#",
      website: "#",
    },
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <img src="/assets/images/ProfilePictureTest.jpg" alt="Profile" className="profile-pic" />
          <div className="profile-info">
            <h1>{profile.username}</h1>
            <div className="rating">⭐⭐⭐⭐⭐ (5)</div>
            <div className="buttons">
              <button className="connect-btn">Connect</button>
              <button className="report-btn">Report</button>
            </div>
          </div>
          <Link to={"/UserProfile"}>
            <button className="edit-profile-btn" >Edit Profile →</button>
          </Link>
        </div>

        <div className="profile-section">
          <h2>Bio</h2>
          <p>{profile.bio}</p>
        </div>

        <div className="profile-section">
          <h2>Skills Proficient At</h2>
          <div className="skills">
            {profile.skills.map((skill, index) => (
              <span key={index} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>

        <div className="profile-section social-links">
          <h2>Social Links</h2>
          <a href={profile.socialLinks.github} className="social-icon"><FaGithub /></a>
          <a href={profile.socialLinks.linkedin} className="social-icon"><FaLinkedin /></a>
          <a href={profile.socialLinks.website} className="social-icon"><FaLink /></a>
        </div>
      </div>
      <Routes>
        <Route path='/UserProfile' element={<UserProfile />} />
      </Routes>
    </div>
    
  );
};

export default ProfilePage;
