import { useState, useCallback, useEffect } from "react";

function Bouton({ onClick, label }) {
  // Cet effet s'exécute à chaque fois que la référence de onClick change
  useEffect(() => {
    console.log(`Effet déclenché : la fonction de « ${label} » a changé`);
  }, [onClick, label]);

  return <button onClick={onClick}>{label}</button>;
}

export default function App() {
  const [compteur, setCompteur] = useState(0);
  const [autre, setAutre] = useState(0);

  //  Sans useCallback : nouvelle référence à chaque render
  const incrementerSansCallback = () => setCompteur((c) => c + 1);

  //  Avec useCallback : même référence entre les renders
  const incrementerAvecCallback = useCallback(() => {
    setCompteur((c) => c + 1);
  }, []);

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