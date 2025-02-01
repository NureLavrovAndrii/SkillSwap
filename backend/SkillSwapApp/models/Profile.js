const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    bio: { type: String, maxlength: 500 },
    skills: [{ type: String }],
    location: { type: String },
    socialLinks: {
        linkedin: { type: String },
        github: { type: String },
        twitter: { type: String }
    },
    profilePicture: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Profile', profileSchema);