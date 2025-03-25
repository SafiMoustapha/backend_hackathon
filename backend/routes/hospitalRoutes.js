const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");

// Ajouter un hôpital
router.post("/add", async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const newHospital = new Hospital({ name, address, phone });

    await newHospital.save();
    res.status(201).json({ success: true, message: "Hôpital ajouté !" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur", error });
  }
});

// Obtenir tous les hôpitaux
router.get("/", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur", error });
  }
});

module.exports = router;
