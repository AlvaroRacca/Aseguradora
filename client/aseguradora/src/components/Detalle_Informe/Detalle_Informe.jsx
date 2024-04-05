import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Detalle_Informe.css";
import ButtonPropio from "../Button/Button";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {ButtonVolver} from "../BottonVolver/BottonVolver";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import config from "../config";

function DetalleInforme() {
  const DB_HOST = config.DB_HOST;
  const { id, tipoObjeto } = useParams();
  const [informe, setInforme] = useState(null);
  const [polizaVigente, setPolizaVigente] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [debitoAutomatico, setDebitoAutomatico] = useState(false);
  const [fotos, setFotos] = useState([]);
  const navigate = useNavigate();

  /* Alerttaaaaaa */
  const MySwal = withReactContent(Swal);
  /* ----------------- */
  useEffect(() => {
    const fetchInforme = async () => {
      try {
        const response = await axios.get(
          `http://${DB_HOST}/detalle-informe/${id}/${tipoObjeto}`
        );
        setInforme(response.data);
        setPolizaVigente(response.data.estadoInfo);
      } catch (error) {
        console.error("Error al obtener detalles del informe:", error);
      }
    };

    fetchInforme();
  }, [id]);

  const handleGuardar = async () => {
    try {
      if (debitoAutomatico) {
        setFechaVencimiento("00-00-0000");
      }

      const response = await axios.post(
        `http://${DB_HOST}/crear-poliza/${id}`,
        { fechaVencimiento }
      );

      // Verificar si la solicitud fue exitosa
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Poliza creada exitosamente",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Recarga la página después de cerrar la alerta
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al crear poliza",
        });
      }
    } catch (error) {
      console.error("Error al informar el pago:", error);
    }
  };

  if (!informe) {
    return (
      <div className="detalle-informe-container loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const estadosMapping = {
    A: "Esperando creacion de poliza",
    I: "Inactivo",
    P: "Poliza Activa",
  };

  const estadosPoliza = {
    P: "Con Poliza Activa",
    I: "Sin Poliza Vigente",
    A: "Esperando cracion de poliza"
  };

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };

  const handleInformarPago = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const Imagen = ({ src }) => (
    <img style={{ maxWidth: "50%", height: "auto" }} src={src} alt="Foto" />
  );

  const esPolizaActiva = estadosPoliza[polizaVigente] === "Con Poliza Activa";
  const claseDeEstilo = esPolizaActiva ? "poliza-activa" : "sin-poliza-activa";

  return (
    <div className="detalle-informe-container">
      <h1 className="h1-titulo-detalle">Datos Personales</h1>
      <div className="detalle-informe-columns ">
        <p>
          Nombre y Apellido: {informe.nombre} {informe.apellido}
        </p>
        <p>DNI: {informe.dni} </p>
        <p>Email: {informe.email}</p>
        <p>Telefono: {informe.telefono}</p>
        <p>Localidad: {informe.localidad}</p>
        <p>
          Provincia: {informe.provincia} - {informe.codigo_postal}
        </p>
        <p>Direccion: {informe.direccion}</p>
        <p>Piso: {informe.piso}</p>
        <p>Depto N°: {informe.departamento}</p>
        <p>Forma de Pago: {informe.Forma_Pago}</p>
      </div>
      <h1 className="h1-titulo-detalle">
        Datos Del Objeto: {informe.tipo_objeto}
      </h1>
      <div className="detalle-informe-columns">
        <p>Año: {informe.año}</p>
        <p>Marca : {informe.marca}</p>
        <p>Modelo : {informe.modelo}</p>
        {informe.tipo_objeto == "auto" && (
          <>
            <p>Estado del Informe: {estadosMapping[informe.estadoInfo]}</p>
            <p>Tipo de Objeto Informado: {informe.tipo_objeto}</p>
            <p>Estado del Vehiculo : {informe.Estado_Vehiculo}</p>
            <p>Estado de Cubiertas : {informe.Estado_Cubiertas}</p>
            <p>Gamma : {informe.gamma}</p>
            <p>Patente : {informe.patente}</p>
            <p>GNC : {informe.GNC}</p>
          </>
        )}
        {informe.tipo_objeto == "moto" && (
          <>
            <p>Estado del Informe: {estadosMapping[informe.estado]}</p>
            <p>Tipo de Objeto Informado: {informe.tipo_objeto}</p>
            <p>Estado del Vehiculo : {informe.Estado_Vehiculo}</p>
            <p>Estado de Cubiertas : {informe.Estado_Cubiertas}</p>
            <p>Patente : {informe.patenteMoto}</p>
            <p>KM : {informe.km}</p>
          </>
        )}
        {informe.tipo_objeto == "bicicleta" && (
          <>
            <p>Cuadro : {informe.cuadro}</p>
          </>
        )}
        {informe.tipo_objeto == "celular" && (
          <>
            <p>Memoria (GB) : {informe.memoria}</p>
            <p>Valor Actual : {informe.valor}</p>
          </>
        )}
        <p>Seguro a Adquirir : {informe.seguros}</p>
      </div>
      <div>
        <h1 className="h1-titulo-detalle">Galeria de Fotos</h1>
        <div className="fotos-container">
          {Object.keys(informe).map((key) => {
            if (
              informe[key] &&
              typeof informe[key] === "string" &&
              informe[key].startsWith("data:image/jpeg;base64,")
            ) {
              return <Imagen key={key} src={informe[key]} />;
            }
            return null;
          })}
        </div>
      </div>
      <div className="crear-poliza-bt">
      <h1 className={claseDeEstilo}>{estadosPoliza[polizaVigente]} </h1>
      {estadosPoliza[polizaVigente] == "Sin Poliza Vigente" && (
        <>
           
           <button onClick={() => setShowModal(true)} >{`Crear Póliza para el cliente ${informe.nombre} ${informe.apellido}`}</button>  
        </>
      )}
      </div>
      <ButtonVolver onClick={goBack}></ButtonVolver>
      <Modal
        show={showModal}
        onHide={handleModalClose}
        centered // Center the modal vertically
      >
       <Modal.Body>
          <Form>
            <Form.Group controlId="formFechaVencimiento">
              <Form.Label>Fecha de Vencimiento: </Form.Label>
              <Form.Control
                type="date"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
                disabled={debitoAutomatico}
              />
            </Form.Group>
            <Form.Group controlId="formDebitoAutomatico">
              <Form.Check
                type="checkbox"
                label="Débito Automático"
                checked={debitoAutomatico}
                onChange={(e) => setDebitoAutomatico(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  className="poliza-button"  variant="secondary" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button  className="poliza-button" variant="primary" onClick={handleGuardar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DetalleInforme;
