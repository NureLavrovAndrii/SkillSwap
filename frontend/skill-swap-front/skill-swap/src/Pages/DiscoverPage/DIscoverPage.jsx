import React, { useState, useEffect } from "react";
import "./DiscoverPage.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import api from "../../api"; // Import axios instance

const popularSkills = ["React.js", "JavaScript", "Python", "Django", "Flutter", "AI", "ML", "Node.js", "CSS"];

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]); // State for user profiles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/search"); // API call to fetch profiles
        setUsers(response.data.results);
      } catch (err) {
        setError("Failed to fetch users. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="discover-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Popular Skills</h2>
        <ul>
          {popularSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
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
        </div>

        {/* Display Loading or Error Messages */}
        {loading ? <p>Loading profiles...</p> : error ? <p className="error">{error}</p> : null}

        {/* User Profiles List */}
        <div className="profiles-container">
          {filteredUsers.map((profile) => (
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