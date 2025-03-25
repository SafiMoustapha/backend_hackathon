const express = require('express');
const { addReview, getAllReviews } = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');

const router = express.Router();

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier où enregistrer les fichiers
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Ajouter un avis (protégé par JWT)
router.post('/', protect, upload.single('document'), addReview);

// Obtenir tous les avis
router.get('/', getAllReviews);

module.exports = router;

console.log("Répertoire actuel :", __dirname);
try {
    console.log("Tentative de require :", require.resolve('../middlewares/authMiddleware'));
} catch (error) {
    console.log("Erreur lors de la résolution du chemin :", error);
}