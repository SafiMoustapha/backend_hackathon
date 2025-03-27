const mongoose = require("mongoose");

const avisSchema = new mongoose.Schema({
  hopital: { type: String, required: true }, // Vérifie que ce champ existe bien
  note: { type: Number, required: true, min: 1, max: 5 },
  commentaire: { type: String, required: true }
});

const Avis = mongoose.model("Avis", avisSchema);
module.exports = Avis;
