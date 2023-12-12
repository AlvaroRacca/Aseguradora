import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import axios from "axios";
import "./detalle_cotizacion.css";
import Swal from "sweetalert2";
import ButtonVolver from "../BottonVolver/BottonVolver";
import withReactContent from "sweetalert2-react-content";

function DetalleCotizacion({ userData, setUserData, setIsAuthenticated }) {
  const [cotizacion, setCotizacion] = useState(null);
  const [nivelUsuario, setNivelUsuario] = useState(null);
  const [esCotactadoEstado, setEsCotactadoEstado] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  /* Alerttaaaaaa */
  const MySwal = withReactContent(Swal);
  /* ----------------- */

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };

  useEffect(() => {
    const fetchCotizacion = async () => {
      try {
        const response = await axios.get(
          `http://192.168.56.1:3001/detalle-cotizacion/${id}`
        );
        setCotizacion(response.data[0]);
        setEsCotactadoEstado(response.data[0].Estado);

        setUserData.nivel = 1;
      } catch (error) {
        console.error("Error al obtener la cotización:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCotizacion();
  }, [id]);

  const contactar = async () => {
    try {
      // Realizar la solicitud para actualizar el estado al servidor
      const response = await axios.post(
        `http://192.168.56.1:3001/actualizar-estado-cotizacion/${id}`
      );

      // Verificar si la solicitud fue exitosa
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "El cliente se contacto con exito",
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
          text: "Hubo un error al actualizar el estado de cotización",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la cotización:", error);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return ""; // Si la fecha no está presente, devuelve una cadena vacía
    }

    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };

  const estadoCotizacion = {
    A: "No Contactado",
    C: "Contactado",
  };

  const esContactado = estadoCotizacion[esCotactadoEstado] === "Contactado";
  const claseDeEstilo = esContactado ? "es-contactado" : "no-contactado";

  return (
    <div className="detalle-cotizacion-container">
      {loading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div>
          <h1 className="h1-titulo-cotizacion">Detalle de Cotización</h1>
          <div className="detalle-cotizacion-columna">
            {cotizacion.Tipo_objeto && (
              <p>Tipo de Objeto: {cotizacion.Tipo_objeto}</p>
            )}
            {cotizacion.Nombre && <p>Nombre: {cotizacion.Nombre}</p>}
            {cotizacion.Email && <p>Email: {cotizacion.Email}</p>}
            {cotizacion.Whatsapp && <p>Whatsapp: {cotizacion.Whatsapp}</p>}
            {cotizacion.Km && <p>Kilómetros: {cotizacion.Km}</p>}
            {cotizacion.Gamma && <p>Gamma: {cotizacion.Gamma}</p>}
            {cotizacion.Marca && <p>Marca: {cotizacion.Marca}</p>}
            {cotizacion.Memoria && <p>Memoria: {cotizacion.Memoria}</p>}
            {cotizacion.Modelo && <p>Modelo: {cotizacion.Modelo}</p>}
            {cotizacion.Seguro && <p>Seguro: {cotizacion.Seguro}</p>}
            {cotizacion.Tipo_Bici && (
              <p>Tipo de Bici: {cotizacion.Tipo_Bici}</p>
            )}
          </div>
          <h1 className={claseDeEstilo}>
            {" Cliente " +
              estadoCotizacion[esCotactadoEstado] +
              (cotizacion.fecha_contactada !== null
                ? " el " + formatearFecha(cotizacion.fecha_contactada)
                : "")}
          </h1>
          {estadoCotizacion[esCotactadoEstado] !== "Contactado" && (
            <Button
              titulo="Notificar como Contactado"
              onClick={contactar}
            ></Button>
          )}
        </div>
      )}
      <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
    </div>
  );
}

export default DetalleCotizacion;
