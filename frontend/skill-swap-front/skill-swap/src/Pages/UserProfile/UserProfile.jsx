import React, { useState } from 'react';
import './UserProfile.css';
import { FaUser, FaCamera, FaEnvelope, FaInfoCircle, FaCode, FaLink } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Routes, Route, Link } from 'react-router-dom';

const UserProfile = () => {
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="edit-wrapper">
        <div className={`user-wrapper`}>
            <div className="form-box login">
                <form action="">
                    <h1>Edit profile</h1>
                    
                    <div className="profile-image">
                        <label htmlFor="imageUpload">
                            <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} />
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" />
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
                                    <input type="text" placeholder='Username' required/>
                                    <FaUser className='icon' />
                                </div>
                            </div>
                            <div className="input-container">
                                <p>Email</p>
                                <div className="input-box">
                                    <input type="email" placeholder='Email' required/>
                                    <FaEnvelope className='icon' />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="input-container">
                                <p>Link</p>
                                <div className="input-box">
                                    <input type="url" placeholder='Link' required/>
                                    <FaLink className='icon' />
                                </div>
                            </div>
                            <div className="input-container">
                                <p>Location</p>
                                <div className="input-box">
                                    <input type="text" placeholder='Link' required/>
                                    <FaLocationDot className='icon' />
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="input-container">
                        <p>Skills</p>
                        <div className="input-box">
                            <input type="text" placeholder='Skills' required/>
                            <FaCode className='icon' />
                        </div>
                    </div>

                    <div className="input-container bio" >
                        <p>Bio (Max 500 Character)</p>
                        <div className="input-box">
                            <textarea type="text" placeholder='Bio' required/>
                            <FaInfoCircle className='icon' />
                        </div>
                    </div>

                    <button type="submit">Edit</button>
                    <Link to={"/WhyUs"}>
                        <button type="button">Cancel</button>
                    </Link>
                    
                </form>
            </div>
        </div>
        </div>
    );
};

export default UserProfile;
