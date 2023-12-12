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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { usePhotoContext } from "./components/Foto/PhotoContext";

function App() {
  const savedUsername = localStorage.getItem("username");
  const savedUserId = localStorage.getItem("userId");
  const savedUserNivel = localStorage.getItem("nivel");
  // Establecer el estado de autenticación si se encuentran los datos del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(!!savedUsername);
  const [userData, setUserData] = useState({
    username: savedUsername || "",
    userId: savedUserId || null,
    nivel : savedUserNivel || "0",
  });

  const { datosUsuario } = usePhotoContext();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedUserId = localStorage.getItem("userId");
    const savedUserNivel = localStorage.getItem("nivel");
    setIsAuthenticated(!!savedUsername);
    setUserData({
      username: savedUsername || "",
      userId: savedUserId || null,
      nivel : savedUserNivel || "",
    });
  }, []);


  const handleLogin = () => {
    setIsAuthenticated(true);
  };


  console.log("Nivel en App:", userData.nivel);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("nivel");
    setIsAuthenticated(false);
    setUserData({
      username: "",
      userId: null,
      nivel: "",
    });
  };
  return (
    <Router>
      <Header></Header>
      <Routes>
        {/* <Route
          path="/"
          element={<ProtectedRoute
              element={
                <Menu
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              userData={userData}
              setUserData={setUserData}
              setIsAuthenticated={setIsAuthenticated}
            />
              }
              allowedLevels={[5, '0']} // Nivel de acceso requerido para la ruta de administrador
              userLevel={userData.nivel} // Nivel de acceso actual del usuario
            />}
        />
        <Route
          path="/datos-personales"
          element={<ProtectedRoute
              element={
               <DatosPersonales
              userData={userData}
              setUserData={setUserData}
              isAuthenticated={isAuthenticated}
            />
              }
              allowedLevels={[1, 5]} // Nivel de acceso requerido para la ruta de administrador
              userLevel={userData.nivel} // Nivel de acceso actual del usuario
            />}
        />
        <Route path="/moto" element={<Moto />} />
        <Route path="/detalle-poliza/:id" element={<ProtectedRoute
              element={
                <DetallePoliza />
              }
              allowedLevels={[1]} // Nivel de acceso requerido para la ruta de administrador
              userLevel={userData.nivel} // Nivel de acceso actual del usuario
            />} />
        <Route path="/bici" element={<Bici />} />
        <Route path="/auto" element={<Auto />} />
        <Route
          path="/historial-informes"
          element={<ProtectedRoute
              element={
                <HistorialInforme isAuthenticated={isAuthenticated} />
              }
              allowedLevels={[1]} // Nivel de acceso requerido para la ruta de administrador
              userLevel={userData.nivel} // Nivel de acceso actual del usuario
            />}
        />
        <Route
          path="/menu-fotos"
          element={<ProtectedRoute
              element={
                <MenuFotos
              userData={userData}
              setUserData={setUserData}
              isAuthenticated={isAuthenticated}
            />
              }
              allowedLevels={[5,1]} // Nivel de acceso requerido para la ruta de administrador
              userLevel={userData.nivel} // Nivel de acceso actual del usuario
            />}
        />
        |
        <Route path="/celular" element={<Celular />} />
        <Route path="/cotizacion-rapida" element={<CotizacionRapida />} />
        <Route
          path="/cotizacion-rapida-auto"
          element={<AutoCotizacionRapida />}
        />
        <Route path="/adjuntar-foto" element={<ProtectedRoute
              element={
                <Foto />
              }
              allowedLevels={[5,1]} // Nivel de acceso requerido para la ruta de administrador
              userLevel={userData.nivel} // Nivel de acceso actual del usuario
            />}

            />
        <Route
          path="/historial-polizas"
          element={<ProtectedRoute
              element={
                <Historial_Polizas isAuthenticated={isAuthenticated} />
              }
              allowedLevels={[1]} // Nivel de acceso requerido para la ruta de administrador
              userLevel={userData.nivel} // Nivel de acceso actual del usuario
            />}
        />
        <Route
          path="/iniciar-sesion"
          element={
            <Sesion
              onLogin={handleLogin}
              setUserData={setUserData}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route path="/objetos" element={<ProtectedRoute
              element={
                <Objetos />
              }
              allowedLevels={[5 , 1]}// Nivel de acceso requerido para la ruta de administrador
              userLevel={userData.nivel} // Nivel de acceso actual del usuario
            />} />
        <Route
          path="/detalle-informe/:id/:tipoObjeto"
          element={<ProtectedRoute
              element={
                <DetalleInforme isAuthenticated={isAuthenticated} />
              }
              allowedLevels={[1]} // Nivel de acceso requerido para la ruta de administrador
              userLevel={userData.nivel} // Nivel de acceso actual del usuario
            />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={
                <MenuAdmin
                  onLogout={handleLogout}
                  isAuthenticated={isAuthenticated}
                  userData={userData}
                  setIsAuthenticated={setIsAuthenticated}
                  setUserData={setUserData}
                />
              }
              allowedLevels={[1]} // Nivel de acceso requerido para la ruta de administrador
              userLevel={userData.nivel} // Nivel de acceso actual del usuario
            />
          }
        />
        <Route
          path="/detalle-cotizacion/:id/"
          element={<ProtectedRoute
              element={
                <DetalleCotizacion userData={userData} setUserData={setUserData} isAuthenticated={isAuthenticated}/>
              }
              allowedLevels={[1]} // Nivel de acceso requerido para la ruta de administrador
              userLevel={userData.nivel} // Nivel de acceso actual del usuario
            />}/>
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
          element={<ProtectedRoute
              element={
                <HistorialCotizaciones />
              }
              allowedLevels={[1]} // Nivel de acceso requerido para la ruta de administrador
              userLevel={userData.nivel} // Nivel de acceso actual del usuario
            />}
        /> */}
        <Route
          path="/"
          element={
                <Menu
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              userData={userData}
              setUserData={setUserData}
              setIsAuthenticated={setIsAuthenticated}
            />}
        />
        <Route
          path="/datos-personales"
          element={
               <DatosPersonales
              userData={userData}
              setUserData={setUserData}
              isAuthenticated={isAuthenticated}
            />}
        />
        <Route path="/moto" element={<Moto />} />
        <Route path="/detalle-poliza/:id" element={
                <DetallePoliza />
              } />
        <Route path="/bici" element={<Bici />} />
        <Route path="/auto" element={<Auto />} />
        <Route
          path="/historial-informes"
          element={
                <HistorialInforme isAuthenticated={isAuthenticated} />
              }
        />
        <Route
          path="/menu-fotos"
          element={
                <MenuFotos
              userData={userData}
              setUserData={setUserData}
              isAuthenticated={isAuthenticated}
            />}
        />
        |
        <Route path="/celular" element={<Celular />} />
        <Route path="/cotizacion-rapida" element={<CotizacionRapida />} />
        <Route
          path="/cotizacion-rapida-auto"
          element={<AutoCotizacionRapida />}
        />
        <Route path="/adjuntar-foto" element={
                <Foto />
              }

            />
        <Route
          path="/historial-polizas"
          element={
                <Historial_Polizas isAuthenticated={isAuthenticated} />
              }
        />
        <Route
          path="/iniciar-sesion"
          element={
            <Sesion
              onLogin={handleLogin}
              setUserData={setUserData}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route path="/objetos" element={
                <Objetos />
              } />
        <Route
          path="/detalle-informe/:id/:tipoObjeto"
          element={
                <DetalleInforme isAuthenticated={isAuthenticated} />
              }
        />
        <Route
          path="/admin"
          element={
                <MenuAdmin
                  onLogout={handleLogout}
                  isAuthenticated={isAuthenticated}
                  userData={userData}
                  setIsAuthenticated={setIsAuthenticated}
                  setUserData={setUserData}
                />}
        />
        <Route
          path="/detalle-cotizacion/:id/"
          element={
                <DetalleCotizacion userData={userData} setUserData={setUserData} isAuthenticated={isAuthenticated}/>
              }/>
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
          element={
                <HistorialCotizaciones />
              }
        /> 
      </Routes>
    </Router>
  );
}

export default App;
