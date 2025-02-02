import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProfilePage.css";
import { FaGithub, FaLinkedin, FaLink } from "react-icons/fa";
import api from "../../api"; // Axios instance
import { getCurrentUser } from "../../services/auth"; // Get logged-in user

const ProfilePage = () => {
  const { userId } = useParams(); // Get profile ID from URL
  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch both profile data and logged-in user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [profileRes, userRes] = await Promise.all([
          api.get(`/profile/${userId}`), // Get profile by userId
          getCurrentUser(), // Get logged-in user
        ]);

        setProfile(profileRes.data);
        setCurrentUser(userRes);
      } catch (err) {
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <img 
            src={profile.profilePicture ? profile.profilePicture : "/assets/images/ProfilePictureTest.jpg"} 
            alt="Profile" 
            className="profile-pic" 
          />
          <div className="profile-info">
            <h1>{profile.user.name}</h1>
            <div className="rating">⭐⭐⭐⭐⭐ (5)</div>
            <div className="buttons">
              <button className="connect-btn">Connect</button>
              <button className="report-btn">Report</button>
            </div>
          </div>

          {/* ✅ Show Edit Profile button only if it's the logged-in user's profile */}
          {currentUser && currentUser._id === profile.user._id && (
            <Link to="/UserProfile">
              <button className="edit-profile-btn">Edit Profile →</button>
            </Link>
          )}
        </div>

        <div className="profile-section">
          <h2>Bio</h2>
          <p>{profile.bio || "No bio available."}</p>
        </div>

        <div className="profile-section">
          <h2>Skills</h2>
          <div className="skills">
            {profile.skills.length > 0 ? (
              profile.skills.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))
            ) : (
              <p>No skills listed.</p>
            )}
          </div>
        </div>

        <div className="profile-section social-links">
          <h2>Social Links</h2>
          {profile.socialLinks ? (
            <>
              {profile.socialLinks.github && <a href={profile.socialLinks.github} className="social-icon"><FaGithub /></a>}
              {profile.socialLinks.linkedin && <a href={profile.socialLinks.linkedin} className="social-icon"><FaLinkedin /></a>}
              {profile.socialLinks.website && <a href={profile.socialLinks.website} className="social-icon"><FaLink /></a>}
            </>
          ) : (
            <p>No social links available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;