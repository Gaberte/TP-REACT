import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(null);
  const [chargement, setChargement] = useState(true);

  // Au démarrage : on restaure la session sauvegardée dans le navigateur
  useEffect(() => {
    const sauvegarde = localStorage.getItem("utilisateur");
    if (sauvegarde) {
      setUtilisateur(JSON.parse(sauvegarde));
    }
    setChargement(false);
  }, []);

  // Connexion : le serveur vérifie email + mot de passe dans la base
  const connecter = useCallback(async (email, password) => {
    try {
      const res = await fetch("/api/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { ok: false, message: data.message || "Connexion impossible" };
      }

      // Le serveur renvoie { id, prenom } : c'est notre session
           
    const session = { id: data.id, prenom: data.prenom, role: data.role };
    setUtilisateur(session);
    localStorage.setItem("utilisateur", JSON.stringify(session));
    return { ok: true, role: data.role };
    } catch {
      return { ok: false, message: "Serveur injoignable" };
    }
  }, []);

  // Inscription : le serveur enregistre le compte dans la base
  const inscrire = useCallback(async ({ nom, prenom, email, password }) => {
    try {
      const res = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { ok: false, message: data.message || "Inscription impossible" };
      }
      return { ok: true };
    } catch {
      return { ok: false, message: "Serveur injoignable" };
    }
  }, []);

  const deconnecter = useCallback(() => {
    setUtilisateur(null);
    localStorage.removeItem("utilisateur");
  }, []);

  const value = useMemo(
    () => ({
      utilisateur,
      estConnecte: utilisateur !== null,
      estAdmin: utilisateur?.role === "admin",
      chargement,
      connecter,
      inscrire,
      deconnecter,
    }),
    [utilisateur, chargement, connecter, inscrire, deconnecter]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth doit être utilisé à l'intérieur de <AuthProvider>");
  }
  return ctx;
}