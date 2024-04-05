import React, { useState } from "react";
import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Celular() {
  const navigate = useNavigate();
     /* Alerttaaaaaa */
     const MySwal = withReactContent(Swal);
     /* ----------------- */
  


  const [datosObjeto, setDatosObjeto] = useState({
    Tipo_objeto: "celular",
    Marca: "",
    Modelo: "",
    Año: "",
    Memoria: "",
    valor: "",
    Estado_Celular: "",
  });

  const [camposCompletos, setCamposCompletos] = useState({
    Marca: false,
    Modelo: false,
    Año: false,
    Memoria: false,
    valor: false,
    Estado_Celular: false,
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
          name="valor"
          value={datosObjeto.valor}
          onChange={handleInputChange}
        ></InputGlobal>
        <div className="form__group field">
          <label htmlFor="name" className="form__label">
            Estado del Celular
          </label>
          <select
            id="select"
            name="Estado_Celular"
            value={datosObjeto.Estado_Celular}
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
      </form>
      <div className="div_bt-opciones">
      <img
      onClick={goBack}
              src="asset/siguiente.png"
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
              src="asset/siguiente.png"
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

export default Celular;
