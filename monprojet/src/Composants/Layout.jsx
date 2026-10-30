import { Outlet } from "react-router";
import Menu from "./Menu";
import Banner from "./Banner";
import Footer from "./Footer";


export default function Layout() {
  return (
    <div >
      
      <main>
        <Outlet />   {/* la page enfant s'affiche ici */}
      </main>
      </div>
  );
}
