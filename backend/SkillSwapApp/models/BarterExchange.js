const mongoose = require('mongoose');

const barterExchangeSchema = new mongoose.Schema({
    userSender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userReceiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceOffered: { type: String, required: true },
    serviceRequested: { type: String, required: true },
    status: { type: String, enum: ['proposed', 'in progress', 'completed'], default: 'proposed' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BarterExchange', barterExchangeSchema);