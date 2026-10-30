import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from "react-router";
import { AuthProvider } from './Composants/AuthContext';
import AvecUseMemo from './Usememo/AvecUseMemo.jsx';
import SansUseMemo from './Usememo/SansUseMemo.jsx';
import Inscription from './Composants/Inscription.jsx';

createRoot(document.getElementById('root')).render(
  //<StrictMode>

    <BrowserRouter>
    <AuthProvider>
    <App/>
    </AuthProvider>
    </BrowserRouter>
    
  //</StrictMode>,
)
