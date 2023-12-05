// Foto.jsx
import React, { useRef, useState,useEffect  } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { usePhotoContext } from './PhotoContext';
import './Foto.css';

function Foto() {
  const webcamRef = useRef(null);
  const { addCapturedImage } = usePhotoContext();
  const [capturedImage, setCapturedImage] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const navigate = useNavigate();

  const handleCapture = () => {
    const photo = webcamRef.current.getScreenshot();
    setCapturedImage(photo);
  };

  const handleSave = () => {
    if (capturedImage) {
      addCapturedImage({ src: capturedImage, width: 4, height: 3 });
      setCapturedImage(null);
      navigate("/menu-fotos");
      setButtonDisabled(true);
    }
  };

  const handleRetry = () => {
    setCapturedImage(null);
    setButtonDisabled(false);
  };

  return (
    <div className="foto-container">
      {!capturedImage ? (
        <React.Fragment>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
          <button className="capture-button" onClick={handleCapture}>
            Capturar foto
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <img className="captured-image" src={capturedImage} alt="Captured" />
          <div className="button-container">
            <button className="save-button" onClick={handleSave}>
              Guardar foto
            </button>
            <button className="retry-button" onClick={handleRetry}>
              Volver a capturar
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Foto;