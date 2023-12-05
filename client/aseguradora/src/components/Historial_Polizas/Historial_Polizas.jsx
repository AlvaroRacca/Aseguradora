import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Historial_Polizas.css";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { useNavigate } from "react-router-dom";

function Historial_Polizas({  isAuthenticated, handlePolizaClick }) {
  const [polizas, setPolizas] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };

  useEffect(() => {
    const fetchPolizas = async () => {
      try {
        const response = await axios.get("http://192.168.56.1:3001/polizas");
        setPolizas(response.data);
      } catch (error) {
        console.error("Error al obtener todas las pólizas:", error);
      }finally {
        // Después de obtener los datos, actualiza el estado de carga
        setLoading(false);
      }
    };

    fetchPolizas();
  }, []);

  const estadosPoliza = {
    A: "Con Poliza Activa",
    I: "Sin Poliza Activa",
  };

  const navigateDetallePoliza = (id) => {
    navigate(`/detalle-poliza/${id}`);
  };

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return ""; // Si la fecha no está presente, devuelve una cadena vacía
    }

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };




  return (
    <div className="poliza-container">
      <h1 className="h1-poliza">Lista de Pólizas</h1>
      
      {loading ? (
        <div className="detalle-informe-container loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
      ) : (
        <div className="poliza-list">
          {polizas.map((poliza) => {
            const fechaVencimiento = formatearFecha(poliza.vencimiento);
            const esFechaVencida = new Date(poliza.vencimiento) < new Date();

            return (
              <div key={poliza.id} className={`poliza-item ${esFechaVencida ? 'fecha-vencida' : 'no-vencida'}`} 
                onClick={() => navigateDetallePoliza(poliza.id_poliza)}>
                <p>
                  <strong>N° de Póliza Oficial:</strong> {poliza.numero_oficial}
                </p>
                <p>
                  <strong>Nombre y Apellido:</strong> {poliza.nombre} {poliza.apellido}
                </p> 
                <p>
                  <strong>Vence:</strong> {fechaVencimiento}
                </p>
              </div>
            );
          })}
        </div>
      )}
      
      <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
    </div>
  );
} 

export default Historial_Polizas;
