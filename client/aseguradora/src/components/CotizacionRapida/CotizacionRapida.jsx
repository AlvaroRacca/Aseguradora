import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";

function CotizacionRapida() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <h1 className="seleccion-objeto-h1">Seleccionar Objeto Presupuestar</h1>
      <div className="div-cards">
        <Link to="/cotizacion-rapida-auto">
          <Card className="card max-w-sm">
            <img
              src="asset/auto.png"
              alt="Asegurar"
              style={{
                width: "100px",
                height: "100px",
                display: "block",
                margin: "auto",
              }}
            />
            <h3
              className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              style={{ textAlign: "center" }}
            >
              Auto
            </h3>
          </Card>
        </Link>
        <Link to="/cotizacion-rapida-moto">
          <Card className="card max-w-sm">
            <img
              src="asset/moto.png"
              alt="Asegurar"
              style={{
                width: "100px",
                height: "100px",
                display: "block",
                margin: "auto",
              }}
            />
            <h3
              className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              style={{ textAlign: "center" }}
            >
              Moto
            </h3>
          </Card>
        </Link>
        <Link to="/cotizacion-rapida-bici">
          <Card className="card max-w-sm">
            <img
              src="asset/bicibleta.png"
              alt="Asegurar"
              style={{
                width: "100px",
                height: "100px",
                display: "block",
                margin: "auto",
              }}
            />
            <h3
              className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              style={{ textAlign: "center" }}
            >
              Bicicleta
            </h3>
          </Card>
        </Link>
        <Link to="/cotizacion-rapida-celular">
          <Card className="card max-w-sm">
            <img
              src="asset/celular.png"
              alt="Asegurar"
              style={{
                width: "100px",
                height: "100px",
                display: "block",
                margin: "auto",
              }}
            />
            <h3
              className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              style={{ textAlign: "center" }}
            >
              Celular
            </h3>
          </Card>
        </Link>
      </div>
      <img
      onClick={goBack}
              src="asset/siguiente.png"
              alt="Asegurar"
              style={{
                transform: "rotate(180deg)",
                width: "50px",
                height: "50px",
                display: "block",
                margin: "auto",
                cursor:"pointer"
              }}
            />
    </div>
  );
}

export default CotizacionRapida;
