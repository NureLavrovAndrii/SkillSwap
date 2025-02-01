const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Who sent the message
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Who receives the message
    content: { type: String, required: true },  // Message text
    isRead: { type: Boolean, default: false },  // Has the message been read?
    createdAt: { type: Date, default: Date.now }  // Timestamp
});

module.exports = mongoose.model('Message', messageSchema);