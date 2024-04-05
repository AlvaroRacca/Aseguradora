import "./Objetos.css";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";

function Objetos() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };
  return (
    <div className="App">
      <h1 className="seleccion-objeto-h1">Seleccionar Objeto a Asegurar</h1>
      <div className="div-cards">
      <Link to="/auto" style={{ display: "inline-block" }}>
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
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{textAlign:"center"}}>
                    Auto
                  </h3>
                </Card>
      </Link>
      <Link to="/moto" style={{ display: "inline-block" }}>
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
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{textAlign:"center"}}>
                    Moto
                  </h3>
                </Card>
      </Link>
      <Link to="/bici" style={{ display: "inline-block" }}>
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
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{textAlign:"center"}}>
                    Bicicleta
                  </h3>
                </Card>
      </Link>
      <Link to="/celular" style={{ display: "inline-block" }}>
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
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{textAlign:"center"}}>
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

export default Objetos;
