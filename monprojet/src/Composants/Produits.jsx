
import { useState } from "react";

import styles from "./Inscription.module.css";

// Composant du formulaire d'ajout de produit
function Produits() {
  // Un seul état objet pour les champs du formulaire
  const [form, setForm] = useState({
    nom: "",
    prix: "",
  });

  // Message d'erreur ("" = pas d'erreur)
  const [erreur, setErreur] = useState("");
  // Message de succès ("" = pas de succès à afficher)
  const [succes, setSucces] = useState("");

  // Appelé à chaque modification d'un champ
    const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Efface les anciens messages dès que l'utilisateur retape quelque chose
    setErreur("");
    setSucces("");
  };

  // Appelé à l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/produits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: form.nom,
          // Accepte "12,50" en le transformant en "12.50"
          prix: form.prix.replace(",", "."),
        }),
      });

      // Si la réponse n'est pas du JSON, on évite que ça plante
      const data = await res.json().catch(() => ({}));

      // Code HTTP hors 200-299 : on affiche le message du serveur
      if (!res.ok) {
        setErreur(data.message || "Une erreur est survenue.");
        setSucces("");
        return;
      }

      // Succès : message, puis on vide le formulaire
      setErreur("");
      setSucces(`Produit « ${data.nom} » ajouté !`);
      setForm({ nom: "", prix: "" });
    } catch {
      // Le serveur n'a pas répondu (backend éteint, proxy Vite absent...)
      setErreur("Serveur injoignable. Vérifie que le backend est lancé.");
      setSucces("");
    }
  };

  return (
    <main className={styles.page}>
      {/* noValidate : la validation est faite par le backend */}
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h1>Ajouter un produit</h1>

        <div className={styles.champ}>
          <label htmlFor="nom">Nom du produit</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={form.nom}
            onChange={handleChange}
          />
        </div>

        <div className={styles.champ}>
          <label htmlFor="prix">Prix (€)</label>
          <input
            type="number"
            id="prix"
            name="prix"
            min="0"
            step="0.01"
            value={form.prix}
            onChange={handleChange}
          />
        </div>

        {erreur && <p className={styles.erreur}>{erreur}</p>}
        {succes && <p className={styles.succes}>{succes}</p>}

        <button type="submit">Ajouter</button>
      </form>
    </main>
  );
}

export default Produits;