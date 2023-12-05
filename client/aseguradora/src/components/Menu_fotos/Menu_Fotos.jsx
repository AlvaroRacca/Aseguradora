import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import Galeria from "../Galeria/Galeria";
import { usePhotoContext } from "../Foto/PhotoContext";
import Foto from "../Foto/Foto";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function MenuFotos({ userData }) {
  /* Alerttaaaaaa */
  const MySwal = withReactContent(Swal);
  /* ----------------- */
  const navigate = useNavigate();

  const { capturedImages } = usePhotoContext();
  const { tipoObjeto, GNC, datosObjeto } = usePhotoContext();
  const { datosPersonalesGlobal } = usePhotoContext();
  const [datosObjetoLocal, setDatosObjetoLocal] = useState(null);
  const [datosPersonalesLocalState, setDatosPersonalesLocalState] =
    useState(null);

  const location = useLocation();
  const datosPersonales = location.state?.datosPersonales || null;

  useEffect(() => {
    setDatosObjetoLocal(datosObjeto);
    if (datosPersonales !== null) {
      setDatosPersonalesLocalState(datosPersonales);
    }
  }, [tipoObjeto, GNC, datosPersonalesGlobal]);

  useEffect(() => {
    // Guardar datosPersonales en el localStorage
    if (datosPersonales !== null) {
      setDatosPersonalesLocalState(datosPersonales);
      localStorage.setItem("datosPersonales", JSON.stringify(datosPersonales));
    }
  }, [datosPersonales]);

  useEffect(() => {
    // Recuperar datosPersonales del localStorage al montar el componente
    const storedDatosPersonales = localStorage.getItem("datosPersonales");
    if (storedDatosPersonales) {
      setDatosPersonalesLocalState(JSON.parse(storedDatosPersonales));
    }
  }, []);

  const goBack = () => {
    console.log("datosObjeto", datosObjetoLocal);
    console.log("datosPersonales", datosPersonalesLocalState);
  };

  // Función para generar nombres únicos
  const generarNombreUnico = () => {
    const caracteres =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const longitud = 10; // Puedes ajustar la longitud del nombre único según tus necesidades
    let nombreUnico = "";

    for (let i = 0; i < longitud; i++) {
      const indiceCaracter = Math.floor(Math.random() * caracteres.length);
      nombreUnico += caracteres.charAt(indiceCaracter);
    }

    return nombreUnico;
  };

  const handlerSubirDatos = async () => {
    try {
      const responseDatosPersonales = await Axios.post(
        "http://192.168.56.1:3001/datos-personales",
        {
          datosPersonales: datosPersonalesLocalState,
        }
      );
      if (responseDatosPersonales) {
        const idDatosPersonales =
          responseDatosPersonales.data.id_datosPersonales;
        const formData = new FormData();
        formData.append("id_datos_personales", idDatosPersonales);

        for (const image of capturedImages) {
            // Convertir la ruta de la imagen en datos binarios
            const response = await Axios.get(image.src, { responseType: "arraybuffer" });
            const blob = new Blob([response.data]);
            formData.append("images", blob);
          } 

      
        // Subir la imagen a la tabla 'fotos'
        const responseFoto = await Axios.post(
            "http://192.168.56.1:3001/subir-fotos",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          ); 
        const responseDatosObjeto = await Axios.post(
          "http://192.168.56.1:3001/datos-objeto",
          {
            datosObjeto,
            id_datos_personales: idDatosPersonales,
          }
        );

        if (responseDatosObjeto) {
          const responseInforme = await Axios.post(
            "http://192.168.56.1:3001/informe",
            {
              id_Usuario: userData.id,
              id_datos_personales:
                responseDatosPersonales.data.id_datosPersonales,
              tipo_objeto: datosObjeto.Tipo_objeto,
            }
          );

          if (responseInforme) {
            
            if (responseInforme) {
              
              Swal.fire({
                icon: "success",
                title: "Proceso completado exitosamente",
                showConfirmButton: false,
                timer: 1500,
              });
              if (userData && userData.nivel_acceso === 1) {
                navigate("/admin");
              } else {
                navigate("/");
              }
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un error al guardar en la tabla Informe",
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Hubo un error al guardar en la tabla Poliza",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error al guardar los datos del objeto",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al guardar los datos personales",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error. Mira la consola para obtener más detalles.");
    }
  };

  return (
    <div>
      <div className="div-bt-inicio" style={{ marginTop: "0%" }}>
        <Link to="/adjuntar-foto">
          <Button titulo="Foto Frontal"></Button>
        </Link>
        <Link to="/adjuntar-foto">
          <Button titulo="Foto Trasera"></Button>
        </Link>
        <Link to="/adjuntar-foto">
          <Button titulo="Foto Lateral Derecha"></Button>
        </Link>
        <Link to="/adjuntar-foto">
          <Button titulo="Foto Lateral Izquierda"></Button>
        </Link>

        {tipoObjeto === "auto" && GNC === "SI" && (
          <Link to="/adjuntar-foto">
            <Button titulo="Foto Tarjeta GNC"></Button>
          </Link>
        )}

        {tipoObjeto === "auto" && (
          <Link className="link-foto" to="/adjuntar-foto">
            <Button titulo="Foto Frente Tarjeta"></Button>
          </Link>
        )}

        {tipoObjeto === "moto" && (
          <Link className="link-foto" to="/adjuntar-foto">
            <Button titulo="Foto Frente Tarjeta"></Button>
          </Link>
        )}

        {tipoObjeto === "bicicleta" && (
          <Link className="link-foto" to="/adjuntar-foto">
            <Button titulo="Foto N° Cuadro"></Button>
          </Link>
        )}

        {tipoObjeto === "celular" && (
          <Link className="link-foto" to="/adjuntar-foto">
            <Button titulo="Foto N° IMEI"></Button>
          </Link>
        )}
        {/* {capturedImages && <Galeria fotos={capturedImages} />} */}
        <Button titulo="Finalizar" onClick={handlerSubirDatos}></Button>
      </div>
    </div>
  );
}

export default MenuFotos;
