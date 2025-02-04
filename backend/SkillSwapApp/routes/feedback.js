const express = require('express');
const Feedback = require('../models/Feedback');
const authMiddleware = require('../middleware/authMiddleware');
const mongoose = require("mongoose");

const router = express.Router();

/**
 * @route   POST /api/feedback
 * @desc    Submit feedback for a user
 * @access  Private
 */
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { recipientId, rating, comment } = req.body;

        if (!recipientId || !rating) {
            return res.status(400).json({ error: 'Recipient and rating are required' });
        }

        if (recipientId === req.user.userId) {
            return res.status(400).json({ error: 'You cannot rate yourself' });
        }

        const feedback = new Feedback({
            reviewer: req.user.userId,
            recipient: recipientId,
            rating,
            comment
        });

        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted', feedback });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'You have already reviewed this user' });
        }
        res.status(500).json({ error: 'Server Error' });
    }
});

/**
 * @route   GET /api/feedback/:userId
 * @desc    Get feedbacks for a specific user
 * @access  Public
 */
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const feedbacks = await Feedback.find({ recipient: userId }) // ? Corrected field name
            .populate("reviewer", "name"); // ? Populate reviewer's name


        res.json(feedbacks);
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ error: "Server Error" });
    }
});


/**
 * @route   GET /api/feedback/average/:userId
 * @desc    Get the average rating for a specific user
 * @access  Public
 */
router.get("/average/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // ? Convert `userId` to a MongoDB ObjectId
        const recipientId = new mongoose.Types.ObjectId(userId);

        // ? Aggregate to calculate average rating
        const result = await Feedback.aggregate([
            { $match: { recipient: recipientId } }, // ? Match as ObjectId
            { $group: { _id: "$recipient", averageRating: { $avg: "$rating" } } }
        ]);

        // ? Ensure average rating is returned properly
        const averageRating = result.length > 0 ? result[0].averageRating.toFixed(1) : null;

        res.json({ averageRating: averageRating || "No ratings yet" });
    } catch (error) {
        console.error("Error calculating average rating:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

/**
 * @route   DELETE /api/feedback/:id
 * @desc    Delete feedback (only by the reviewer)
 * @access  Private
 */
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const feedback = await Feedback.findOneAndDelete({ _id: req.params.id, reviewer: req.user.userId });

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found or unauthorized' });
        }

        res.json({ message: 'Feedback deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;