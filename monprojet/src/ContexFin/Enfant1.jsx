/****************ENFANT 1****************************** */

import UserMenu from "./PetitEnfant1";

// Ne relaie plus rien : il ne connaît même plus user, login ou logout
export default function Header() {
  console.log('ENFANT 1');

  return (
    <header>
      <strong>Mon application</strong>

      <UserMenu />
    </header>
  );
}