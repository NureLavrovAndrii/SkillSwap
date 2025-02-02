import React, { useState } from "react";
import "./DiscoverPage.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

// Фейкові дані користувачів
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    bio: "Frontend Developer with a passion for UI/UX.",
    skills: ["React.js", "JavaScript", "CSS", "Figma", "TypeScript"],
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    bio: "Full-Stack Developer and AI Enthusiast.",
    skills: ["Python", "Django", "Machine Learning", "React.js", "Node.js"],
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Emily Davis",
    bio: "Mobile App Developer specializing in Flutter.",
    skills: ["Dart", "Flutter", "Firebase", "Android", "iOS"],
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const popularSkills = ["React.js", "JavaScript", "Python", "Django", "Flutter", "AI", "ML", "Node.js", "CSS"];

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Фільтрація анкет по пошуку
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="discover-container">
      {/* Бокове меню */}
      <aside className="sidebar">
        <h2>Popular Skills</h2>
        <ul>
          {popularSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </aside>

      {/* Основний контент */}
      <main className="content">
        {/* Поле пошуку */}
        <div className="search-bar">
            <input 
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}>
            </input>
            
        </div>

        {/* Список анкет */}
        <div className="profiles-container">
          {filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <div className="user-info">
                <h4>{user.name}</h4>
                <p className="user-bio">{user.bio}</p>
              </div>
              <div className="user-skills">
                {user.skills.map((skill, index) => (
                  <span key={index} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
              <Link to={`/profile/${user.id}`} className="view-profile">
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
