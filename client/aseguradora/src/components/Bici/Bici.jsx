import React from "react";
import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Bici() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };
  return (
    <div className="App">
      <h1 className="datos-personales-h1">Datos De La Bicicleta</h1>
      <form className="formulario-personal">
        <InputGlobal titulo="Marca" required placeholder=""></InputGlobal>
        <InputGlobal titulo="Modelo" required placeholder=""></InputGlobal>
        <InputGlobal
          titulo="N° de Cuadro"
          required
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          titulo="Tipo de Bicicleta"
          required
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          titulo="Año de Fabricacion"
          required
          placeholder=""
        ></InputGlobal>
      </form>
      <div className="div_bt-opciones">
        <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
        <Link to="/datos-personales">
          <Button titulo="Continuar"></Button>
        </Link>
      </div>
    </div>
  );
}

export default Bici;
