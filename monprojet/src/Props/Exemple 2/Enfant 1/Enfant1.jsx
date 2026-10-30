import PetitEnfant1 from "./PetitEnfant1";
 
// Ne fait que relayer les props à son enfant
export default function Enfant1({ user, login, logout }) {
  console.log('ENFANT 1', { user });
 
  return (
    <header>
      <strong>Mon application</strong>
 
     <PetitEnfant1 user={user} login={login} logout={logout} />
    </header>
  );
}