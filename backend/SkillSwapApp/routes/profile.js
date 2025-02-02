const express = require('express');
const Profile = require('../models/Profile');
const authMiddleware = require('../middleware/authMiddleware');
const upload= require('../middleware/uploadMiddleware');


const router = express.Router();

/**
 * @route   POST /api/profile
 * @desc    Create or Update User Profile
 * @access  Private
 */
router.post('/', authMiddleware, async (req, res) => {
    const { bio, skills, location, socialLinks, profilePicture } = req.body;

    try {
        let profile = await Profile.findOne({ user: req.user.userId });

        if (profile) {
            // Update profile
            profile.bio = bio || profile.bio;
            profile.skills = skills || profile.skills;
            profile.location = location || profile.location;
            profile.socialLinks = { ...profile.socialLinks, ...socialLinks };

            await profile.save();
            return res.json(profile);
        }

        // Create a new profile
        profile = new Profile({
            user: req.user.userId,
            bio,
            skills,
            location,
            socialLinks,
        });

        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

/**
 * @route   GET /api/profile/me
 * @desc    Get Current User Profile
 * @access  Private
 */
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.userId }).populate('user', ['name', 'email']);

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

/**
 * @route   PUT /api/profile
 * @desc    Update Profile Details
 * @access  Private
 */
router.put('/', authMiddleware, async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate(
            { user: req.user.userId },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

/**
 * @route   DELETE /api/profile
 * @desc    Delete Profile & User
 * @access  Private
 */
router.delete('/', authMiddleware, async (req, res) => {
    try {
        await Profile.findOneAndDelete({ user: req.user.userId });
        res.json({ message: 'Profile deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

/**
 * @route   POST /api/profile/upload
 * @desc    Upload Profile Picture
 * @access  Private
 */
router.post('/upload', authMiddleware, upload.single('profilePicture'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const profile = await Profile.findOneAndUpdate(
            { user: req.user.userId },
            { profilePicture: `/uploads/${req.file.filename}` }, // Save file path in DB
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        res.json({ message: 'Profile picture updated', profilePicture: profile.profilePicture });
    } catch (error) {
        res.status(500).json({ error: 'File upload failed' });
    }
});

/**
 * @route   GET /api/profile/:userId
 * @desc    Get profile by user ID
 * @access  Public
 */
router.get('/:userId', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.userId }).populate('user', ['name', 'email']);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;