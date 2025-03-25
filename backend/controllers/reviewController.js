const Review = require('../models/reviewModel');

// Ajouter un avis
const addReview = async (req, res) => {
    const { hospital, rating, comment } = req.body;
    const document = req.file.filename;

    try {
        const review = await Review.create({
            user: req.user.id,
            hospital,
            rating,
            comment,
            document
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Obtenir tous les avis
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('user', 'name email');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

module.exports = { addReview, getAllReviews };
