import React, { useState } from "react";
import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Celular() {
  const navigate = useNavigate();


  const [datosObjeto, setDatosObjeto] = useState({
    Tipo_objeto: "celular",
    Marca: "",
    Modelo: "",
    Año: "",
    Memoria: "",
    Valor_Actual: "",
    Estado_Celular: "",
  });
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosObjeto({ ...datosObjeto, [name]: value });

  };

  const handleContinuarClick = () => {
    navigate("/datos-personales", { state: { datosObjeto } });
  };

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };
  return (
    <div className="App">
      <h1 className="datos-personales-h1">Datos Del Celular</h1>
      <form className="formulario-personal">
        <InputGlobal
          titulo="Marca"
          required
          placeholder=""
          name="Marca"
          value={datosObjeto.Marca}
          onChange={handleInputChange}
        ></InputGlobal>
        <InputGlobal
          titulo="Modelo"
          required
          placeholder=""
          name="Modelo"
          value={datosObjeto.Modelo}
          onChange={handleInputChange}
        ></InputGlobal>
        <InputGlobal
          titulo="Año"
          required
          placeholder=""
          name="Año"
          value={datosObjeto.Año}
          onChange={handleInputChange}
        ></InputGlobal>
        <InputGlobal
          titulo="Memoria (Gigabyte)"
          required
          placeholder=""
          name="Memoria"
          value={datosObjeto.Memoria}
          onChange={handleInputChange}
        ></InputGlobal>
        <InputGlobal
          titulo="Valor Actualizado"
          required
          placeholder=""
          name="Valor_Actual"
          value={datosObjeto.Valor_Actual}
          onChange={handleInputChange}
        ></InputGlobal>
        <div className="form__group field">
          <label htmlFor="name" className="form__label">
            Estado del Celular
          </label>
          <select
            className="select"
            name="Estado_Celular"
            value={datosObjeto.Estado_Celular}
            onChange={handleInputChange}
          >
            <option selected disabled>
              Estado
            </option>
            <option value="" disabled selected>
              Forma de Pago
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
          <Button titulo="Continuar" onClick={handleContinuarClick}></Button>
      </div>
    </div>
  );
}

export default Celular;
