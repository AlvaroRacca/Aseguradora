import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "./menu-admin.css";
function MenuAdmin({ isAuthenticated, userData, setUserData, setIsAuthenticated }) {
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      /* ip alvaro: 192.168.100.106 */
      await axios.get("http://192.168.100.106:3001/cerrar-sesion");
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
        <Link to="/objetos">
          <Button titulo="Asegurar"></Button>
        </Link>
        <Link to="/historial-cotizacion-rapida">
          <Button titulo="Historial Cotizacion Rapida"></Button>
        </Link>
        <Link to="/historial-informes">
          <Button titulo="Historial Informes"></Button>
        </Link>
        <Link to="/historial-polizas">
          <Button titulo="Historial Polizas"></Button>
        </Link>
        <Button titulo="Cerrar Sesión" onClick={handleLogout}></Button>
      </div>
    </div>
  );
}

export default MenuAdmin;
