import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ButtonVolver from "../BottonVolver/BottonVolver";
import axios from "axios";
import "./Detalle-Poliza.css";

function DetallePoliza() {
  const [detallePoliza, setDetallePoliza] = useState(null);
  const [aseguradora, setAseguradora] = useState("");
  const [aseguradoraLocal, setAseguradoraLocal] = useState("");
  const [numeroLocal, setNumeroLocal] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchDetallePoliza = async () => {
      try {
        const response = await axios.get(
          `http://192.168.56.1:3001/detalle-poliza/${id}`
        );
        setDetallePoliza(response.data);
        setAseguradoraLocal(response.data.aseguradora);
        setNumeroLocal(response.data.numero_oficial);
        /* console.log(response.data) */
      } catch (error) {
        console.error("Error al obtener detalles de la póliza:", error);
      }
    };

    fetchDetallePoliza();
  }, [id]);

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };

  const handleBlur = async () => {
    try {
      // Realiza una solicitud al servidor para actualizar la aseguradora
      await axios.post(`http://192.168.56.1:3001/actualizar-poliza/${id}`, {
        aseguradora: aseguradoraLocal,
        numero_oficial: numeroLocal,
      });

      // Recarga la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar la póliza:", error);
    }
  };

  const handleChangeAseguradora = (e) => {
    // Actualiza el valor local mientras escribes
    setAseguradoraLocal(e.target.value);
  };

  const handleChangeNumero = (e) => {
    // Actualiza el valor local mientras escribes
    setNumeroLocal(e.target.value);
  };

  if (!detallePoliza) {
    return (
      <div className="detalle-informe-container loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const estadosPoliza = {
    A: "Con Poliza Activa",
    I: "Sin Poliza Activa / Poliza Vencida",
  };

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return ""; // Si la fecha no está presente, devuelve una cadena vacía
    }

    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };

  const handleAgregarMeses = async (idPoliza) => {
    try {
      // Realiza la actualización en la base de datos, por ejemplo:
      await axios.post(`http://192.168.56.1:3001/actualizar-fecha/${idPoliza}`);
      window.location.reload();
    } catch (error) {
      console.error("Error al agregar meses a la póliza:", error);
    }
  };

  const aseguradoraLimpio = aseguradoraLocal === "";
  const classAseguradora = aseguradoraLimpio ? "is-empty" : "";

  const Imagen = ({ src }) => (
    <img style={{ maxWidth: "30%", height: "auto" }} src={src} alt="Foto" />
  );

  const numeroLimpio = numeroLocal === "";
  const classNumero = numeroLimpio ? "is-empty" : "";
  const fechaVencimiento = formatearFecha(detallePoliza.vencimiento);
  const esFechaVencida = new Date(detallePoliza.vencimiento) < new Date();

  return (
    <div className="detalle-informe-container">
      <h2 className="h1-titulo-detalle">Detalles de la Póliza</h2>
      <div className="detalle-informe-columns">
        <p>N° de Póliza: {detallePoliza.id_poliza}</p>
        <p className={esFechaVencida ? "fecha-vencida" : ""}>
          Fecha vencimiento: {fechaVencimiento}
          {esFechaVencida && (
            <button
              className="bt-agregar-meses"
              onClick={() => handleAgregarMeses(detallePoliza.id_poliza)}
            >
              Actualizar Fecha
            </button>
          )}
        </p>
        <p>Estado de Póliza: {estadosPoliza[detallePoliza.estado]}</p>

        <p className={classAseguradora}>
          Nombre de Aseguradora:
          <input
            type="text"
            value={aseguradoraLocal}
            placeholder={
              aseguradoraLocal === "" ? " Completar Campo!!" : aseguradoraLocal
            }
            onChange={handleChangeAseguradora}
            onBlur={handleBlur}
            className={classAseguradora}
          />
        </p>
        <p className={classNumero}>
          N° de Póliza Oficial:
          <input
            type="text"
            value={numeroLocal}
            onChange={handleChangeNumero}
            onBlur={handleBlur}
            className={classNumero}
            placeholder={numeroLocal === "" ? "Completar Campo" : numeroLocal}
          />
        </p>
      </div>

      <h2 className="h1-titulo-detalle">Detalles del Informe</h2>
      <div className="detalle-informe-columns">
        <p>N° de Informe: {detallePoliza.id_informe}</p>
        <p>Objeto Asegurado: {detallePoliza.tipo_objeto}</p>
      </div>
      <h2 className="h1-titulo-detalle">Galeria de Fotos</h2>
          <div className="fotos-container">
            {Object.keys(detallePoliza).map((key) => {
              if (
                detallePoliza[key] &&
                typeof detallePoliza[key] === "string" &&
                detallePoliza[key].startsWith("data:image/jpeg;base64,")
              ) {
                return <Imagen key={key} src={detallePoliza[key]} />;
              }
              return null;
            })}
          </div>     
      <h2 className="h1-titulo-detalle">Datos Personales</h2>
      <div className="detalle-informe-columns">
        <p>
          Nombre y Apellido: {detallePoliza.nombre} {detallePoliza.apellido}
        </p>
        <p>DNI: {detallePoliza.dni}</p>
        <p>Numero de Telefono: {detallePoliza.telefono}</p>
        <p>Email: {detallePoliza.email}</p>
      </div>
      <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
    </div>
  );
}

export default DetallePoliza;
