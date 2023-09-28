import Button from "../Button/Button";
import { Link, Outlet } from "react-router-dom";

function Menu() {
  return (
    <div className="App">
      <div className="div-bt-inicio">
        <Link to="/cotizacion-rapida">
          <Button titulo="Cotizacion Rapida"></Button>
        </Link>
        <Link to="/objetos">
          <Button titulo="Asegurar"></Button>
        </Link>
        <Link to="/iniciar-seccion">
          <Button titulo="Iniciar Sesión"></Button>
        </Link>
        <Link to="/registrarse">
          <Button titulo="Registrarse"></Button>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
