// PhotoContext.js
import React, { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const PhotoContext = createContext();
const MySwal = withReactContent(Swal);

export const usePhotoContext = () => {
  return useContext(PhotoContext);
};

export const PhotoProvider = ({ children }) => {
  const [capturedImages, setCapturedImages] = useState([]);
  const [datosObjeto, setDatosObjeto] = useState({});
  const [datosPersonales, setDatosPersonalesGlobal] = useState({});

  const [tipoObjeto, setTipoObjeto] = useState(null); 
  const [GNC, setGNC] = useState(null);// Agregar estado para el tipo de objeto

  const addCapturedImage = (image) => {
    if (capturedImages.length >= 7) {
      // Limpiar el array de fotos si hay más de 4 fotos
      setCapturedImages([]);
      Swal.fire({
        icon: 'error',
        title: '¡Demasiadas fotos!..',
        text: 'Memoria Limpia, Volver a capturar',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setCapturedImages((prevImages) => [...prevImages, image]);
    }
  };

  const contextValue = {
    capturedImages,
    addCapturedImage,
    datosObjeto,
    setDatosObjeto,
    datosPersonales,
    setDatosPersonalesGlobal,
    tipoObjeto,
    setTipoObjeto,
    GNC,
    setGNC,
  };

  return (
    <PhotoContext.Provider value={contextValue}>{children}</PhotoContext.Provider>
  );
};
