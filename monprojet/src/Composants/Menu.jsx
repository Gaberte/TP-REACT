import { NavLink } from "react-router";

export default function Menu() {
    return(
        <nav>
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/catalogue">Catalogue</NavLink>
            <NavLink to="/connexion">Connexion</NavLink>
            <NavLink to="/inscription">Inscription</NavLink>
        </nav>
    )
}