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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile('me');
                const socialLinks = Object.values(data.socialLinks).filter(link => link).join(', ');
                setProfile({ ...data, links: socialLinks });
            } catch (err) {
                setError('Failed to load profile. Try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleImageChange = async (e) => {
        const filePath = e.target.files[0]?.path;
        if (!filePath) return;

        try {
            const response = await uploadProfilePicture(filePath);
            setProfile({ ...profile, profilePicture: response.profilePicture });
        } catch (err) {
            setError('Failed to upload image.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const linksArray = profile.links.split(',').map(link => link.trim());
        const updatedSocialLinks = {
            github: linksArray[0] || "",
            linkedin: linksArray[1] || "",
            website: linksArray[2] || ""
        };

        try {
            await updateProfile({ ...profile, socialLinks: updatedSocialLinks });
            alert('Profile updated successfully!');
            navigate('/ProfilePage/' + profile.user._id);
        } catch (err) {
            setError('Failed to update profile.');
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="edit-wrapper">
            <div className={`user-wrapper`}>
                <div className="form-box login">
                    <form onSubmit={handleSubmit && handleImageChange}>
                        <h1>Edit profile</h1>
                        <div className="profile-image">
                            <label htmlFor="imageUpload">
                                <input type="file" id="imageUpload" accept="image/*" />
                                {profile.profilePicture ? (
                                    <img src={profile.profilePicture} alt="Profile" />
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
