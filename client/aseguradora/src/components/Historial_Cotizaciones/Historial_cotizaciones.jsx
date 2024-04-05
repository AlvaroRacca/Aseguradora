import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Historial_cotizaciones.css";
import {ButtonVolver} from "../BottonVolver/BottonVolver";
import config from "../config";

function HistorialCotizaciones() {
  const DB_HOST = config.DB_HOST;
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todos");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const response = await axios.get(
          `http://${DB_HOST}/mostrar-cotizaciones`
        );
        setCotizaciones(response.data);
      } catch (error) {
        console.error("Error al obtener las cotizaciones:", error);
      } finally {
        // Después de obtener los datos, actualiza el estado de carga
        setLoading(false);
      }
    };

    fetchCotizaciones();
  }, []);

  const navigateDetalleCotizacion = (id) => {
    navigate(`/detalle-cotizacion/${id}`);
  };

  const estadoCotizacion = {
    A: "No Contactado",
    C: "Contactado",
  };

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const cotizacionesFiltradas = cotizaciones.filter((cotizacion) => {
    if (filtro === "todos") {
      return true;
    } else {
      return cotizacion.Estado === filtro;
    }
  });

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return ""; // Si la fecha no está presente, devuelve una cadena vacía
    }

    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };

  return (
    <div className="cotizaciones-container">
      <h1 className="h1-cotizacion">Historial de Cotizaciones</h1>
      <div className="filtro-container">
        <label>
          Filtrar por:
          <select
            className="form-select"
            value={filtro}
            onChange={handleFiltroChange}
          >
            <option value="todos">Todos</option>
            <option value="A">No Contactados</option>
            <option value="C">Contactados</option>
          </select>
        </label>
      </div>
      {loading ? (
        <div className="detalle-informe-container loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="cotizacion-list">
          {cotizacionesFiltradas.map((cotizacion) => (
            <div
              key={cotizacion.id}
              onClick={() => navigateDetalleCotizacion(cotizacion.id)}
              className={`cotizacion-item ${
                cotizacion.Estado === "C" ? "contactado" : ""
              }`}
            >
              <p>
                <strong>Tipo de Objeto a Asegurar:</strong>{" "}
                {cotizacion.Tipo_objeto}
              </p>
              <p>
                <strong>Nombre:</strong> {cotizacion.Nombre}
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                {estadoCotizacion[cotizacion.Estado] +
                  (cotizacion.fecha_contactada !== null
                    ? " el " + formatearFecha(cotizacion.fecha_contactada)
                    : "")}
              </p>
            </div>
          ))}
        </div>
      )}
      <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
    </div>
  );
}

export default HistorialCotizaciones;
