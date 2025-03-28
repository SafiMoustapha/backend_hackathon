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
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        // Retirer cette ligne si tu veux rendre hospitalId optionnel
        // required: true
    }    
});


const Avis = mongoose.model("Avis", avisSchema);
module.exports = Avis;