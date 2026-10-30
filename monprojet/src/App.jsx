
import { Route, Routes, Navigate } from "react-router";
import './App.css'
import './Composants/style.css'
import Banner from './Composants/Banner'
import Produit from './Composants/Produit'
import Footer from './Composants/Footer'
import Contact from './Composants/Contact'
import Menu from './Composants/Menu';
import Layout from './Composants/Layout';
import Produits from './Composants/Produits';
import Inscription from './Composants/Inscription';
import Catalogue from './Composants/Catalogue';
import Login from './Composants/Login';
import ProtectedRoute from "./Composants/ProtectedRoute";


function Accueil()
{
  return(
    <p></p>
  )
}
export default function App() {

  return (
    <div className='layout'>
      <Banner/>
        <Routes>
          <Route element={<Layout />}>
            {/* Routes publiques */}
            <Route path="/" element={<Accueil />} />
            <Route path="/connexion" element={<Login />} />
           
            <Route path="/inscription" element={<Inscription />} />

            {/* Routes pour tout utilisateur connecté */}
            <Route element={<ProtectedRoute />}>
              <Route path="/catalogue" element={<Catalogue />} />
            </Route>

            {/* Routes réservées à l'administrateur */}
            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="/produits" element={<Produits />} />
            </Route>

            {/* Adresse inconnue : retour à l'a ccueil */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      <Footer/>
      
    </div>
   
  )
}

