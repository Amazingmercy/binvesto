const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['Stock', 'Bond', 'Mutual Fund', 'Crypto'], required: true },
    name: { type: String, required: true }, // e.g., "Apple Inc.", "US Treasury Bond"
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);