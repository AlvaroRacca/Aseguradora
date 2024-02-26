import React, { useState } from "react";
import { usePhotoContext } from "../Foto/PhotoContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sesion.css";

function Sesion({ setIsAuthenticated, setUserData }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [nivelAcceso, setNivelAcceso] = useState(""); // Almacena el nivel de acceso
  const [nombreUsuario, setNombreUsuario] = useState(""); // Almacena el nombre de usuario
  const navigate = useNavigate();
  const { setDatosUsuario } = usePhotoContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        /* ip alvaro: 192.168.100.106 */
        "http://192.168.100.106:3001/iniciar-sesion",
        formData
      );
  
      if (response.status === 200) {
        
        if (response.data.message === "Bienvenido, Administrador" || response.data.message === "Bienvenido, Usuario Normal") {
          
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("username", formData.username);
          localStorage.setItem("userId", response.data.usuario.id);
          localStorage.setItem("nivel", response.data.usuario.nivel);
  
          setIsAuthenticated(true);
          setNivelAcceso(response.data.message === "Bienvenido, Administrador" ? "admin" : "usuario");
          setUserData({ id: response.data.usuario.id, username: formData.username, nivel:response.data.usuario.nivel });
          setDatosUsuario(response.data.usuario);
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
