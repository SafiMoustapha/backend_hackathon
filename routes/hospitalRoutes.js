const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");

// Ajouter un hôpital
router.post("/add", async (req, res) => {
  try {
    const { name, address, phone, type } = req.body;

    if (!name || !address || !phone || !type) {
      return res.status(400).json({ success: false, message: "Tous les champs sont obligatoires !" });
    }

    const newHospital = new Hospital({ name, address, phone, type });

    await newHospital.save();
    res.status(201).json({ success: true, message: "Hôpital ajouté avec succès !", hospital: newHospital });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur", error });
  }
});


// Obtenir tous les hôpitaux
router.get("/", async (req, res) => {
  try {
    const { type } = req.query; // On récupère le type s'il est envoyé en paramètre

    let filter = {};
    if (type) {
      filter.type = type; // Filtrer les hôpitaux par type (ex: public, privé)
    }

    const hospitals = await Hospital.find(filter);
    res.json({ success: true, hospitals });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur", error });
  }
});

// Obtenir un hôpital par son ID
router.get("/:id", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({ success: false, message: "Hôpital non trouvé" });
    }

    res.json({ success: true, hospital });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur", error });
  }
});

// Mettre à jour un hôpital
router.put("/:id", async (req, res) => {
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedHospital) {
      return res.status(404).json({ success: false, message: "Hôpital non trouvé" });
    }

    res.json({ success: true, message: "Hôpital mis à jour", hospital: updatedHospital });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur", error });
  }
});

// Recherche d'hôpitaux par nom
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query; // Récupère la requête de recherche (nom de l'hôpital)
    
    if (!query) {
      return res.status(400).json({ success: false, message: "Le paramètre 'query' est requis !" });
    }

    // Recherche les hôpitaux dont le nom correspond à la recherche, insensible à la casse
    const hospitals = await Hospital.find({
      name: { $regex: query, $options: "i" } // 'i' pour insensible à la casse
    }).limit(10); // Limiter le nombre de résultats à 10

    res.json({ success: true, hospitals });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur", error });
  }
});


module.exports = router;
