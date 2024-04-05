import "./Header.css";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";


function Header({
  isAuthenticated,
  setUserData,
  userData,
  setIsAuthenticated,
}) {
  const navigate = useNavigate();
  const DB_HOST = config.DB_HOST;
  const handleLogout = async () => {
    try {
      await axios.get(`http://${DB_HOST}/cerrar-sesion`);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      setIsAuthenticated(false);
      setUserData({});
      setUserData({ nivel: "0" });
      navigate("/")
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };


  const iniciarSeccion = () => {
    navigate("/iniciar-sesion")
  }

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Glacial+Indifference:wght@400;700&display=swap"
      />
      <header className="header">
        <h1 className="header__title">PoliGestion</h1>
        <div className="div-header-inicio">
        {!isAuthenticated && (
            <img
              src="/asset/iniciar.png"
              className="img-iniciar"
              onClick={iniciarSeccion}
              alt="Iniciar sesión"
            />
          )}
          {/* Renderizar la imagen de cerrar sesión si el usuario está autenticado */}
          {isAuthenticated && (
            <img
              src="/asset/salida.png"
              className="img-salida"
              onClick={handleLogout}
              alt="Cerrar sesión"
            />
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;