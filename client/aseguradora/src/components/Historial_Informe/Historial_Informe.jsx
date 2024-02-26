import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Historial_Informe.css";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { useNavigate } from "react-router-dom";

function HistorialInforme({ isAuthenticated }) {
  const [filtro, setFiltro] = useState("todas");
  const [informe, setInformes] = useState([]);
  const navigate = useNavigate();
  const [patenteBusqueda, setPatenteBusqueda] = useState("");

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const handlePatenteBusquedaChange = (e) => {
    setPatenteBusqueda(e.target.value);
  };

  const handleInformeClick = (id, tipoObjeto) => {
    // Redirigir a la página de detalles del informe con el ID correspondiente
    navigate(`/detalle-informe/${id}/${tipoObjeto}`);
  };

  const handleFiltrar = async () => {
    try {
      // Hacer la solicitud para filtrar los datos según el filtro
      const response = await Axios.get(
        `http://192.168.100.106:3001/obtener-informes/${filtro}`
      );

      const responseData = response.data;
      const informesFiltrados = patenteBusqueda
        ? responseData.filter((informe) => {
            const patenteAutoIncluida =
              informe.patente && informe.patente.includes(patenteBusqueda);
            const patenteMotoIncluida =
              informe.patenteMoto &&
              informe.patenteMoto.includes(patenteBusqueda);
            const apellidoIncluido =
              informe.apellido && informe.apellido.includes(patenteBusqueda);
            const nombreIncluido =
              informe.nombre && informe.nombre.includes(patenteBusqueda);

            return (
              patenteAutoIncluida ||
              patenteMotoIncluida ||
              apellidoIncluido ||
              nombreIncluido
            );
          })
        : responseData;

      setInformes(informesFiltrados);
    } catch (error) {
      console.error("Error al filtrar los datos:", error);
      // Puedes mostrar un mensaje de error o manejar la excepción de alguna manera
    }
  };

  const hasResults = informe.length > 0;

  // Llamada inicial al cargar el componente
  useEffect(() => {
    handleFiltrar();
  }, [filtro]); // Ahora, se llamará cada vez que 'filtro' cambie

  const estadosMapping = {
    A: "Activo",
    I: "Inactivo",
    P: "Poliza",
  };

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };


  if (informe === null) {
    // Manejo de carga
    return (
      <div className="detalle-informe-container loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="historial-container">
      <h1>Historial de Informes</h1>
      <form className="form-inputs">
        <label>
          Filtrar por:
          <select
            className="form-select"
            value={filtro}
            onChange={handleFiltroChange}
          >
            <option value="todas">Todas los informes</option>
            <option value="auto">Auto</option>
            <option value="moto">Moto</option>
            <option value="bici">Bicicleta</option>
            <option value="celular">Celular</option>
          </select>
        </label>
        <label htmlFor="">
          <div className="container">
            <input
              type="text"
              name="text"
              className="input"
              placeholder="Nombre, Apellido o Patente"
              value={patenteBusqueda}
              onChange={handlePatenteBusquedaChange}
            />
            <button class="search__btn" type="button" onClick={handleFiltrar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
              >
                <path
                  d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                  fill="#efeff1"
                ></path>
              </svg>
            </button>
          </div>
        </label>
      </form>
      {!hasResults && (
          <p className="sin-resultados-mensaje">
            No se encontraron informes para los criterios seleccionados.
          </p>
        )}
      <div className="informe-list">
        {informe.map((informe) => (
          <div
            key={informe.id_informe}
            className="informe-item"
            onClick={() =>
              handleInformeClick(informe.id_informe, informe.tipo_objeto)
            }
          >
            <p>
              <strong>Tipo:</strong> {informe.tipo_objeto}
            </p>
            {informe.tipo_objeto === "auto" && (
              <p>
                <strong>Patente:</strong> {informe.patente}
              </p>
            )}
            {informe.tipo_objeto === "moto" && (
              <p>
                <strong>Patente:</strong> {informe.patenteMoto}
              </p>
            )}
            <p>
              <strong>Nombre y Apellido:</strong> {informe.nombre},{" "}
              {informe.apellido}
            </p>
          </div>
        ))}
      </div>
      <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
    </div>
  );
}

export default HistorialInforme;
