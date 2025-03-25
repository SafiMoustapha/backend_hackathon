import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // URL du backend

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Retourne la réponse du serveur
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.response?.data || error.message);
    throw error;
  }
};
