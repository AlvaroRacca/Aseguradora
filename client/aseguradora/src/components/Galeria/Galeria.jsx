// GaleriaFotos.jsx
import React from 'react';
import Gallery from 'react-photo-gallery';

function Galeria({ fotos }) {
  return (
    <div>
      {fotos.length > 0 && <Gallery photos={fotos} />}
    </div>
  );
}

export default Galeria;
