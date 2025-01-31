const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin-only route
router.get('/dashboard', authMiddleware, isAdmin, (req, res) => {
    res.json({ message: 'Welcome Admin, you have full access!' });
});

module.exports = router;