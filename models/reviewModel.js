const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hospital: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    document: { type: String, required: true }, // Stockera le nom du fichier
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
