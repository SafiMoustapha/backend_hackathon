const mongoose = require("mongoose");
const Hospital = require("../models/Hospital");
const dotenv = require("dotenv");

dotenv.config(); // Charger les variables d'environnement

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error("❌ Erreur de connexion :", err));



const hospitals = [
  { name: "Centre hospitalier universitaire de Cocody", type: "public" },
  { name: "Centre hospitalier universitaire de Treichville", type: "public" },
  { name: "Centre hospitalier universitaire de Yopougon", type: "public" },
  { name: "Centre hospitalier universitaire d'Angré", type: "public" },
  { name: "Hôpital militaire d'Abidjan", type: "public" },
  { name: "Centre national de transfusion sanguine", type: "public" },
  { name: "Centre de santé communautaire", type: "public" },
  { name: "Centre de santé El Rapha", type: "public" },
  { name: "Centre de santé urbain à base communautaire d'Abobo", type: "public" },
  { name: "Centre Éducation Sanitaire", type: "public" },
  { name: "Centre médical le CEGOS", type: "public" },
  { name: "Hôpital général d'Abobo", type: "public" },
  { name: "Hôpital général de Port-Bouët", type: "public" },
  { name: "Hôpital général d'Anyama", type: "public" },
  { name: "Hôpital général de Koumassi", type: "public" },
  { name: "Hôpital général de Marcory", type: "public" },
  { name: "Polyclinique internationale Sainte Anne-Marie", type: "privé" },
  { name: "Polyclinique des Deux-Plateaux", type: "privé" },
  { name: "Polyclinique Médicale FARAH", type: "privé" },
  { name: "Centre d'imagerie médicale d'Abidjan", type: "privé" },
  { name: "Polyclinique Avicenne", type: "privé" },
  { name: "Polyclinique internationale Hôtel Dieu Abidjan", type: "privé" },
  { name: "Polyclinique Les Grâces", type: "privé" },
  { name: "Polyclinique centrale Abobo", type: "privé" },
  { name: "Polyclinique internationale de l'Indénié", type: "privé" },
  { name: "Polyclinique Central, Abobo", type: "privé" },
  { name: "Polyclinique Sainte-Anne Marie Anani", type: "privé" },
  { name: "Polyclinique La Providence", type: "privé" },
  { name: "Polyclinique Panthéon médical", type: "privé" },
  { name: "Clinique médical Adjamé Liberté", type: "privé" },
  { name: "Clinique Procréa", type: "privé" },
  { name: "Centre médical de Dermatologie d'Abidjan", type: "privé" },
  { name: "Centre international d'ophtalmologie", type: "privé" },
  { name: "Centre médical La Rochelle", type: "privé" },
  { name: "Clinique Trade Center", type: "privé" },
  { name: "Clinique Goci", type: "privé" },
  { name: "Centre médical La Sagesse", type: "privé" },
  { name: "Clinique Israel", type: "privé" },
  { name: "Clinique Les Arcades", type: "privé" },
  { name: "Clinique médicale Les Béatitudes", type: "privé" },
  { name: "Clinique médicale La Rosette", type: "privé" },
  { name: "Clinique médicale le Messie", type: "privé" },
  { name: "Clinique médicale du Dokui", type: "privé" },
  { name: "Espace médical Saint-Paul", type: "privé" },
  { name: "Clinique universelle Santé Cusa", type: "privé" },
  { name: "Clinique Saint-Martin de Tours", type: "privé" },
  { name: "Centre médical Les Archanges", type: "privé" },
  { name: "Clinique Saint-Gabriel", type: "privé" },
  { name: "Clinique Rhema", type: "privé" },
  { name: "Clinique Nanan", type: "privé" },
  { name: "Clinique médicale La Colombe", type: "privé" },
  { name: "Clinique Rosa Maria", type: "privé" },
  { name: "Clinique médicale Anne Marie", type: "privé" },
  { name: "Espace médical La Pulcherie", type: "privé" },
  { name: "Centre médical Les Cherubins", type: "privé" },
  { name: "Centre Médical EDEN", type: "privé" },
  { name: "Clinique médicale Saint-Viateur", type: "privé" },
  { name: "Groupe médical Plateau", type: "privé" },
  { name: "Groupe médical Promethée", type: "privé" },
  { name: "Centre médical Inter Entreprise", type: "privé" },
  { name: "Espace médical Le Phenix", type: "privé" },
  { name: "Centre médical Harmony", type: "privé" },
  { name: "Centre médical Social El-Kabod", type: "privé" },
  { name: "Centre médical des œuvres et mission", type: "privé" },
  { name: "Clinique médicale Danga", type: "privé" },
  { name: "Centre Médical International La Gospa", type: "privé" },
  { name: "Clinique Medicale OASIS SANTE", type: "privé" },
  { name: "Espace Médical Saint Georges", type: "privé" },
  { name: "Clinique Bethanie", type: "privé" },
  { name: "Clinique RIMCA", type: "privé" }
];

// Insérer dans MongoDB
const insertHospitals = async () => {
  try {
    await Hospital.deleteMany(); // Supprimer les anciens hôpitaux si nécessaire
    await Hospital.insertMany(hospitals);
    console.log("✅ Hôpitaux ajoutés avec succès !");
    mongoose.connection.close();// Fermer la connexion après l'insertion
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout des hôpitaux :", error);
    mongoose.connection.close();
  }
};

insertHospitals();
