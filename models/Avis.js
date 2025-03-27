const mongoose = require("mongoose");

const avisSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avis: {
        type: String,
        required: true
    },
    type_avis: {
        type: String,
        required: true
    },
    hopital: {
        type: String,
        required: true
    }
});


const Avis = mongoose.model("Avis", avisSchema);
module.exports = Avis;