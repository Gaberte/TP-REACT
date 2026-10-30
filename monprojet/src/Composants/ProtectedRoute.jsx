import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ role }) {
  const { estConnecte, chargement, utilisateur } = useAuth();

  if (chargement) {
    return <p>Chargement…</p>;
  }

  if (!estConnecte) {
    return <Navigate to="/connexion" replace />;
  }

  // Une page peut exiger un rôle : si l'utilisateur n'a pas le bon, retour au catalogue
  if (role && utilisateur.role !== role) {
    return <Navigate to="/catalogue" replace />;
  }

  return <Outlet />;
}