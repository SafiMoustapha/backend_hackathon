const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
        console.log("MongoDB connecté avec succès !");
        console.log("📂 Base de données utilisée :", mongoose.connection.db.carevoicehackathon);
    })
    .catch((err) => {
        console.error('Connection failed', err);
    })
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error);
    process.exit(1);
  }
};

module.exports = connectDB;