require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');

// Importation des routes et modèles
const hospitalRoutes = require("./routes/hospitalRoutes");
const userRoutes = require("./routes/userRoutes");
const Avis = require("./models/Avis"); // Le modèle pour les avis
const Hopital = require("./models/Hospital");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Erreur: MONGO_URI n'est pas défini dans le fichier .env");
  process.exit(1);
}

// Connexion à MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch((err) => {
    console.error("❌ Erreur de connexion à MongoDB:", err);
    process.exit(1);
  });

// Middleware pour autoriser CORS
app.use(cors({
  origin: "*",  // ou une URL spécifique pour autoriser uniquement ton frontend
}));

// Middleware pour traiter les données JSON et les formulaires URL-encodés
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes pour les hôpitaux et les utilisateurs
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/users", userRoutes);

// Configuration de multer pour l'upload des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Dossier de destination pour les fichiers
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Nom du fichier
  }
});

const upload = multer({ storage: storage });

// Route pour soumettre un avis
app.post("/api/feedback", upload.single('document'), async (req, res) => {
  try {
    const { nom, email, hopital, hospitalId, avis, type_avis, note } = req.body;

    // Vérification que l'hôpital a bien été choisi
    if (!hopital || hopital.trim() === '') {
      return res.status(400).json({ message: "Veuillez sélectionner un hôpital valide !" });
    }

    // Si hospitalId est fourni, vérifier qu'il correspond à un hôpital existant
    if (hospitalId) {
      const hospital = await Hopital.findById(hospitalId);
      if (!hospital) {
        return res.status(400).json({ message: "L'hôpital sélectionné n'existe pas." });
      }
    }

    // Vérification des autres champs obligatoires
    if (!avis || !note || !type_avis) {
      return res.status(400).json({ message: "Les champs avis, type_avis et note sont obligatoires." });
    }

    // Créer un nouvel avis
    const nouveauAvis = new Avis({
      nom,
      email,
      hopital,
      hospitalId,  // hospitalId est maintenant optionnel
      avis,
      type_avis,
      note,
      document: req.file ? req.file.path : null  // Si un fichier est téléchargé, ajouter le chemin
    });

    // Sauvegarder l'avis dans la base de données
    await nouveauAvis.save();

    // Retourner une réponse de succès
    res.status(201).json({ success: true, message: "Avis soumis avec succès !" });
  } catch (error) {
    console.error("Erreur lors de la soumission de l'avis:", error);
    res.status(500).json({ message: "Erreur serveur lors de la soumission de l'avis", error: error.message });
  }
});

// Route pour récupérer les hôpitaux selon la recherche
app.get("/api/hospitals", async (req, res) => {
  try {
    const { search } = req.query;
    console.log("Recherche envoyée par le frontend:", search); // Log pour voir ce que le frontend envoie

    const hopitaux = await Hopital.find({
      name: { $regex: search, $options: "i" },
    }).select("_id name");

    console.log("Hôpitaux trouvés:", hopitaux); // Log pour voir ce que la base de données renvoie

    if (hopitaux.length === 0) {
      return res.status(404).json({ message: "Aucun hôpital trouvé" });
    }

    res.json({ hospitals: hopitaux });
  } catch (error) {
    console.error("Erreur lors de la recherche des hôpitaux:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});


// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
