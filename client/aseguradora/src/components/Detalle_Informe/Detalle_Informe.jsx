import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Detalle_Informe.css";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function DetalleInforme() {
  const { id, tipoObjeto } = useParams();
  const [informe, setInforme] = useState(null);
  const [polizaVigente, setPolizaVigente] = useState("");
  const [fotos, setFotos] = useState([]);
  const navigate = useNavigate();

  /* Alerttaaaaaa */
  const MySwal = withReactContent(Swal);
  /* ----------------- */
  useEffect(() => {
    const fetchInforme = async () => {
      try {
        const response = await axios.get(
          `http://192.168.56.1:3001/detalle-informe/${id}/${tipoObjeto}`
        );
        setInforme(response.data);
        setPolizaVigente(response.data.estadoInfo);
      } catch (error) {
        console.error("Error al obtener detalles del informe:", error);
      }
    };

    fetchInforme();
  }, [id]);

  const handleInformarPago = async () => {
    try {
      // Realizar la solicitud para informar el pago al servidor
      const response = await axios.post(
        `http://192.168.56.1:3001/crear-poliza/${id}`
      );

      // Verificar si la solicitud fue exitosa
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Poliza creada exitosamente",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Recarga la página después de cerrar la alerta
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al crear poliza",
        });
      }
    } catch (error) {
      console.error("Error al informar el pago:", error);
    }
  };

  if (!informe) {
    return (
      <div className="detalle-informe-container loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const estadosMapping = {
    A: "Activo Sin Poliza",
    I: "Inactivo",
    P: "Poliza Activa",
  };

  const estadosPoliza = {
    P: "Con Poliza Activa",
    A: "Sin Poliza Vigente",
  };

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };

  const Imagen = ({ src }) => (
    <img style={{ maxWidth: "50%", height: "auto" }} src={src} alt="Foto" />
  );

  const esPolizaActiva = estadosPoliza[polizaVigente] === "Con Poliza Activa";
  const claseDeEstilo = esPolizaActiva ? "poliza-activa" : "sin-poliza-activa";
  /* console.log("Datos de las fotos:", informe); */

  return (
    <div className="detalle-informe-container">
      <h1 className="h1-titulo-detalle">Datos Personales</h1>
      <div className="detalle-informe-columns ">
        <p>
          Nombre y Apellido: {informe.nombre} {informe.apellido}
        </p>
        <p>DNI: {informe.dni} </p>
        <p>Email: {informe.email}</p>
        <p>Telefono: {informe.telefono}</p>
        <p>Localidad: {informe.localidad}</p>
        <p>
          Provincia: {informe.provincia} - {informe.codigo_postal}
        </p>
        <p>Direccion: {informe.direccion}</p>
        <p>Piso: {informe.piso}</p>
        <p>Depto N°: {informe.departamento}</p>
        <p>Forma de Pago: {informe.Forma_Pago}</p>
      </div>
      <h1 className="h1-titulo-detalle">
        Datos Del Objeto: {informe.tipo_objeto}
      </h1>
      <div className="detalle-informe-columns">
        <p>Año: {informe.año}</p>
        <p>Marca : {informe.marca}</p>
        <p>Modelo : {informe.modelo}</p>
        {informe.tipo_objeto == "auto" && (
          <>
            <p>Estado del Informe: {estadosMapping[informe.estadoInfo]}</p>
            <p>Tipo de Objeto Informado: {informe.tipo_objeto}</p>
            <p>Estado del Vehiculo : {informe.Estado_Vehiculo}</p>
            <p>Estado de Cubiertas : {informe.Estado_Cubiertas}</p>
            <p>Gamma : {informe.gamma}</p>
            <p>Patente : {informe.patente}</p>
            <p>GNC : {informe.GNC}</p>
          </>
        )}
        {informe.tipo_objeto == "moto" && (
          <>
            <p>Estado del Informe: {estadosMapping[informe.estado]}</p>
            <p>Tipo de Objeto Informado: {informe.tipo_objeto}</p>
            <p>Estado del Vehiculo : {informe.Estado_Vehiculo}</p>
            <p>Estado de Cubiertas : {informe.Estado_Cubiertas}</p>
            <p>Patente : {informe.patenteMoto}</p>
            <p>KM : {informe.km}</p>
          </>
        )}
        {informe.tipo_objeto == "bicicleta" && (
          <>
            <p>Cuadro : {informe.cuadro}</p>
          </>
        )}
        {informe.tipo_objeto == "celular" && (
          <>
            <p>Memoria (GB) : {informe.memoria}</p>
            <p>Valor Actual : {informe.valor}</p>
          </>
        )}
        <p>Seguro a Adquirir : {informe.seguros}</p>
      </div>
      <div>
      <h1 className="h1-titulo-detalle">Galeria de Fotos</h1>
          <div className="fotos-container">
            {Object.keys(informe).map((key) => {
              if (
                informe[key] &&
                typeof informe[key] === "string" &&
                informe[key].startsWith("data:image/jpeg;base64,")
              ) {
                return <Imagen key={key} src={informe[key]} />;
              }
              return null;
            })}
          </div>
        </div>
      <h1 className={claseDeEstilo}>{estadosPoliza[polizaVigente]} </h1>
      {estadosPoliza[polizaVigente] !== "Con Poliza Activa" && (
        <>
          <Button titulo="Crear Poliza" onClick={handleInformarPago}></Button>
        </>
      )}
      <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
    </div>
  );
}

export default DetalleInforme;
