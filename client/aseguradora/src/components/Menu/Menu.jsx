import Button from "../Button/Button";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import axios from "axios";
import { PhotoProvider, usePhotoContext } from "../Foto/PhotoContext";
import Swal from "sweetalert2";
import { Tooltip } from "flowbite-react";
import withReactContent from "sweetalert2-react-content";
import SwalCss from "sweetalert2/dist/sweetalert2.js";
import CountUp from "react-countup";

import config from "../config";

function Menu({ isAuthenticated, setUserData, userData, setIsAuthenticated }) {
  const [numUsuarios, setNumUsuarios] = useState(0);
  const [numAseguradores, setNumAseguradores] = useState(0);
  const [numInformes, setNuminformes] = useState(0);
  const navigate = useNavigate();
  /* Alerttaaaaaa */
  const MySwal = withReactContent(Swal);
  /* ----------------- */
  const { datosUsuario } = usePhotoContext();

  const DB_HOST = config.DB_HOST;

  const [aseguradores, setAseguradores] = useState([]);
  const [selectedAseguradorId, setSelectedAseguradorId] = useState("");

  useEffect(() => {
    obtenerAseguradores();
  }, []);

  useEffect(() => {
    if (userData.id_asegurador) {
      setSelectedAseguradorId(userData.id_asegurador.toString()); // Convertir a cadena si es necesario
      localStorage.setItem(
        "selectedAseguradorStorag",
        userData.id_asegurador.toString()
      );
    }
  }, [userData.id_asegurador]);

  useEffect(() => {
    const storedAseguradorId = localStorage.getItem("selectedAseguradorStorag");
    if (storedAseguradorId) {
      setSelectedAseguradorId(storedAseguradorId); // Setear el ID como cadena de texto
    }
  }, []);

  const obtenerAseguradores = async () => {
    try {
      const response = await axios.get(`http://${DB_HOST}/aseguradores`);
      setNumAseguradores(response.data.cantidadAseguradores);
      setNumUsuarios(response.data.cantidadUsuarios);
      setAseguradores(response.data.aseguradores);
      setNuminformes(response.data.cantidadInformes);
    } catch (error) {
      console.error("Error al obtener los aseguradores:", error);
    }
  };

  const handleAseguradorChange = (event) => {
    const selectedId = event.target.value;
    setSelectedAseguradorId(selectedId.toString()); // Convertir a cadena de texto
    actualizarIdAsegurador(selectedId);
  };

  const actualizarIdAsegurador = async (idAsegurador) => {
    try {
      const idUsuarioLogueado = userData.userId || userData.id;
      console.log("En actualizar", userData);
      await axios.get(
        `http://${DB_HOST}/actualizar-asegurador/${idAsegurador}/${idUsuarioLogueado}`
      );
      // Actualizar el estado local con el nuevo idAsegurador
      setSelectedAseguradorId(idAsegurador);
      // Actualizar el valor en localStorage
      localStorage.setItem("asegurador", idAsegurador);
      setUserData((prevUserData) => ({
        ...prevUserData,
        id_asegurador: idAsegurador,
      }));

      obtenerAseguradores();
    } catch (error) {
      console.error("Error al actualizar el id_asegurador:", error);
    }
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  
  const mensajeInfo = () => {
    swalWithBootstrapButtons
      .fire({
        text: "¿Quieres iniciar sesión para obtener más funciones?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Iniciar Sesión",
        cancelButtonText: "No, gracias",
        reverseButtons: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        customClass: {
          popup: 'my-popup-class',
          header: 'my-header-class',
          title: 'my-title-class',
          content: 'my-content-class',
          actions: 'my-actions-class',
          confirmButton: 'my-confirm-button-class',
          cancelButton: 'my-cancel-button-class',
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/iniciar-sesion");
        }
      });
  };
  


  return (
    <div className="App">
      <div className="div-bt-inicio">
        {isAuthenticated ? (
          // Si el usuario está autenticado, muestra el mensaje de bienvenida y el botón de cerrar sesión
          <>
            <p className="p-bienvenida">
              ¡Bienvenido {userData.username}!
              {/* 
                número de ID: {userData.asegurador} */}
            </p>

            <div className="asegurador_select">
              <h3 style={{ width: "200px" }}>Su asegurador:</h3>
              <select
                id="select"
                className="select-asegurador"
                value={selectedAseguradorId}
                onChange={handleAseguradorChange}
              >
                <option value="">Seleccione un asegurador</option>
                {aseguradores.map((asegurador) => (
                  <option
                    key={asegurador.id_usuario}
                    value={asegurador.id_usuario}
                  >
                    {asegurador.id_usuario} - {asegurador.nombre}{" "}
                    {asegurador.apellido}
                  </option>
                ))}
              </select>
            </div>
            <div className="div-cards" >
              <Link to="/objetos" style={{ display: "inline-block" }}>
                <Card className="card max-w-sm">
                  <img
                    src="asset/asegurar.png"
                    alt="Asegurar"
                    style={{
                      width: "100px",
                      height: "100px",
                      display: "block",
                      margin: "auto",
                    }}
                  />
                  <h3
                    className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    style={{ textAlign: "center" }}
                  >
                    Asegurate
                  </h3>
                </Card>
              </Link>
              <Link to="/cotizacion-rapida" style={{ display: "inline-block" }}>
                <Card className="card max-w-sm">
                  <img
                    src="asset/asegura-rapido.png"
                    alt="Asegurar"
                    style={{
                      width: "100px",
                      height: "100px",
                      display: "block",
                      margin: "auto",
                    }}
                  />
                  <h3
                    className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    style={{ textAlign: "center" }}
                  >
                    Cotiza de Forma Rapida
                  </h3>
                </Card>
              </Link>
            </div>
          </>
        ) : (
          // Si el usuario no está autenticado, muestra los botones de Cotización Rápida, Registrarse e Iniciar Sesión
          <div>
            <div className="div-cards">
              <div className="contador-container">
                <div className="imagen-contenedor">
                  <img
                    src="asset/clientela.png"
                    alt="Asegurar"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </div>
                <div className="contadores">
                  <CountUp
                    start={numUsuarios * 100}
                    end={numUsuarios}
                    duration={1.75}
                  ></CountUp>
                </div>
                <div className="texto-contenedor">
                  <p className="contador-text">Clientela</p>
                </div>
              </div>

              <div className="contador-container">
                <div className="imagen-contenedor">
                  <img
                    src="asset/informes.png"
                    alt="Asegurar"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </div>
                <div className="contadores">
                  <CountUp
                    start={numInformes * 100}
                    end={numInformes}
                    duration={1.75}
                  ></CountUp>
                </div>
                <div className="texto-contenedor">
                  <p className="contador-text">Informes</p>
                </div>
              </div>

              <div className="contador-container">
                <div className="imagen-contenedor">
                  <img
                    src="asset/aseguradores.png"
                    alt="Asegurar"
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </div>
                <div className="contadores">
                  <CountUp
                    start={numAseguradores * 100}
                    end={numAseguradores}
                    duration={1.75}
                  ></CountUp>
                </div>
                <div className="texto-contenedor">
                  <p className="contador-text">Aseguradores</p>
                </div>
              </div>
            </div>
            <div className="div-cards">
              <Link
                onClick={mensajeInfo}
                to="/"
                style={{
                  display: "inline-block",
                  opacity: 0.3,
                }}
                data-tip
                data-for="asegurar-tooltip"
              >
                <Card className="card max-w-sm">
                  <img
                    src="asset/asegurar.png"
                    alt="Asegurar"
                    style={{
                      width: "100px",
                      height: "100px",
                      display: "block",
                      margin: "auto",
                    }}
                  />
                  <h3
                    className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    style={{ textAlign: "center" }}
                  >
                    Asegurate
                  </h3>
                </Card>
              </Link>

              <Link to="/cotizacion-rapida" style={{ display: "inline-block" }}>
                <Card className="card max-w-sm">
                  <img
                    src="asset/asegura-rapido.png"
                    alt="Asegurar"
                    style={{
                      width: "100px",
                      height: "100px",
                      display: "block",
                      margin: "auto",
                    }}
                  />
                  <h3
                    className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    style={{ textAlign: "center" }}
                  >
                    Cotiza de Forma Rapida
                  </h3>
                </Card>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
