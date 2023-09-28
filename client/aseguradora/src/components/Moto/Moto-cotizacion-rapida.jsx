import React from "react";
import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, Outlet, useNavigate } from "react-router-dom";

function MotoCotizacionRapida() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };
  return (
    <div className="App">
      <h1 className="datos-personales-h1">Datos De La Moto</h1>
      <form className="formulario-personal">
        <InputGlobal titulo="Nombre Cliente" required placeholder=""></InputGlobal>
        <InputGlobal titulo="Email" required placeholder=""></InputGlobal>
        <InputGlobal titulo="Whatsapp" required placeholder=""></InputGlobal>
        <InputGlobal titulo="Marca" required placeholder=""></InputGlobal>
        <InputGlobal titulo="Modelo" required placeholder=""></InputGlobal>
        <InputGlobal titulo="Año" required placeholder=""></InputGlobal>
        <InputGlobal titulo="Km" required placeholder=""></InputGlobal>
        <div className="form__group field">
          <label htmlFor="name" className="form__label">
            Seguro a Cotizar
          </label>
          <select className="select" name="Seguros">
            <option selected disabled>
              Seguros
            </option>
            <option value="Seguro básico">Seguro básico</option>
            <option value="Seguro contra terceros">
              Seguro contra terceros
            </option>
            <option value="Seguro contra todo riesgo">
              Seguro contra todo riesgo
            </option>
          </select>
        </div>
      </form>
      <div className="div_bt-opciones">
        <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
        <Link to="/enviar">
          <Button titulo="Continuar"></Button>
        </Link>
      </div>
    </div>
  );
}

export default MotoCotizacionRapida;