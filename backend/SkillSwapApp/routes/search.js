const express = require('express');
const Profile = require('../models/Profile');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @route   GET /api/search
 * @desc    Search for users by name, skills, or location
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const { query, page = 1, limit = 10 } = req.query;

        // Build search criteria
        const searchCriteria = {
            $or: [
                { 'user.name': new RegExp(query, 'i') }, // Case-insensitive name search
                { skills: new RegExp(query, 'i') }, // Search in skills
                { location: new RegExp(query, 'i') } // Search by location
            ]
        };

        // Paginate results
        const profiles = await Profile.find(searchCriteria)
            .populate('user', 'name email') // Include user details
            .limit(limit * 1) // Convert string to number
            .skip((page - 1) * limit);

        res.json({ results: profiles, page, total: profiles.length });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/advanced', async (req, res) => {
    try {
        const { query, skills, location, page = 1, limit = 10 } = req.query;
        let searchCriteria = {};

        if (query) {
            searchCriteria.$or = [
                { 'user.name': new RegExp(query, 'i') },
                { location: new RegExp(query, 'i') }
            ];
        }

        if (skills) {
            searchCriteria.skills = { $in: skills.split(',') }; // Match any listed skill
        }

        if (location) {
            searchCriteria.location = new RegExp(location, 'i'); // Case-insensitive
        }

        const profiles = await Profile.find(searchCriteria)
            .populate('user', 'name email')
            .limit(limit * 1)
            .skip((page - 1) * limit);

        res.json({ results: profiles, page, total: profiles.length });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;