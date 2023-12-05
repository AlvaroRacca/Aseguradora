import React, { useState } from "react";
import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sesion.css";

function Sesion({ setIsAuthenticated, setUserData }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [nivelAcceso, setNivelAcceso] = useState(""); // Almacena el nivel de acceso
  const [nombreUsuario, setNombreUsuario] = useState(""); // Almacena el nombre de usuario
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /* const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.56.1:3001/iniciar-sesion",
        formData
      );

      if (response.status === 200) {
        // Verificar la respuesta del servidor
        if (response.data.message === "Bienvenido, Administrador") {
          setNivelAcceso("admin");
          setIsAuthenticated(false);
          setUserData({ id: response.data.usuario.id, username: formData.username });
          localStorage.setItem("username", formData.username); // Almacena el nombre de usuario
          localStorage.setItem("userId", response.data.usuario.id);
          navigate("/admin"); // Ajusta la ruta según tus necesidades
        } else if (response.data.message === "Bienvenido, Usuario Normal") {
          setIsAuthenticated(false);
          setNivelAcceso("usuario");
          setUserData({ id: response.data.usuario.id, username: formData.username });
          localStorage.setItem("username", formData.username); // Almacena el nombre de usuario
          localStorage.setItem("userId", response.data.usuario.id);
          navigate("/"); // Ajusta la ruta según tus necesidades
        } else {
          setError("Acceso no autorizado");
        }
      } else {
        setError("Error al iniciar sesión");
      }
    } catch (error) {
      setError("Error al iniciar sesión");
    }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://192.168.56.1:3001/iniciar-sesion",
        formData
      );
  
      if (response.status === 200) {
        if (response.data.message === "Bienvenido, Administrador" || response.data.message === "Bienvenido, Usuario Normal") {
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("username", formData.username);
          localStorage.setItem("userId", response.data.usuario.id);
  
          setIsAuthenticated(true);
          setNivelAcceso(response.data.message === "Bienvenido, Administrador" ? "admin" : "usuario");
          setUserData({ id: response.data.usuario.id, username: formData.username });
  
          navigate(response.data.message === "Bienvenido, Administrador" ? "/admin" : "/");
        } else {
          setError("Acceso no autorizado");
        }
      } else {
        setError("Error al iniciar sesión");
      }
    } catch (error) {
      setError("Error al iniciar sesión");
    }
  };




  return (
    <div className="login-container">
      <h1>Iniciar Sesion</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Sesion;
