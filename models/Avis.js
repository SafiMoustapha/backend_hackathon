const mongoose = require("mongoose");

const avisSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true },
    type_avis: { type: String, required: true },
    avis: { type: String, required: true },
    note: { type: Number, required: true, min: 1, max: 5 },
    document: { type: String }, // document est facultatif
});

const Avis = mongoose.model("Avis", avisSchema);
module.exports = Avis;