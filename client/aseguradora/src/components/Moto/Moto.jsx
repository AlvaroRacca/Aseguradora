import React, { useState } from "react";
import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, useNavigate } from "react-router-dom";

function Moto() {
  const navigate = useNavigate();

  const [datosObjeto, setDatosObjeto] = useState({
    Tipo_objeto: "moto",
    Marca: "",
    Modelo: "",
    Año: "",
    Km: "",
    Estado_Cubiertas: "",
    Estado_Vehiculo: "",
    Seguros: "",
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
      <h1 className="datos-personales-h1">Datos De La Moto</h1>
      <form className="formulario-personal">
        <InputGlobal
          name="Marca"
          titulo="Marca"
          required
          placeholder=""
          value={datosObjeto.Marca}
          onChange={handleInputChange}
        ></InputGlobal>
        <InputGlobal
          name="Modelo"
          titulo="Modelo"
          required
          placeholder=""
          value={datosObjeto.Modelo}
          onChange={handleInputChange}
        ></InputGlobal>
        <InputGlobal
          name="Año"
          titulo="Año"
          required
          placeholder=""
          value={datosObjeto.Año}
          onChange={handleInputChange}
        ></InputGlobal>
        <InputGlobal
          name="Km"
          titulo="Km"
          required
          placeholder=""
          value={datosObjeto.Km}
          onChange={handleInputChange}
        ></InputGlobal>
        <div className="form__group field">
          <label htmlFor="name" className="form__label">
            Estado del Vehiculo
          </label>
          <select
            className="select"
            name="Estado_Vehiculo"
            value={datosObjeto.Estado_Vehiculo}
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              Seleccionar
            </option>
            <option value="Malo">Malo</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Bueno">Bueno</option>
            <option value="Muy Bueno">Muy Bueno</option>
          </select>
        </div>
        <div className="form__group field">
          <label htmlFor="name" className="form__label">
            Estado de Cubiertas
          </label>
          <select
            className="select"
            name="Estado_Cubiertas"
            value={datosObjeto.Estado_Cubiertas}
            onChange={handleInputChange}
          >
            <option value="25%">25%</option>
            <option value="50%">50%</option>
            <option value="75%">75%</option>
            <option value="100%">100%</option>
          </select>
        </div>
        <div className="form__group field">
          <label htmlFor="name" className="form__label">
            Seguro a Cotizar
          </label>
          <select
            className="select"
            name="Seguros"
            value={datosObjeto.Seguros}
            onChange={handleInputChange}
          >
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
        <Button titulo="Continuar" onClick={handleContinuarClick}></Button>
      </div>
    </div>
  );
}

export default Moto;
