import { useState, useContext } from 'react';
import { UserContext } from './UserContext';

/****************PETIT-ENFANT 1****************************** */
// Lit le contexte directement et possède le champ de saisie
export default function UserMenu() {
  const { user, login, logout } = useContext(UserContext);
  const [nom, setNom] = useState(''); // state local : ce que l'on tape

  console.log('PETIT-ENFANT 1', { user, nom });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nom.trim()) {
      login(nom.trim()); // appelle directement la fonction du Provider
      setNom('');        // on vide le champ
    }
  };

  if (user) {
    return (
      <span>
        Bonjour {user.name} <button onClick={logout}>Déconnexion</button>
      </span>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        placeholder="Votre prénom"
      />
      <button type="submit">Connexion</button>
    </form>
  );
}
