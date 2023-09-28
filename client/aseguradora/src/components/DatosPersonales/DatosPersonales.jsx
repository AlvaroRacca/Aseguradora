import "./DatosPersonales.css";
import React, { useState } from "react";
import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";

function DatosPersonales() {
  const navigate = useNavigate();

  const location = useLocation();
  const datosObjeto = location.state?.datosObjeto || {};

  const [datosPersonales, setDatosPersonales] = useState({
    Nombre: "",
    Apellido: "",
    DNI: "",
    CUIT: "",
    Email: "",
    Localidad: "",
    Provincia: "",
    Codigo_Postal: "",
    Direccion: "",
    Piso: "",
    Departamento: "",
    Telefono: "",
    Forma_Pago: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosPersonales({ ...datosPersonales, [name]: value });
  };

  const handleFinalizar = async () => {
    try {
      // Hacer la solicitud para guardar los datos personales
      const response1 = await Axios.post("http://192.168.100.5:3001/datos-personales", {
        datosPersonales,
      });
  
      if (response1.data.id_datosPersonales) {
        // Si la primera solicitud fue exitosa, procede con la segunda solicitud
        const response2 = await Axios.post("http://192.168.100.5:3001/datos-objeto", {
          datosObjeto,
        });
  
        if (response2.data.message) {
          console.log("Los datos del vehículo se guardaron correctamente");
          // Puedes redirigir al usuario a una página de confirmación o hacer lo que necesites aquí
        } else {
          console.log("Hubo un error al guardar los datos del vehículo");
        }
      } else {
        console.log("Hubo un error al guardar los datos personales");
      }
    } catch (error) {
      alert(error);
    }
  };

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };
  return (
    <div className="App">
      <h1 className="datos-personales-h1">Datos Personales</h1>
      <form className="formulario-personal">
        <InputGlobal
          name="Nombre"
          titulo="Nombre"
          value={datosPersonales.Nombre}
          onChange={handleInputChange}
          required
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          name="Apellido"
          titulo="Apellido"
          value={datosPersonales.Apellido}
          onChange={handleInputChange}
          required
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          name="DNI"
          titulo="DNI"
          value={datosPersonales.DNI}
          onChange={handleInputChange}
          required
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          name="CUIT"
          titulo="CUIT"
          value={datosPersonales.CUIT}
          onChange={handleInputChange}
          required
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          name="Email"
          titulo="Email"
          value={datosPersonales.Email}
          onChange={handleInputChange}
          required
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          name="Localidad"
          titulo="Localidad"
          value={datosPersonales.Localidad}
          onChange={handleInputChange}
          required
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          name="Provincia"
          titulo="Provincia"
          value={datosPersonales.Provincia}
          onChange={handleInputChange}
          required
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          name="Codigo_Postal"
          titulo="Codigo Postal"
          value={datosPersonales.Codigo_Postal}
          onChange={handleInputChange}
          required
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          name="Direccion"
          titulo="Direccion"
          value={datosPersonales.Direccion}
          onChange={handleInputChange}
          required
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          name="Piso"
          titulo="Piso"
          required
          type="number"
          value={datosPersonales.Piso}
          onChange={handleInputChange}
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          name="Departamento"
          titulo="Departamento"
          value={datosPersonales.Departamento}
          onChange={handleInputChange}
          required
          placeholder=""
        ></InputGlobal>
        <InputGlobal
          name="Telefono"
          titulo="Codigo Area + Celular"
          value={datosPersonales.Telefono}
          onChange={handleInputChange}
          required
          type="tel"
          placeholder=""
        ></InputGlobal>
        <div className="form__group field">
          <label htmlFor="name" className="form__label">
            Forma de Pago
          </label>
          <select
            className="select"
            value={datosPersonales.Forma_Pago}
            onChange={handleInputChange}
            name="Forma_Pago"
          >
            <option value="" disabled selected>
              Forma de Pago
            </option>
            <option value="Transferencia">Transferencia</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Efectivo">Efectivo</option>
          </select>
        </div>
      </form>
      <div className="div_bt-opciones">
        <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
        <Button titulo="Continuar" onClick={handleFinalizar}></Button>
      </div>
    </div>
  );
}

export default DatosPersonales;
