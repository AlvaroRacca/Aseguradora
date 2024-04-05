import React, { useState } from "react";
import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Bici() {
  const navigate = useNavigate();
     /* Alerttaaaaaa */
     const MySwal = withReactContent(Swal);
     /* ----------------- */
  

  const [datosObjeto, setDatosObjeto] = useState({
    Tipo_objeto: "bicicleta",
    Marca: "",
    Modelo: "",
    Año: "",
    Tipo: "",
    Cuadro: "",
  });

  const [camposCompletos, setCamposCompletos] = useState({
    Marca: false,
    Modelo: false,
    Año: false,
    Tipo: false,
    Cuadro: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosObjeto({ ...datosObjeto, [name]: value });
    setCamposCompletos({ ...camposCompletos, [name]: Boolean(value) });
  };

  const handleContinuarClick = () => {
    const camposIncompletos = Object.keys(camposCompletos).filter(
      (campo) => !camposCompletos[campo]
    );

    if (camposIncompletos.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Campos Incompletos!",
        text: "Verificar campos incompletos...",
      });
      return;
    }

    navigate("/datos-personales", { state: { datosObjeto } });
  };

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };
  return (
    <div className="App">
      <h1 className="datos-personales-h1">Datos De La Bicicleta</h1>
      <form className="formulario-personal">
        <InputGlobal titulo="Marca" required placeholder="" name="Marca"
          value={datosObjeto.Marca} onChange={handleInputChange}></InputGlobal>
        <InputGlobal titulo="Modelo" required placeholder="" name="Modelo"
          value={datosObjeto.Modelo} onChange={handleInputChange}></InputGlobal>
        <InputGlobal
          titulo="N° de Cuadro"
          required
          placeholder=""
          name="Cuadro"
          value={datosObjeto.Cuadro}
          onChange={handleInputChange}
        ></InputGlobal>
        <InputGlobal
          titulo="Tipo de Bicicleta"
          required
          placeholder=""
          name="Tipo"
          value={datosObjeto.Tipo}
          onChange={handleInputChange}
        ></InputGlobal>
        <InputGlobal
          titulo="Año de Fabricacion"
          required
          placeholder=""
          name="Año"
          value={datosObjeto.Año}
          onChange={handleInputChange}
        ></InputGlobal>
      </form>
      <div className="div_bt-opciones">
      <img
      onClick={goBack}
              src="siguiente.png"
              alt="Asegurar"
              style={{
                transform: "rotate(180deg)",
                marginTop:"30px",
                width: "50px",
                height: "50px",
                display: "block",
                margin: "auto",
                cursor:"pointer"
              }}
            />
        <img
      onClick={handleContinuarClick}
              src="siguiente.png"
              alt="Asegurar"
              style={{
                marginTop:"30px",
                width: "50px",
                height: "50px",
                display: "block",
                margin: "auto",
                cursor:"pointer"
              }}
            />
      </div>
    </div>
  );
}

export default Bici;
