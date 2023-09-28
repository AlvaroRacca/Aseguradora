import React from "react";
import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Celular() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };
  return (
    <div className="App">
      <h1 className="datos-personales-h1">Datos Del Celular</h1>
      <form className="formulario-personal">
        <InputGlobal titulo="Marca" required placeholder=""></InputGlobal>
        <InputGlobal titulo="Modelo" required placeholder=""></InputGlobal>
        <InputGlobal titulo="Año" required placeholder=""></InputGlobal>
        <InputGlobal
          titulo="Memoria (en Gigabyte)"
          required
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          titulo="Valor Actualizado"
          required
          placeholder=""
        ></InputGlobal>
        <div className="form__group field">
          <label htmlFor="name" className="form__label">
            Estado del Telefono
          </label>
          <select className="select" name="Estado del Vehiculo">
            <option selected disabled>
              Estado
            </option>
            <option value="Malo">Malo</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Bueno">Bueno</option>
            <option value="Muy Bueno">Muy Bueno</option>
          </select>
        </div>
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

export default Celular;
