import React, { useState } from "react";
import "./Auto.css";
import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


function Auto() {
  const navigate = useNavigate();

   /* Alerttaaaaaa */
   const MySwal = withReactContent(Swal);
   /* ----------------- */


  const [datosObjeto, setDatosObjeto] = useState({
    Tipo_objeto: "auto",
    Marca: "",
    Modelo: "",
    Año: "",
    Gamma: "",
    GNC: "",
    Patente: "",
    Km: "",
    Estado_Cubiertas: "",
    Estado_Vehiculo: "",
    Seguros: "",
  });


  const [camposCompletos, setCamposCompletos] = useState({
    Marca: false,
    Modelo: false,
    Año: false,
    Gamma: false,
    GNC: false,
    Patente: false,
    Km: false,
    Estado_Cubiertas: false,
    Estado_Vehiculo: false,
    Seguros: false,
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
      <h1 className="datos-personales-h1">Datos Del Auto</h1>
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
          titulo="Gamma"
          required
          placeholder=""
          name="Gamma"
          value={datosObjeto.Gamma}
          onChange={handleInputChange}
        ></InputGlobal>
        <InputGlobal
          titulo="Patente"
          required
          placeholder=""
          name="Patente"
          value={datosObjeto.Patente}
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
        <div className="form__group field">
          <label htmlFor="name" className="form__label">
            Estado del Vehiculo
          </label>
          <select
          id="select"
            name="Estado_Vehiculo" 
            required
            value={datosObjeto.Estado_Vehiculo}
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              Estado
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
          id="select"
            name="Estado_Cubiertas"
            value={datosObjeto.Estado_Cubiertas}
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              Estado
            </option>
            <option value="25%">25%</option>
            <option value="50%">50%</option>
            <option value="75%">75%</option>
            <option value="100%">100%</option>
          </select>
        </div>

        <InputGlobal
          titulo="Km"
          required
          placeholder=""
          name="Km"
          type="number"
          value={datosObjeto.Km}
          onChange={handleInputChange}
        ></InputGlobal>
        <div className="form__group field">
          <label htmlFor="name" className="form__label">
            GNC
          </label>
          <select
          id="select"
            name="GNC"
            value={datosObjeto.GNC}
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              GNC
            </option>
            <option value="SI">SI</option>
            <option value="NO">NO</option>
          </select>
        </div>
        <div className="form__group field">
          <label htmlFor="name" className="form__label">
            Seguro a Cotizar
          </label>
          <select
          id="select"
            name="Seguros"
            value={datosObjeto.Seguros}
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
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

        <Button titulo="Continuar" onClick={handleContinuarClick}></Button>
      </div>
    </div>
  );
}

export default Auto;
