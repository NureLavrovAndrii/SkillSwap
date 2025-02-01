const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who gave the feedback
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who is being reviewed
    rating: { type: Number, required: true, min: 1, max: 5 }, // 1-5 rating
    comment: { type: String, maxlength: 500 }, // Optional review text
    createdAt: { type: Date, default: Date.now } // Timestamp
});

// Prevent duplicate feedback from the same reviewer
feedbackSchema.index({ reviewer: 1, recipient: 1 }, { unique: true });

module.exports = mongoose.model('Feedback', feedbackSchema);