const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Enregistrer un utilisateur
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email déjà utilisé" });

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Connexion utilisateur
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Email reçu :", email);
        console.log("Mot de passe reçu :", password);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("Utilisateur non trouvé");
            return res.status(400).json({ success: false, message: "Utilisateur non trouvé" });
        }

        console.log("Utilisateur trouvé :", user);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Résultat de la comparaison :", isMatch);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Mot de passe incorrect" });
        }

        const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1d" });
        res.json({ success: true, token });

    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

  

module.exports = { registerUser, loginUser };
