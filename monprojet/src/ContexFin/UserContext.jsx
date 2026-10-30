import { createContext, useState } from 'react';

/****************CONTEXTE****************************** */
// On exporte le contexte : les composants le liront avec useContext
export const UserContext = createContext(null);

// Le Provider détient l'état (il a pris la place du Parent)
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (name) => setUser({ name });
  const logout = () => setUser(null);

  console.log('PROVIDER', { user });

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
