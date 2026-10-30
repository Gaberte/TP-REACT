import { useState, useCallback, memo } from "react";

// Enfant mémoïsé : il ne se re-render que si ses props changent
// const Bouton = memo(function Bouton({ onClick, label }) {
//   console.log(`Render de : ${label}`);
//   return <button onClick={onClick}>{label}</button>;
// });

//sans memo
const Bouton = function Bouton({ onClick, label }) {
  console.log(`Render de : ${label}`);
  return <button onClick={onClick}>{label}</button>;
};
export default function App() {
  const [compteur, setCompteur] = useState(0);
  const [autre, setAutre] = useState(0);

  //  Sans useCallback : nouvelle fonction à chaque render
  const incrementerSansCallback = () => setCompteur((c) => c + 1);

  //  Avec useCallback : même référence entre les renders
  const incrementerAvecCallback = useCallback(() => {
    setCompteur((c) => c + 1);
  }, []); // tableau de dépendances vide : la fonction ne change jamais

  return (
    <div>
      <p>Compteur : {compteur}</p>
      <p>Autre état : {autre}</p>

      <Bouton onClick={incrementerSansCallback} label="Sans useCallback" />
      <Bouton onClick={incrementerAvecCallback} label="Avec useCallback" />

      <button onClick={() => setAutre(autre + 1)}>
        Changer « autre » (re-render du parent)
      </button>
    </div>
  );
}