import { useState } from 'react';
import Enfant1 from './Enfant 1/Enfant1';
import Enfant2 from './Enfant 2/Enfant2';
 
/****************Parent****************************** */
export default function Parent() {
  const [user, setUser] = useState(null);
  const login = (name) => setUser({ name });
  const logout = () => setUser(null);
 
  console.log('App-Parent', { user });
 
  return (
    <>
      <Enfant1 user={user} login={login} logout={logout} />
      {/* //enfant 1 relaye les props à son enfant */}
      <Enfant2 user={user} />
      {/* //enfant 2 relaye les props à son enfant */}
    </>
  );
}