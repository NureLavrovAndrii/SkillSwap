import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { FaUser, FaCamera, FaEnvelope, FaInfoCircle, FaCode, FaLink } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile, uploadProfilePicture } from '../../services/profile';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        user: { name: '', email: '' },
        location: '',
        skills: '',
        bio: '',
        links: '',
        profilePicture: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile('me');

                setProfile({
                    user: {
                        name: data.user?.name || "",
                        email: data.user?.email || "",
                    },
                    location: data.location || "",
                    skills: Array.isArray(data.skills) ? data.skills.join(", ") : "",
                    bio: data.bio || "",
                    links: Object.values(data.socialLinks || {}).filter(link => link).join(', '),
                    profilePicture: data.profilePicture || ""
                });
            } catch (err) {
                setError('Failed to load profile. Try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "name" || name === "email") {
            setProfile((prevProfile) => ({
                ...prevProfile,
                user: { ...prevProfile.user, [name]: value }
            }));
        } else {
            setProfile({ ...profile, [name]: value });
        }

    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setProfile({ ...profile, profilePicture: URL.createObjectURL(file) });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let uploadedPicturePath = profile.profilePicture; // Default to existing picture
            
            // ✅ Upload the image **only if a new file is selected**
            if (selectedFile) {
                const response = await uploadProfilePicture(selectedFile);
                uploadedPicturePath = response.profilePicture; // Update with new uploaded path
            }

            await updateProfile({
                ...profile,
                profilePicture: uploadedPicturePath // ✅ Send correct image path
            });

            alert("Profile updated successfully!");
            navigate("/ProfilePage/" + profile.user._id);
        } catch (err) {
            setError("Failed to update profile.");
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="edit-wrapper">
            <div className={`user-wrapper`}>
                <div className="form-box login">
                    <form onSubmit={handleSubmit}>
                        <h1>Edit profile</h1>
                        <div className="profile-image">
                            <label htmlFor="imageUpload">
                                <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange}/>
                                {profile.profilePicture ? (
                                    <img src={profile.profilePicture ? `http://localhost:3000${profile.profilePicture}` : "/assets/images/ProfilePictureTest.jpg"} alt="Profile" />
                                ) : (
                                    <FaCamera className="icon" />
                                )}
                            </label>
                        </div>
                        <div className="form-grid">
                            <div className="column">
                                <div className="input-container">
                                    <p>Username</p>
                                    <div className="input-box">
                                        <input type="text" name="name" value={profile.user.name} onChange={handleChange} required />
                                        <FaUser className='icon' />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <p>Email</p>
                                    <div className="input-box">
                                        <input type="email" name="email" value={profile.user.email} onChange={handleChange} required />
                                        <FaEnvelope className='icon' />
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="input-container">
                                    <p>Links</p>
                                    <div className="input-box">
                                        <input type="url" name="socialLinks.website" value={profile.links} onChange={handleChange} required />
                                        <FaLink className='icon' />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <p>Location</p>
                                    <div className="input-box">
                                        <input type="text" name="location" value={profile.location} onChange={handleChange} required />
                                        <FaLocationDot className='icon' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="input-container">
                            <p>Skills</p>
                            <div className="input-box">
                                <input type="text" name="skills" value={profile.skills} onChange={handleChange} required />
                                <FaCode className='icon' />
                            </div>
                        </div>
                        <div className="input-container bio">
                            <p>Bio (Max 500 Characters)</p>
                            <div className="input-box">
                                <textarea name="bio" value={profile.bio} onChange={handleChange} required />
                                <FaInfoCircle className='icon' />
                            </div>
                        </div>
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
