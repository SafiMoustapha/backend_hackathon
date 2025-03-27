router.post("/", async (req, res) => {
    try {
        console.log("Requête reçue :", req.body);  // 🛠 Debug ici

        const newAvis = new Avis(req.body);
        await newAvis.save();
        res.status(201).json({ success: true, message: "Avis enregistré avec succès !" });
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'avis :", error);
        res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
    }
});
