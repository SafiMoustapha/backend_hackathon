require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch((err) => {
    console.error("❌ Erreur de connexion à MongoDB:", err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes pour récupérer les hôpitaux
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/users", userRoutes);

// Route pour soumettre un avis
app.post('/api/feedback', (req, res) => {
  console.log("Données reçues par le backend:", req.body);
});

app.post("/api/feedback", async (req, res) => {
  try {
      const { hopital, commentaire, note } = req.body;

      if (!hopital || !commentaire || !note) {
          return res.status(400).json({ message: "Les champs hopital, commentaire et note sont requis" });
      }

      const nouveauAvis = new Avis({
          hopital,
          commentaire,
          note,
      });

      await nouveauAvis.save();
      res.status(201).json({ success: true, message: "Avis soumis avec succès!" });
  } catch (error) {
      console.error("Erreur lors de la soumission de l'avis:", error);
      res.status(500).json({ message: "Erreur serveur lors de la soumission de l'avis", error: error.message });
  }
});

// Route pour récupérer les hôpitaux selon la recherche
app.get("/api/hospitals", async (req, res) => {
  try {
    const { search } = req.query;
    const hopitaux = await Hopital.find({
      name: { $regex: search, $options: 'i' } 
    });

    if (hopitaux.length === 0) {
      return res.status(404).json({ message: "Aucun hôpital trouvé" });
    }

    res.json({ hospitals: hopitaux });
  } catch (error) {
    console.error("Erreur lors de la recherche des hôpitaux:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
