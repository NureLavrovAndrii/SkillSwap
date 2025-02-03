const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// REGISTER ROUTE
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        const defaultProfile = new Profile({
            user: user._id,
            bio: "This user has not added a bio yet.",
            skills: [],
            location: "Not specified",
            socialLinks: { github: "", linkedin: "", website: "" },
            profilePicture: ""
        });

        await defaultProfile.save(); // Save profile

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role }, // Include role in token
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,  // Prevents JavaScript access (secure)
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'strict' // Prevents CSRF attacks
        });

        res.json({ message: 'Login successful' });

    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Remove password field
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

module.exports = router;