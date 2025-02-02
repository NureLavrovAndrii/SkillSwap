'use strict';
require('dotenv').config();
const express = require('express');
const http = require('http');  // Required for WebSockets
const { Server } = require('socket.io');  // Import Socket.IO
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const adminRoutes = require('./routes/admin');
const searchRoutes = require('./routes/search');
const messageRoutes = require('./routes/messages');
const feedbackRoutes = require('./routes/feedback');

const User = require('./models/User');
const BarterExchange = require('./models/BarterExchange');
const Message = require('./models/Message');
const Feedback = require('./models/Feedback');

const app = express();
const server = http.createServer(app);  // Create HTTP Server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001', credentials: true }  // Adjust for frontend
});

app.use(cors({
    origin: 'http://localhost:3001',  // Ensure this matches the frontend port
    credentials: true,  // Allows cookies & authentication headers
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(cors({ credentials: true, origin: process.env.FRONT_PORT }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/feedback', feedbackRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected successfully');
        await ensureCollections(); // Check and create collections if needed
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Ensure Collections Exist
async function ensureCollections() {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);

    if (!collectionNames.includes('users')) await User.createCollection();
    if (!collectionNames.includes('barterexchanges')) await BarterExchange.createCollection();
    if (!collectionNames.includes('messages')) await Message.createCollection();
    if (!collectionNames.includes('feedbacks')) await Feedback.createCollection();

    console.log('Collections verified and ready.');
}

// WebSocket Connection Handling
io.on('connection', (socket) => {
    console.log(`New user connected: ${socket.id}`);

    socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their private room`);
    });

    socket.on('sendMessage', async ({ senderId, receiverId, content }) => {
        const message = new Message({ sender: senderId, receiver: receiverId, content });

        await message.save();
        io.to(receiverId).emit('newMessage', message);  // Send to recipient
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Error Handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error.message || 'Internal Server Error',
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };