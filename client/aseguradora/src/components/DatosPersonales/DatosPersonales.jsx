import "./DatosPersonales.css";
import React, { useState } from "react";
import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { useNavigate, useLocation } from "react-router-dom";
import { usePhotoContext } from "../Foto/PhotoContext";
import Swal from "sweetalert2";
import { Axios } from "axios";
import withReactContent from "sweetalert2-react-content";

function DatosPersonales({ userData }) {
  const navigate = useNavigate();

  /* Alerttaaaaaa */
  const MySwal = withReactContent(Swal);
  /* ----------------- */

  const location = useLocation();
  const datosObjeto = location.state?.datosObjeto || {};
  const { setDatosObjeto, setTipoObjeto, setGNC } =
    usePhotoContext();
  setTipoObjeto(datosObjeto.Tipo_objeto);
  setGNC(datosObjeto.GNC);

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

  const [errores, setErrores] = useState({
    Nombre: false,
    Apellido: false,
    DNI: false,
    CUIT: false,
    Email: false,
    Localidad: false,
    Provincia: false,
    Codigo_Postal: false,
    Direccion: false,
    Piso: false,
    Departamento: false,
    Telefono: false,
    Forma_Pago: false,
  });

  const handlerSubirDatos = async () => {
    try {
      const responseDatosPersonales = await Axios.post(
        "http://192.168.56.1:3001/datos-personales",
        {
          datosPersonales,
        }
      );
      if (responseDatosPersonales) {
        const idDatosPersonales =
          responseDatosPersonales.data.id_datosPersonales;

        const responseDatosObjeto = await Axios.post(
          "http://192.168.56.1:3001/datos-objeto",
          {
            datosObjeto,
            id_datos_personales: idDatosPersonales,
          }
        );

        if (responseDatosObjeto) {
          const responseInforme = await Axios.post(
            "http://192.168.56.1:3001/informe",
            {
              id_Usuario: userData.id,
              id_datos_personales:
                responseDatosPersonales.data.id_datosPersonales,
              tipo_objeto: datosObjeto.Tipo_objeto,
            }
          );

          if (responseInforme) {
            if (responseInforme) {
              Swal.fire({
                icon: "success",
                title: "Proceso completado exitosamente",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un error al guardar en la tabla Informe",
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Hubo un error al guardar en la tabla Poliza",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error al guardar los datos del objeto",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al guardar los datos personales",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error. Mira la consola para obtener más detalles.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosPersonales({ ...datosPersonales, [name]: value });
    setErrores({ ...errores, [name]: Boolean(value) });
  };

  const handleContinuarClick = () => {
    const camposConErrores = Object.keys(errores).filter(
      (campo) => !errores[campo]
    );

    if (camposConErrores.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Campos Incompletos!",
        text: "Verificar campos incompletos...",
      });
      return;
    }

    setDatosObjeto(datosObjeto);
    navigate("/menu-fotos", { state: { datosPersonales: datosPersonales } });
  };

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };

let elementosTransferencia = [<p><strong>Datos Para Transferencia</strong></p>, <p>Alias: pepi.turri18</p>,<p>CUIL: 20-38896488-0</p>,<p>Enviar Comprobante: pepiturri18@gmail.com</p>];
let elementosTarjetaEfectivo = [<strong><p>Esta formas de pago, se hara de forma presencial!!</p></strong>, <strong><p>Contactarse con su productor!!</p></strong>];


let elementosMostrar = [];
if (datosPersonales.Forma_Pago === "Transferencia") {
  elementosMostrar = elementosTransferencia;
} else if( datosPersonales.Forma_Pago === "Tarjeta" || datosPersonales.Forma_Pago === "Efectivo" || datosPersonales.Forma_Pago === "Debito") {
  elementosMostrar = elementosTarjetaEfectivo;
}



  return (
    <div className="App">
      <h1 className="datos-personales-h1">Datos Personales</h1>
      {/* <h2>{userData.id} hola</h2>  */}
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
          type="number"
        ></InputGlobal>
        <InputGlobal
          name="CUIT"
          titulo="CUIT"
          value={datosPersonales.CUIT}
          onChange={handleInputChange}
          required
          placeholder=""
          type="number"
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
          type="number"
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
          type="number"
          placeholder=""
        ></InputGlobal>
        <div className="form__group field">
          <label htmlFor="name" className="form__label">
            Forma de Pago
          </label>
          <select
            id="select"
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
            <option value="Debito">Debito Automatico</option>
          </select>
          {elementosMostrar.map((elemento, index) => (
            <div key={index} className="div-mensaje-pago">{elemento}</div>
          ))}
        </div>
      </form>
      <div className="div_bt-opciones">
        <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
        {/* <Button titulo="Finalizar" onClick={handleFinalizar}></Button> */}
        <Button titulo="Continuar" onClick={handleContinuarClick}></Button>
      </div>
    </div>
  );
}

export default DatosPersonales;
