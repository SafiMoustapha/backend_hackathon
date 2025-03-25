const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const hospitalRoutes = require("./routes/hospitalRoutes");

dotenv.config();

const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/hospitals", hospitalRoutes);

// Routes
app.use("/api/users", userRoutes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connexion à MongoDB réussie"))
.catch(err => console.error("❌ Erreur de connexion à MongoDB :", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`));
