import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import axios from "axios";
import config from "../config";
import "./menu-admin.css";
function MenuAdmin({ isAuthenticated, userData, setUserData, setIsAuthenticated }) {
  const navigate = useNavigate();
  const DB_HOST = config.DB_HOST;

  const handleLogout = async () => {
    try {
      /* ip alvaro: 192.168.100.106 */
      await axios.get(`http://${DB_HOST}/cerrar-sesion`);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      setIsAuthenticated(false);
      setUserData({});
      setUserData({nivel:"0"});
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <div className="div-bt-inicio">
        <h1 className="p-bienvenida">Panel de Administración</h1>
        <div className="div-cards" >
        <Link to="/objetos"  style={{ display: "inline-block" }}>
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
        <Link to="/historial-cotizacion-rapida"  style={{ display: "inline-block" }}>
          <Card className="card max-w-sm">
                  <img
                    src="asset/historial.png"
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
                    Historial Cotizacion Rapida
                  </h3>
                </Card>
        </Link>
        <Link to="/historial-informes"  style={{ display: "inline-block" }}>
         <Card className="card max-w-sm">
                  <img
                    src="asset/historial-informe.png"
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
                    Historial Informes
                  </h3>
                </Card>
        </Link>
        <Link to="/historial-polizas"  style={{ display: "inline-block" }}>
        <Card className="card max-w-sm">
                  <img
                    src="asset/poliza.png"
                    alt="Asegurar"
                    style={{
                      color:"black",
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
                    Historial Poliza
                  </h3>
                </Card>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default MenuAdmin;
