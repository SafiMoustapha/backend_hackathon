const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

// 🔹 Inscription d'un utilisateur
router.post("/register", async (req, res) => {
  console.log("🛠️ Requête reçue au backend !");
  console.log("📩 Données reçues :", req.body); // 🔍 Vérification

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "Cet email est déjà utilisé." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });

      await newUser.save();

      console.log("✅ Utilisateur enregistré :", newUser);
      res.status(201).json({ message: "Utilisateur enregistré avec succès !" });
  } catch (error) {
      console.error("❌ Erreur lors de l'inscription :", error);
      res.status(500).json({ message: "Erreur serveur", error });
  }
});


  

// 🔹 Connexion d'un utilisateur
router.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ success: false, message: "Utilisateur non trouvé" });

      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ success: false, message: "Mot de passe incorrect" });

      // Générer un token
      const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1d" });

      res.json({ success: true, token });
  } catch (error) {
      res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});


module.exports = router;
