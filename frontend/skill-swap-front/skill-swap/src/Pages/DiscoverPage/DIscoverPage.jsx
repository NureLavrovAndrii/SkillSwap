import React, { useState, useEffect } from "react";
import "./DiscoverPage.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { searchUsers } from "../../services/search"; // Import search service
import api from "../../api"; // Import main API instance

const popularSkills = ["React", "JavaScript", "Python", "Django", "Flutter", "AI", "ML", "Node.js", "CSS"];

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]); // State for displaying users
  const [allUsers, setAllUsers] = useState([]); // State for storing all users initially
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all users on page load
  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/search"); // Fetch all users initially
        setUsers(response.data.results);
        setAllUsers(response.data.results); // Store initial users
      } catch (err) {
        setError("Failed to fetch users. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  // Handle search when the button is clicked
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setUsers(allUsers); // If search is empty, reset to all users
      return;
    }

    setLoading(true);
    setError("");

    try {
      const results = await searchUsers(searchQuery);
      setUsers(results);
    } catch (err) {
      setError("Failed to fetch users. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search by skill when a skill in sidebar is clicked
  const handleSkillClick = async (skill) => {
    setLoading(true);
    setError("");

    try {
      const results = await searchUsers(skill); // Search users by skill
      setUsers(results);
    } catch (err) {
      setError("Failed to fetch users. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="discover-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Popular Skills</h2>
        <ul>
          {popularSkills.map((skill, index) => (
            <li key={index} className="skill-item" onClick={() => handleSkillClick(skill)}>
              {skill}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        {/* Search Bar */}
        <div className="search-bar">
          <input 
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="search-button">
            <FaSearch />
          </button>
        </div>

        {/* Display Loading or Error Messages */}
        {loading && <p>Loading profiles...</p>}
        {error && <p className="error">{error}</p>}

        {/* User Profiles List */}
        <div className="profiles-container">
          {users.map((profile) => (
            <div key={profile._id} className="user-card">
              <img 
                src={profile.profilePicture ? `/uploads/${profile.profilePicture}` : "https://via.placeholder.com/150"}
                alt={profile.user.name} 
                className="user-avatar" 
              />
              <div className="user-info">
                <h4>{profile.user.name}</h4>
                <p className="user-bio">{profile.bio}</p>
              </div>
              <div className="user-skills">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="skill-badge">{skill}</span>
                ))}
              </div>
              <Link to={`/profile/${profile.user._id}`} className="view-profile">
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DiscoverPage;
