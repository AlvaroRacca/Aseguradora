import "./Header.css";
import Button from "../Button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLock, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Link, Outlet } from "react-router-dom";

function Header() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">Mi Aplicación de Seguros</h1>
        <nav className="header__nav">
        <Link to="/">
            <button className="header__button">Menu</button>
          </Link>
          <Link to="/cotizacion-rapida">
            <button className="header__button">Cotizacion Rapida</button>
          </Link>
          <Link to="/objetos">
            <button className="header__button">Asegurar</button>
          </Link>
          <Link to="/cotizacion-rapida">
            <FontAwesomeIcon icon={faUserLock} />
          </Link>
          <Link to="/cotizacion-rapida">
          <FontAwesomeIcon icon={faUserPlus} />
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Header;
