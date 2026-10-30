import { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

import styles from "./Login.module.css";

export default function Login() {
  const { connecter, estConnecte, utilisateur } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setEnvoiEnCours(true);

    const resultat = await connecter(email.trim(), password);

    setEnvoiEnCours(false);

    /*if (resultat.ok) {
      navigate("/catalogue", { replace: true });
    } else {*/
    if (resultat.ok) {
    navigate(resultat.role === "admin" ? "/produits" : "/catalogue", { replace: true });
    } else {
      setErreur(resultat.message);
      setPassword("");
    }
  };

  /*if (estConnecte) {
    return <Navigate to="/catalogue" replace />;
  }*/
    if (estConnecte) {
    return (
      <Navigate
        to={utilisateur?.role === "admin" ? "/produits" : "/catalogue"}
        replace
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formulaire}>
      <h2 className={styles.titre}>Connexion</h2>

      <label className={styles.champ}>
        Email
        <input
          ref={emailRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </label>

      <label className={styles.champ}>
        Mot de passe
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>

      {erreur && <p className={styles.erreur}>{erreur}</p>}

      <button
        type="submit"
        className={styles.boutonPrincipal}
        disabled={!email || !password || envoiEnCours}
      >
        {envoiEnCours ? "Connexion..." : "Se connecter"}
      </button>

      <p className={styles.inscription}>Pas encore de compte ?</p>
      <button
        type="button"
        className={styles.boutonSecondaire}
        onClick={() => navigate("/inscription")}
      >
        S'inscrire
      </button>
    </form>
  );
}