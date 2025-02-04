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
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showReviews, setShowReviews] = useState(false); // 📌 Додаємо стан

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [profileRes, userRes, feedbackRes] = await Promise.all([
          api.get(`/profile/${userId}`), // Get profile by userId
          getCurrentUser(), // Get logged-in user
          api.get(`/feedback/${userId}`)
        ]);

        setProfile(profileRes.data);
        setCurrentUser(userRes);
        setFeedbacks(feedbackRes.data);
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
        {/* 📌 Блок з фото і загальною інфою */}
        <div className="profile-header">
          <img 
            src={profile.profilePicture ? `http://localhost:3000${profile.profilePicture}` : "/assets/images/ProfilePictureTest.jpg"} 
            alt="Profile" 
            className="profile-pic" 
          />
          <div className="profile-info">
            <h1>{profile.user.name}</h1>
            <div className="rating">⭐⭐⭐⭐⭐ (5)</div>
            <div className="reviews-link">
              <a href="#" onClick={(e) => { e.preventDefault(); setShowReviews(!showReviews); }}>
                {showReviews ? "Hide reviews" : "Show reviews"}
              </a>
            </div>
            {currentUser && currentUser._id != profile.user._id && (
              <div className="buttons">
              <button className="connect-btn">Connect</button>
              <button className="report-btn">Report</button>
            </div>
            )}
          </div>

          {/* ✅ Повертаю кнопку редагування профілю в правильне місце */}
          {currentUser && currentUser._id === profile.user._id && (
            <Link to="/UserProfile">
              <button className="edit-profile-btn">Edit Profile →</button>
            </Link>
          )}
        </div>

        {/* 📌 Основні секції профілю */}
        <div className="profile-section">
          <h2>Location</h2>
          <p className="location-text">{profile.location || "No location available"}</p>
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

        {/* 📌 Вікно з відгуками */}
        <div className={`reviews-container ${showReviews ? "show" : ""}`}>
          <h2>Reviews</h2>
          <ul>
            {feedbacks.length > 0 ? (
              feedbacks.map((review, index) => (
                <li key={index} className="review-item">
                  <strong>{review.reviewer?.name || "Anonymous"}</strong>: {review.comment}
                  <div className="rating">Rating: {review.rating} ⭐</div>
                  <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                </li>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </ul>
        </div>


        {/* 📌 Соціальні посилання */}
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
