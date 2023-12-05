import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, useNavigate } from "react-router-dom";

function CotizacionRapida() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); 
  };

  return (
    <div className="App">
      <h1 className="seleccion-objeto-h1">Seleccionar Objeto Presupuestar</h1>
      <Link to="/cotizacion-rapida-auto">
        <Button titulo="AUTO"></Button>
      </Link>
      <Link to="/cotizacion-rapida-moto">
        <Button titulo="MOTO"></Button>
      </Link>
      <Link to="/cotizacion-rapida-bici">
        <Button titulo="BICICLETA"></Button>
      </Link>
      <Link to="/cotizacion-rapida-celular">
        <Button titulo="CELULAR"></Button>
      </Link>
      <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
    </div>
  );
}

export default CotizacionRapida;
