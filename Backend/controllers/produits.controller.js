import { db } from "../db.js";

export function listerProduits(req, res) {
  const produits = db
    .prepare("SELECT id, nom, prix FROM produits ORDER BY nom")
    .all();
  res.json(produits);
}

export function ajouterProduit(req, res) {
  const { nom, prix } = req.body;

  // Validation minimale
  if (!nom || !nom.trim()) {
    return res.status(400).json({ message: "Le nom est obligatoire." });
  }
  const prixNombre = Number(prix);
  if (prix === "" || Number.isNaN(prixNombre) || prixNombre < 0) {
    return res.status(400).json({ message: "Le prix doit être un nombre positif." });
  }

  // .run() sert aux INSERT/UPDATE/DELETE (.all() est pour les SELECT)
  const resultat = db
    .prepare("INSERT INTO produits (nom, prix) VALUES (?, ?)")
    .run(nom.trim(), prixNombre);

  res.status(201).json({ id: resultat.lastInsertRowid, nom: nom.trim(), prix: prixNombre });
}