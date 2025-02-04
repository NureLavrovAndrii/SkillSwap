import React, { useState, useEffect } from "react";
import "./DiscoverPage.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { searchUsers, advancedSearchUsers } from "../../services/search";
import api from "../../api";

const popularSkills = ["React", "JavaScript", "Python", "Django", "Flutter", "AI", "ML", "Node.js", "CSS"];

const DiscoverPage = () => {
  const [searchQueryAdvanced, setSearchQueryAdvanced] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [location, setLocation] = useState("");
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]); // State for storing all users initially
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Завантаження всіх користувачів при відкритті сторінки
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
  

  const handleSearchAdvanced = async (query = "", skills = [], loc = "") => {
    setLoading(true);
    setError("");
    try {
      const results = await advancedSearchUsers(query, skills, loc);
      setUsers(results);
    } catch (err) {
      setError("Failed to fetch users. Try again later.");
    } finally {
      setLoading(false);
    }
  };

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

  // Оновлення фільтрів
  const handleFilterChange = () => {
    handleSearchAdvanced(searchQueryAdvanced, selectedSkills, location);
  };

  // Обробка вибору навичок
  const toggleSkill = (skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill) ? prevSkills.filter((s) => s !== skill) : [...prevSkills, skill]
    );
  };

  return (
    <div className="discover-container">
      {/* Бокова панель */}
      <aside className="discover-sidebar">
        <h2>Filter by Skills</h2>
        <ul>
          {popularSkills.map((skill, index) => (
            <li key={index} className={`skill-item ${selectedSkills.includes(skill) ? "selected" : ""}`} onClick={() => toggleSkill(skill)}>
              <input type="checkbox" checked={selectedSkills.includes(skill)} readOnly /> {skill}
            </li>
          ))}
        </ul>

        <h2>Location</h2>
        <input
          type="text"
          placeholder="Enter location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="location-input"
        />

        <button onClick={handleFilterChange} className="apply-filters">Apply Filters</button>
      </aside>

      {/* Основний контент */}
      <main className="content">
        {/* Поле пошуку */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="search-button">
            <FaSearch size={"1.5em"} />
          </button>
        </div>

        {/* Відображення статусу завантаження або помилки */}
        {loading && <p>Loading profiles...</p>}
        {error && <p className="error">{error}</p>}

        {/* Відображення списку користувачів */}
        <div className="profiles-container">
          {users.map((profile) => (
            <div key={profile._id} className="user-card">
              <img 
                src={profile.profilePicture ? `http://localhost:3000${profile.profilePicture}` : "/assets/images/ProfilePictureTest.jpg"}
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
              <div className="interact-container">
                <Link to={`/ChatPage`} className="view-profile connect">Connect</Link>
                <Link to={`/ProfilePage/${profile.user._id}`} className="view-profile">View Profile</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DiscoverPage;
