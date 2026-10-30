import { memo } from "react";
/*function ProduitCard({ produit, estFavori, onToggleFavori }) {
console.log("[rendu] ProduitCard", produit.id);
return (
<li
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
padding: "6px 0",
borderBottom: "1px solid #e5e7eb",
}}
>
<span>
{produit.nom} – {produit.prix} €
</span>
<button
type="button"
onClick={() => onToggleFavori(produit.id)}
aria-pressed={estFavori}
>
{estFavori ? "★ Favori" : "☆ Ajouter"}
</button>
</li>
);
}
export default memo(ProduitCard);   */

import styles from "./Catalogue.module.css";

function ProduitCard({ produit, estFavori, onToggleFavori }) {
  return (
    <tr>
      <td>{produit.nom}</td>
      <td>{Number(produit.prix).toFixed(2)} €</td>
      <td className={styles.colonneCentree}>
        <button
          type="button"
          className={styles.boutonFavori}
          onClick={() => onToggleFavori(produit.id)}
          aria-label="Ajouter ou retirer des favoris"
        >
          {estFavori ? "★" : "☆"}
        </button>
      </td>
      <td className={styles.colonneCentree}>
        {/* Bouton visuel seulement : la logique du panier viendra plus tard */}
        <button type="button" className={styles.boutonAjouter}>
          Ajouter
        </button>
      </td>
    </tr>
  );
}

export default memo(ProduitCard);