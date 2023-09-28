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
import Foto from "./components/Foto/Foto";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/objetos" element={<Objetos />} />
          <Route path="/datos-personales" element={<DatosPersonales />} />
          <Route path="/moto" element={<Moto />} />
          <Route path="/bici" element={<Bici />} />
          <Route path="/auto" element={<Auto />} />
          <Route path="/celular" element={<Celular />} />
          <Route path="/cotizacion-rapida" element={<CotizacionRapida />} />
          <Route
            path="/adjuntar-foto"
            element={<Foto />}
          />
          <Route
            path="/cotizacion-rapida-moto"
            element={<MotoCotizacionRapida />}
          />
          {/* Otros routes aquí */}
        </Routes>
      </Router>
  );
}

export default App;
