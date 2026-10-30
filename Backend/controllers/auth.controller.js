// Importe la connexion à la base SQLite depuis db.js
// ("../" remonte d'un dossier : on sort de controllers/ pour atteindre la racine)
import { db } from "../db.js";

// ATTENTION : mots de passe en clair, usage local uniquement.

// Fonction exportée : appelée par la route POST /api/inscription
// req = requête reçue, res = réponse à renvoyer
export function inscription(req, res) {
  // Extrait les 4 champs du corps JSON envoyé par React (déstructuration)
  const { nom, prenom, email, password } = req.body;

  // Validation : refuse si un champ est vide ou absent,
  // ou si le mot de passe fait moins de 12 caractères
  if (!nom || !prenom || !email || !password || password.length < 12) {
    // Répond 400 (requête invalide) ; "return" arrête la fonction ici
    return res.status(400).json({ message: "Données invalides" });
  }

  // try/catch : permet d'intercepter une erreur levée par la base de données
  try {
    // Prépare la requête SQL d'insertion ; chaque "?" sera remplacé par une valeur
    // (requête paramétrée : protège contre l'injection SQL)
    db.prepare(
      "INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)"
    // Exécute l'insertion avec les valeurs, dans l'ordre des "?"
    ).run(nom, prenom, email, password);

    // Répond 201 (« créé ») avec un message JSON
    res.status(201).json({ message: "Compte créé" });
  } catch (err) {
    // Si l'email existe déjà, SQLite lève une erreur de contrainte d'unicité
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      // Répond 409 (conflit) ; "return" évite d'exécuter la suite
      return res.status(409).json({ message: "Email déjà utilisé" });
    }
    // Autre erreur : on l'affiche dans le terminal du serveur pour la déboguer
    console.error(err);
    // Répond 500 (erreur interne) sans révéler les détails au client
    res.status(500).json({ message: "Erreur serveur" });
  }
}

// Identifiants de l'administrateur (fausse base, usage local uniquement)
// À CHANGER : choisis tes propres valeurs
const ADMIN = {
  email: "admin@gmail.com",
  password: "Admin@123456",
  prenom: "Admin",
};

export function connexion(req, res) {
  const { email, password } = req.body;

  // 1. Regarder d'abord si ce sont les identifiants de l'administrateur
  if (email === ADMIN.email && password === ADMIN.password) {
    return res.json({ id: 0, prenom: ADMIN.prenom, role: "admin" });
  }

  // 2. Sinon, recherche dans la vraie base (inchangé)
  const user = db
    .prepare("SELECT id, prenom FROM utilisateurs WHERE email = ? AND mot_de_passe = ?")
    .get(email, password);

  if (!user) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }

  // Ajoute le rôle "utilisateur" à la réponse
  res.json({ id: user.id, prenom: user.prenom, role: "utilisateur" });
}