export default function PetitEnfant2({ user }) {
  console.log('PETIT-ENFANT 2', { user });
 
  return <p>{user ? `Bienvenue, ${user.name}.` : 'Connectez-vous.'}</p>;
}