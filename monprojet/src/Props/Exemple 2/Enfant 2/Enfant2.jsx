import PetitEnfant2 from "./PetitEnfant2";
 
/****************ENFANT 2****************************** */
export default  function Enfant2({ user }) {
  console.log('ENFANT 2', { user });
 
  return (
    <main>
 
      <PetitEnfant2 user={user} />
    </main>
  );
}