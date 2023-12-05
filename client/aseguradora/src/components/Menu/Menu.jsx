import Button from "../Button/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function Menu({ isAuthenticated, setUserData, userData, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://192.168.56.1:3001/cerrar-sesion");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      setIsAuthenticated(false);
      setUserData({});
      navigate("/iniciar-sesion");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="App">
      <div className="div-bt-inicio">
        {isAuthenticated ? (
          // Si el usuario está autenticado, muestra el mensaje de bienvenida y el botón de cerrar sesión
          <>
            <p className="p-bienvenida">
              ¡Bienvenido {userData.username}!
              {/*   número de ID: {userData.id} */}
            </p>
            <Link to="/objetos">
              <Button titulo="Asegurar"></Button>
            </Link>
            <Link to="/cotizacion-rapida">
              <Button titulo="Cotización Rápida"></Button>
            </Link>
            <Button titulo="Cerrar Sesión" onClick={handleLogout}></Button>
          </>
        ) : (
          // Si el usuario no está autenticado, muestra los botones de Cotización Rápida, Registrarse e Iniciar Sesión
          <>
            <Link to="/cotizacion-rapida">
              <Button titulo="Cotización Rápida"></Button>
            </Link>
            <Link to="/registrarse">
              <Button titulo="Registrarse"></Button>
            </Link>
            <Link to="/iniciar-sesion">
              <Button titulo="Iniciar Sesión"></Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;

