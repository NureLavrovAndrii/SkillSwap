'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const User = require('./models/User');
const BarterExchange = require('./models/BarterExchange');
const Message = require('./models/Message');
const Feedback = require('./models/Feedback');

const app = express();

async function ensureCollections() {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);

    // Create collections only if they don't exist
    if (!collectionNames.includes('users')) await User.createCollection();
    if (!collectionNames.includes('barterexchanges')) await BarterExchange.createCollection();
    if (!collectionNames.includes('messages')) await Message.createCollection();
    if (!collectionNames.includes('feedbacks')) await Feedback.createCollection();

    console.log('Collections are verified and ready.');
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected.');
        await ensureCollections(); // Check and create collections if needed
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
//app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); // Adjust for frontend
app.use(express.json());
app.use(cookieParser()); // Enables cookie parsing

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
