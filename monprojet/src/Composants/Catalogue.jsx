
/*import { useState, useEffect } from "react";
import BarreRecherche from "./BarreRecherche";
import styles from './Produit.module.css'

function Categorie() {
  // 1. L'état : la liste des produits, vide au départ
  const [produits, setProduits] = useState([]);
  // 2. L'état : est-ce qu'on est en train de charger ?
  const [chargement, setChargement] = useState(true);
  // 3. L'état : un message d'erreur éventuel
  const [erreur, setErreur] = useState("");

  // 4. L'effet : s'exécute après l'affichage du composant
  useEffect(() => {
    // On crée une fonction async À L'INTÉRIEUR de l'effet
    async function chargerProduits() {
      try {
        const res = await fetch("/api/produits");
        if (!res.ok) throw new Error("Erreur serveur");
        const data = await res.json();
        setProduits(data); // met la liste dans l'état → React réaffiche
      } catch {
        setErreur("Impossible de charger les produits.");
      } finally {
        setChargement(false); // dans tous les cas, le chargement est fini
      }
    }

    chargerProduits();
  }, []); // tableau vide : l'effet ne s'exécute qu'UNE fois, au premier affichage

  // 5. L'affichage selon la situation
  if (chargement) return <p>Chargement...</p>;
  if (erreur) return <p>{erreur}</p>;
  if (produits.length === 0) return <p>Aucun produit pour le moment.</p>;

  return (
    <main className={styles.content}>
    <ul>
      {produits.map((p) => (
        <li key={p.id}>
          {p.nom} : {p.prix} €
        </li>
      ))}
    </ul>
    </main>
  );
}

export default Categorie;*/

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import BarreRecherche from "./BarreRecherche.jsx";
import { normaliser } from "../utils/texte.js";
import { useDebounce } from "../hooks/useDebounce";
import ProduitCard from "./ProduitCard.jsx";

import styles from "./Catalogue.module.css";

export default function Catalogue() {
  const { utilisateur, deconnecter } = useAuth();
  const navigate = useNavigate();
  const [saisie, setSaisie] = useState("");
  const terme = useDebounce(saisie, 300);
  const [favoris, setFavoris] = useState([]);
  const inputRef = useRef(null);

  // États liés au chargement depuis l'API
  const [produits, setProduits] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  // Chargement des produits au premier affichage
  useEffect(() => {
    const controller = new AbortController();

    async function chargerProduits() {
      try {
        const res = await fetch("/api/produits", { signal: controller.signal });
        if (!res.ok) throw new Error("Erreur serveur");
        const data = await res.json();
        setProduits(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        setErreur("Impossible de charger les produits.");
      } finally {
        if (!controller.signal.aborted) setChargement(false);
      }
    }

    chargerProduits();
    return () => controller.abort();
  }, []);

  // Raccourci clavier : la touche "/" donne le focus à la barre de recherche
  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const produitsFiltres = useMemo(() => {
    const t = normaliser(terme);
    return produits.filter((p) => normaliser(p.nom).includes(t));
  }, [produits, terme]);

  const toggleFavori = useCallback((id) => {
    setFavoris((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const effacer = () => {
    setSaisie("");
    inputRef.current?.focus();
  };

  const handleDeconnexion = () => {
    deconnecter();
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.page}>
      <div className={styles.barreUtilisateur}>
        <span>Bonjour {utilisateur?.prenom}</span>
        <button className={styles.boutonDeconnexion} onClick={handleDeconnexion}>
          Se déconnecter
        </button>
      </div>
      <h2 className={styles.titre}>Catalogue</h2>
 
      <BarreRecherche
        valeur={saisie}
        onChange={setSaisie}
        onEffacer={effacer}
        inputRef={inputRef}
      />

      {chargement && <p className={styles.info}>Chargement...</p>}
      {erreur && <p className={styles.erreur}>{erreur}</p>}

      {!chargement && !erreur && (
        <>
          {produits.length === 0 ? (
            <p className={styles.info}>Aucun produit pour le moment.</p>
          ) : (
            <>
              <p className={styles.info}>
                {produitsFiltres.length} résultat(s)
                {saisie !== terme && <small> – recherche en cours…</small>}
              </p>

              {produitsFiltres.length === 0 ? (
                <p className={styles.info}>Aucun produit ne correspond à « {terme} ».</p>
              ) : (
                <table className={styles.tableau}>
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Prix</th>
                      <th className={styles.colonneCentree}>Favori</th>
                      <th className={styles.colonneCentree}>Ajout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produitsFiltres.map((p) => (
                      <ProduitCard
                        key={p.id}
                        produit={p}
                        estFavori={favoris.includes(p.id)}
                        onToggleFavori={toggleFavori}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}