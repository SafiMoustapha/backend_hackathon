const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const hospitalRoutes = require("./routes/hospitalRoutes");
const MONGO_URI = process.env.MONGO_URI;

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
if (!MONGO_URI) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connexion à MongoDB réussie');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB:', err);
  });
