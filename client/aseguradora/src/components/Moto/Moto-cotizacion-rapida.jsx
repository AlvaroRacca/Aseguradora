import React, { useState }  from "react";
import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Axios from "axios";

function MotoCotizacionRapida() {
  const navigate = useNavigate();

   /* Alerttaaaaaa */
   const MySwal = withReactContent(Swal);
   /* ----------------- */

  const [datosObjeto, setDatosObjeto] = useState({
    Tipo_objeto: "moto",
    Marca: "",
    Modelo: "",
    Año: "",
    Nombre: "",
    Email: "",
    Whatsapp: "",
    Km: "",
    Seguro: "",
  });

  const [camposCompletos, setCamposCompletos] = useState({
    Marca: false,
    Modelo: false,
    Año: false,
    Nombre: false,
    Email: false,
    Whatsapp: false,
    Km: false,
    Seguro: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosObjeto({ ...datosObjeto, [name]: value });
    setCamposCompletos({ ...camposCompletos, [name]: Boolean(value) });
  };
  
  const handleContinuarClick = async () => {
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
  
    try {
      // Realizar la inserción en la base de datos
      const response = await Axios.post("http://192.168.56.1:3001/crear-cotizacion", datosObjeto);
  
      // Verificar el estado de la respuesta del servidor
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Cotizacion Enviada",
          text: "Su cotizacion fue enviada con exito",
        });
  
        // Redirigir a la siguiente página después del éxito
        navigate("/");
      } else {
        // Mostrar un mensaje de error en caso de un estado diferente
        throw new Error("Error en la inserción");
      }
    } catch (error) {
      console.error("Error al insertar en la base de datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al procesar la inserción en la base de datos.",
      });
    }
  };
  


  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };
  return (
    <div className="App">
      <h1 className="datos-personales-h1">Datos Para Cotizacion</h1>
      <form className="formulario-personal">
        <InputGlobal titulo="Nombre Cliente" name="Nombre"
          value={datosObjeto.Nombre}
          onChange={handleInputChange} required placeholder=""></InputGlobal>
        <InputGlobal titulo="Email" name="Email"
          value={datosObjeto.Email}
          onChange={handleInputChange} required placeholder=""></InputGlobal>
        <InputGlobal type="number" titulo="Whatsapp" name="Whatsapp"
          value={datosObjeto.Whatsapp}
          onChange={handleInputChange} required placeholder=""></InputGlobal>
        <InputGlobal titulo="Marca" name="Marca"
          value={datosObjeto.Marca}
          onChange={handleInputChange} required placeholder=""></InputGlobal>
        <InputGlobal titulo="Modelo" name="Modelo"
          value={datosObjeto.Modelo}
          onChange={handleInputChange} required placeholder=""></InputGlobal>
        <InputGlobal titulo="Año" type="number" name="Año"
          value={datosObjeto.Año}
          onChange={handleInputChange} required placeholder=""></InputGlobal>
        <InputGlobal titulo="Km" name="Km" type="number"
          value={datosObjeto.Km}
          onChange={handleInputChange} required placeholder=""></InputGlobal>
        <div className="form__group field">
          <label htmlFor="name" className="form__label">
            Seguro a Cotizar
          </label>
          <select id="select" name="Seguro" required
            value={datosObjeto.Seguro}
            onChange={handleInputChange}>
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
        <Button titulo="Finalizar" onClick={handleContinuarClick}></Button>
      </div>
    </div>
  );
}

export default MotoCotizacionRapida;