import DatosPersonales from "./components/DatosPersonales/DatosPersonales";
import Objetos from "./components/Objetos/Objetos";
import Auto from "./components/Auto/Auto";
import Bici from "./components/Bici/Bici";
import Celular from "./components/Celular/Celular";
import Moto from "./components/Moto/Moto";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import CotizacionRapida from "./components/CotizacionRapida/CotizacionRapida";
import MotoCotizacionRapida from "./components/Moto/Moto-cotizacion-rapida";
import AutoCotizacionRapida from "./components/Auto/Auto-cotizacion-rapida";
import Foto from "./components/Foto/Foto";
import Sesion from "./components/Sesion/Sesion";
import MenuAdmin from "./components/Menu-admin/menu-admin";
import MenuFotos from "./components/Menu_fotos/Menu_Fotos";
import HistorialInforme from "./components/Historial_Informe/Historial_Informe";
import DetalleInforme from "./components/Detalle_Informe/Detalle_Informe";
import Historial_Polizas from "./components/Historial_Polizas/Historial_Polizas";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HistorialCotizaciones from "./components/Historial_Cotizaciones/Historial_cotizaciones";
import DetallePoliza from "./components/Detalle-Poliza/Detalle-Poliza";
import BiciCotizacionRapida from "./components/Bici/Bici-cotizacion-rapida";
import CelularCotizacionRapida from "./components/Celular/Celular-cotizacion-rapida";
import DetalleCotizacion from "./components/Detalle_Cotizacion/Detalle_Cotizacion";


function App() {

  const savedUsername = localStorage.getItem("username");
  const savedUserId = localStorage.getItem("userId");
  // Establecer el estado de autenticación si se encuentran los datos del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(!!savedUsername);
  const [userData, setUserData] = useState({
    username: savedUsername || "",
    userId: savedUserId || null,
  });
    
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedUserId = localStorage.getItem("userId");
    setIsAuthenticated(!!savedUsername);
    setUserData({
      username: savedUsername || "",
      userId: savedUserId || null,
    });
  }, []);

    // Función para manejar el inicio de sesión
    /* const handleLogin = () => {
      setIsAuthenticated(false);
    };
 */

    const handleLogin = () => {
      setIsAuthenticated(true);
    };
  
    const handleLogout = () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      setIsAuthenticated(false);
      setUserData({
        username: "",
        userId: null,
      });
    };

  return (
    <Router>
      <Header></Header>
      <Routes>
        
      <Route path="/" element={<Menu isAuthenticated={isAuthenticated} onLogout={handleLogout} userData={userData} setUserData={setUserData} setIsAuthenticated={setIsAuthenticated} />}/>

        <Route path="/datos-personales" element={<DatosPersonales userData={userData} setUserData={setUserData} isAuthenticated={isAuthenticated}/>} />
        <Route path="/moto" element={<Moto  />} />
        <Route path="/detalle-poliza/:id" element={<DetallePoliza  />} />
        <Route path="/bici" element={<Bici />} />
        <Route path="/auto" element={<Auto />} />
        <Route path="/historial-informes" element={<HistorialInforme isAuthenticated={isAuthenticated}/>} />
        <Route path="/menu-fotos" element={<MenuFotos userData={userData} setUserData={setUserData} isAuthenticated={isAuthenticated}/>} />|
        <Route path="/celular" element={<Celular />} />
        <Route path="/cotizacion-rapida" element={<CotizacionRapida />} />
        <Route path="/cotizacion-rapida-auto" element={<AutoCotizacionRapida />} />
        <Route path="/adjuntar-foto" element={<Foto  />} />
        <Route path="/historial-polizas" element={<Historial_Polizas isAuthenticated={isAuthenticated} />} />
        <Route path="/iniciar-sesion" element={<Sesion onLogin={handleLogin} setUserData={setUserData} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/objetos" element={<Objetos />} />
        <Route path="/detalle-informe/:id/:tipoObjeto" element={<DetalleInforme isAuthenticated={isAuthenticated} />} />
        <Route path="/admin" element={<MenuAdmin onLogout={handleLogout} isAuthenticated={isAuthenticated} userData={userData} setIsAuthenticated={setIsAuthenticated} setUserData={setUserData} />} />
      
        <Route
          path="/detalle-cotizacion/:id/"
          element={<DetalleCotizacion />}
        />
        <Route
          path="/cotizacion-rapida-moto"
          element={<MotoCotizacionRapida />}
        />
        <Route
          path="/cotizacion-rapida-bici"
          element={<BiciCotizacionRapida />}
        />
        <Route
          path="/cotizacion-rapida-celular"
          element={<CelularCotizacionRapida />}
        />
        <Route
          path="/historial-cotizacion-rapida"
          element={<HistorialCotizaciones />}
        />
        {/* Otros routes aquí */}
      </Routes>
    </Router>
  );
}

export default App;
