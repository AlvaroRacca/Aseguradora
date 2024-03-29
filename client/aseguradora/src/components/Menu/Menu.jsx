import Button from "../Button/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { PhotoProvider, usePhotoContext } from "../Foto/PhotoContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Menu({ isAuthenticated, setUserData, userData, setIsAuthenticated }) {
  const navigate = useNavigate();
  /* Alerttaaaaaa */
  const MySwal = withReactContent(Swal);
  /* ----------------- */
  const { datosUsuario } = usePhotoContext ();

  const handleLogout = async () => {
    try {
      await axios.get("http://192.168.100.106:3001/cerrar-sesion");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      setIsAuthenticated(false);
      setUserData({});
      setUserData({nivel:"0"});
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

