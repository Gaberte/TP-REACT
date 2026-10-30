import { useContext } from 'react';
import { UserContext } from './UserContext';

/****************PETIT-ENFANT 2****************************** */
// Lit uniquement ce dont il a besoin : user
export default function Welcome() {
  const { user } = useContext(UserContext);

  console.log('PETIT-ENFANT 2', { user });

  return <p>{user ? `Bienvenue, ${user.name}.` : 'Connectez-vous.'}</p>;
}
