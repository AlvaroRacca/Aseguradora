import React, { useState } from "react";
import InputGlobal from "../InputGlobal/InputGlobal";
import Button from "../Button/Button";
import ButtonVolver from "../BottonVolver/BottonVolver";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Foto() {
  const navigate = useNavigate();

  const handleContinuarClick = () => {
    navigate("/menu");
  };

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };

  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const snap = document.getElementById("snap");
  const errorMsgElement = document.querySelector("span#errorMsg");

  const constraints = {
    video: {
      width: 1280,
      height: 720,
    },
  };

  // Access webcam
  async function init() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    } catch (e) {
      errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
  }

  // Success
  function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;

    // Ahora que video se ha cargado, puedes obtener el contexto 2D del canvas
    const context = canvas.getContext("2d");

    // Draw image
    snap.addEventListener("click", function () {
      context.drawImage(video, 0, 0, 640, 480);
    });
  }

  // Llama a la función init después de que el DOM se haya cargado completamente
  init();

  // Draw imag
  return (
    <div className="App">
      <h1 className="datos-personales-h1">Adjunar Foto del Objeto</h1>

      <div className="video-wrap">
        <video id="video" playsInline autoPlay></video>
      </div>

      <div className="controller">
        <button id="snap">Capture</button>
      </div>

      <canvas id="canvas" width="640" height="480"></canvas>

      <div className="div_bt-opciones">
        <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
        <Button titulo="Continuar" onClick={handleContinuarClick}></Button>
      </div>
    </div>
  );
}

export default Foto;
