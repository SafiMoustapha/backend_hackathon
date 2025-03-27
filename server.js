require("dotenv").config(); // Charger les variables d'environnement en premier

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const hospitalRoutes = require("./routes/hospitalRoutes");
const userRoutes = require("./routes/userRoutes");
const Hopital = require("./models/Hospital");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Vérification de la présence de l'URI MongoDB
if (!MONGO_URI) {
  console.error("❌ Erreur: MONGO_URI n'est pas défini dans le fichier .env");
  process.exit(1);
}

// ✅ Connexion à MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch((err) => {
    console.error("❌ Erreur de connexion à MongoDB:", err);
    process.exit(1);
  });


// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/users", userRoutes);

// ✅ Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

app.get("/hopitaux", async (req, res) => {
  try {
    const count = await Hopital.countDocuments();
    console.log(`Nombre d'hôpitaux dans la base : ${count}`);

    if (count === 0) {
      return res.status(404).json({ message: "Aucun hôpital trouvé dans la base." });
    }

    const hopitaux = await Hopital.find();
    console.log("Données récupérées :", hopitaux);
    res.json(hopitaux);
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});




