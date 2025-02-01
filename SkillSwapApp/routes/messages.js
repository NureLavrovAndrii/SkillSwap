const express = require('express');
const Message = require('../models/Message');
const authMiddleware = require('../middleware/authMiddleware');
const { io } = require('../app');  // Import Socket.IO instance

const router = express.Router();

/**
 * @route   POST /api/messages
 * @desc    Send a message and notify recipient in real-time
 * @access  Private
 */
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { receiverId, content } = req.body;

        if (!receiverId || !content) {
            return res.status(400).json({ error: 'Receiver and content are required' });
        }

        const message = new Message({
            sender: req.user.userId,
            receiver: receiverId,
            content
        });

        await message.save();

        // Emit real-time event to recipient
        io.to(receiverId).emit('newMessage', message);

        res.status(201).json({ message: 'Message sent successfully', data: message });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

/**
 * @route   GET /api/messages
 * @desc    Get all messages for the logged-in user
 * @access  Private
 */
router.get('/', authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [{ sender: req.user.userId }, { receiver: req.user.userId }]
        }).sort({ createdAt: -1 });

        res.json({ messages });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});


/**
 * @route   GET /api/messages/:userId
 * @desc    Get message history between the logged-in user and another user
 * @access  Private
 */
router.get('/:userId', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;

        const messages = await Message.find({
            $or: [
                { sender: req.user.userId, receiver: userId },
                { sender: userId, receiver: req.user.userId }
            ]
        }).sort({ createdAt: 1 }); // Sort from oldest to newest

        res.json({ messages });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});


/**
 * @route   PUT /api/messages/read/:userId
 * @desc    Mark all messages from a specific user as read
 * @access  Private
 */
router.put('/read/:userId', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;

        await Message.updateMany(
            { sender: userId, receiver: req.user.userId, isRead: false },
            { isRead: true }
        );

        res.json({ message: 'Messages marked as read' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;