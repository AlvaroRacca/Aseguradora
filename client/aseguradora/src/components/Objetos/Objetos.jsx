import "./Objetos.css";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Objetos() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };
  return (
    <div className="App">
      <h1 className="seleccion-objeto-h1">Seleccionar Objeto a Asegurar</h1>
      <Link to="/auto">
        <Button titulo="AUTO"></Button>
      </Link>
      <Link to="/moto">
        <Button titulo="MOTO"></Button>
      </Link>
      <Link to="/bici">
        <Button titulo="BICICLETA"></Button>
      </Link>
      <Link to="/celular">
        <Button titulo="CELULAR"></Button>
      </Link>
      <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
    </div>
  );
}

export default Objetos;
