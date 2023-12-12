import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ButtonVolver from "../BottonVolver/BottonVolver";
import axios from "axios";
import "./Detalle-Poliza.css";

function DetallePoliza() {
  const [detallePoliza, setDetallePoliza] = useState(null);
  const [aseguradora, setAseguradora] = useState("");
  const [aseguradoraLocal, setAseguradoraLocal] = useState("");
  const [numeroLocal, setNumeroLocal] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchDetallePoliza = async () => {
      try {
        const response = await axios.get(
          `http://192.168.56.1:3001/detalle-poliza/${id}`
        );
        setDetallePoliza(response.data);
        setAseguradoraLocal(response.data.aseguradora);
        setNumeroLocal(response.data.numero_oficial);
        /* console.log(response.data) */
      } catch (error) {
        console.error("Error al obtener detalles de la póliza:", error);
      }
    };

    fetchDetallePoliza();
  }, [id]);

  const goBack = () => {
    navigate(-1); // Utiliza navigate con un valor negativo para retroceder
  };

  const handleBlur = async () => {
    try {
      // Realiza una solicitud al servidor para actualizar la aseguradora
      await axios.post(`http://192.168.56.1:3001/actualizar-poliza/${id}`, {
        aseguradora: aseguradoraLocal,
        numero_oficial: numeroLocal,
      });

      // Recarga la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar la póliza:", error);
    }
  };

  const handleChangeAseguradora = (e) => {
    // Actualiza el valor local mientras escribes
    setAseguradoraLocal(e.target.value);
  };

  const handleChangeNumero = (e) => {
    // Actualiza el valor local mientras escribes
    setNumeroLocal(e.target.value);
  };

  if (!detallePoliza) {
    return (
      <div className="detalle-informe-container loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const estadosPoliza = {
    A: "Con Poliza Activa",
    I: "Sin Poliza Activa / Poliza Vencida",
  };

  const esDebitoAutomatico = detallePoliza.vencimiento === "0000-00-00";

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return ""; // Si la fecha no está presente, devuelve una cadena vacía
    }

    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(fecha).toLocaleDateString(undefined, options);
  };

  const handleAgregarMeses = async (idPoliza) => {
    try {
      // Realiza la actualización en la base de datos, por ejemplo:
      await axios.post(`http://192.168.56.1:3001/actualizar-fecha/${idPoliza}`);
      window.location.reload();
    } catch (error) {
      console.error("Error al agregar meses a la póliza:", error);
    }
  };

  const aseguradoraLimpio = aseguradoraLocal === "";
  const classAseguradora = aseguradoraLimpio ? "is-empty" : "";

  const Imagen = ({ src }) => (
    <img style={{ maxWidth: "30%", height: "auto" }} src={src} alt="Foto" />
  );

  // companiasDeSeguros.js

  const companiasDeSeguros = [
    "AFIANZADORA LATINOAMERICANA COMPAÑÍA DE SEGUROS S.A.",
    "ACE AMERICAN INSURANCE COMPANY (SUCURSAL ARGENTINA)",
    "ALLIANZ ARGENTINA COMPAÑIA DE SEGUROS S.A.",
    "ALLIANZ RE ARGENTINA S.A.",
    "LECCIONAR UNA COMPAÑIA",
    "ANDINA ART S.A.",
    "ANTARTIDA COMPAÑÍA ARGENTINA DE SEGUROS SOCIEDAD ANÓNIMA",
    "ANTICIPAR COMPAÑÍA DE SEGUROS S.A.",
    "ARGOS COMPAÑÍA ARGENTINA DE SEGUROS GENERALES SOCIEDAD ANÓNIMA",
    "ARGOS MUTUAL DE SEGUROS DEL TRANSPORTE PÚBLICO DE PASAJEROS",
    "ART MUTUAL DE EMPLEADOS MECANICOS Y AFINES DEL TRANSPORTE AUTOMOTOR SAN FRANCISCO",
    "ART MUTUAL RURAL DE SEGUROS DE RIESGOS DEL TRABAJO",
    "ASEGURADORA DE BIENES Y SERVICIOS S.A.",
    "ASEGURADORA DE CREDITOS Y GARANTIAS SOCIEDAD ANONIMA",
    "ASEGURADORA DEL FINISTERRE COMPAÑÍA ARGENTINA DE SEGUROS S.A.",
    "ASEGURADORES ARGENTINOS COMPAÑIA DE REASEGUROS S.A.",
    "ASEGURADORES DE CAUCIONES SOCIEDAD ANONIMA COMPAÑIA DE SEGUROS",
    "ASOCIACION MUTUAL DAN",
    "ASOCIART S.A. ASEGURADORA DE RIESGOS DEL TRABAJO",
    "ASSEKURANSA COMPAÑÍA DE SEGUROS SOCIEDAD ANÓNIMA",
    "ASSURANT ARGENTINA COMPAÑÍA DE SEGUROS SOCIEDAD ANÓNIMA",
    "ASV ARGENTINA SALUD, VIDA Y PATRIMONIALES COMPAÑIA DE SEGUROS S.A.",
    "ATM COMPAÑÍA DE SEGUROS S.A.",
    "BBVA SEGUROS ARGENTINA S.A.",
    "BENEFICIO S.A. COMPAÑIA DE SEGUROS",
    "BERKLEY ARGENTINA DE REASEGUROS S.A.",
    "BERKLEY INTERNATIONAL ASEGURADORA DE RIESGOS DEL TRABAJO SOCIEDAD ANONIMA",
    "BERKLEY INTERNATIONAL SEGUROS SOCIEDAD ANONIMA",
    "BHN SEGUROS GENERALES S.A.",
    "BHN VIDA S.A.",
    "BINARIA SEGUROS DE RETIRO S.A.",
    "BINARIA SEGUROS DE VIDA S.A.",
    "BONACORSI  SEGUROS DE PERSONAS S.A.",
    "BOSTON COMPAÑÍA ARGENTINA DE SEGUROS SOCIEDAD ANONIMA",
    "CAJA DE PREVISIÓN Y SEGURO MÉDICO DE LA PROVINCIA DE BS.AS",
    "CAJA DE SEGUROS S.A.",
    "CAJA POPULAR DE AHORROS DE LA PROVINCIA DE TUCUMAN",
    "CALEDONIA ARGENTINA COMPAÑIA DE SEGUROS SOCIEDAD ANONIMA",
    "CAMINOS PROTEGIDOS  COMPAÑÍA DE SEGUROS S.A.",
    "CARDIF SEGUROS S.A.",
    "CARUSO COMPAÑÍA ARGENTINA DE SEGUROS SOCIEDAD ANÓNIMA",
    "CERTEZA COMPAÑIA DE SEGUROS S.A.",
    "CESCE ARGENTINA S.A. SEGUROS DE CREDITO Y  GARANTÍAS",
    "CHUBB SEGUROS ARGENTINA S.A.",
    "CNP ASSURANCES COMPAÑIA DE SEGUROS S.A.",
    "COLON COMPAÑÍA DE SEGUROS SOCIEDAD ANONIMA",
    "COMARSEG COMPAÑIA ARGENTINA DE SEGUROS S.A.",
    "COMPAGNIE FRANCAISE D´ASSURANCE POUR LE COMMERCE EXTERIEUR (SUCURSAL ARGENTINA)",
    "COMPAÑIA ARGENTINA DE SEGUROS LATITUD SUR SOCIEDAD ANONIMA",
    "COMPAÑIA ARGENTINA DE SEGUROS VICTORIA SOCIEDAD ANONIMA",
    "COMPAÑÍA ASEGURADORA DEL SUR S.A.",
    "COMPAÑÍA DE SEGUROS DE JUJUY SOCIEDAD DEL ESTADO",
    "COMPAÑÍA DE SEGUROS EL NORTE SOCIEDAD ANONIMA",
    "COMPAÑIA DE SEGUROS EUROAMERICA S.A.",
    "COMPAÑIA DE SEGUROS INSUR S.A.",
    "COMPAÑIA DE SEGUROS LA MERCANTIL ANDINA SOCIEDAD ANONIMA",
    "COMPAÑÍA DE SEGUROS MAÑANA SOCIEDAD ANÓNIMA",
    "COMPAÑÍA MERCANTIL ASEGURADORA SOCIEDAD ANONIMA ARGENTINA DE SEGUROS",
    "CONFLUENCIA COMPAÑIA DE SEGUROS S.A.",
    "COOPERACION MUTUAL PATRONAL SOCIEDAD MUTUAL DE SEGUROS GENERALES",
    "COOPERATIVA DE SEGUROS LUZ Y FUERZA LIMITADA",
    "COPAN COOPERATIVA DE SEGUROS LIMITADA",
    "COSENA SEGUROS S.A.",
    "CREDICOOP COMPAÑIA DE SEGUROS DE RETIRO S.A.",
    "CREDITO Y CAUCION S.A. COMPAÑÍA DE SEGUROS",
    "CRUZ SUIZA COMPAÑÍA DE SEGUROS S.A.",
    "DIGNA SEGUROS S.A.",
    "EDIFICAR SEGUROS SOCIEDAD ANÓNIMA",
    "EL PROGRESO SEGUROS SOCIEDAD ANONIMA",
    "EL SURCO COMPAÑÍA DE SEGUROS SOCIEDAD ANONIMA",
    "EQU COMPAÑÍA DE SEGUROS DE PERSONAS S.A.",
    "ESENCIA SEGUROS S.A.",
    "EVOLUCIÓN SEGUROS S.A.",
    "Experta Aseguradora de Riesgos del Trabajo SA",
    "EXPERTA SEGUROS PATRIMONIALES S.A.",
    "EXPERTA SEGUROS SOCIEDAD ANÓNIMA UNIPERSONAL",
    "FEDERACION PATRONAL REASEGUROS S.A.",
    "FEDERACION PATRONAL SEGUROS DE RETIRO S.A.",
    "FEDERACIÓN PATRONAL SEGUROS S.A.U.",
    "FEDERADA COMPAÑÍA DE SEGUROS S.A.",
    "FIANZAS Y CREDITO S. A. COMPAÑIA DE SEGUROS",
    "GALENO ASEGURADORA DE RIESGOS DEL TRABAJO S.A.",
    "GALENO SEGUROS S.A.",
    "GALICIA RETIRO COMPAÑÌA DE SEGUROS SAU",
    "GALICIA SEGUROS SAU",
    "GARANTÍA MUTUAL DE SEGUROS DEL TRANSPORTE PÚBLICO DE PASAJEROS",
    "GESTION COMPAÑÍA ARGENTINA DE SEGUROS S.A.",
    "HAMBURGO COMPAÑIA DE SEGUROS SOCIEDAD ANONIMA",
    "HANSEATICA COMPAÑIA DE SEGUROS SOCIEDAD ANÓNIMA",
    "HDI SEGUROS S.A.",
    "HORIZONTE COMPAÑIA ARGENTINA DE SEGUROS GENERALES SOCIEDAD ANÓNIMA",
    "HSBC SEGUROS DE RETIRO (ARGENTINA) S.A.",
    "HSBC SEGUROS DE VIDA (ARGENTINA) S.A.",
    "INCLUIR COMPAÑÍA DE SEGUROS DE PERSONAS SOCIEDAD ANÓNIMA",
    "INSTITUTO ASEGURADOR MERCANTIL COMPAÑIA ARGENTINA DE SEGUROS SOCIEDAD ANÓNIMA IAM",
    "INSTITUTO AUTÁRQUICO PROVINCIAL DEL SEGURO",
    "INSTITUTO AUTARQUICO PROVINCIAL DEL SEGURO DE ENTRE RIOS SEGURO DE RETIRO SOCIEDAD ANONIMA",
    "INSTITUTO DE SALTA COMPAÑÍA DE SEGUROS DE VIDA SOCIEDAD ANÓNIMA",
    "INSTITUTO DE SEGUROS SOCIEDAD ANÓNIMA",
    "INTÉGRITY SEGUROS ARGENTINA S.A.",
    "IRB BRASIL RESSEGUROS S.A. (SUCURSAL ARGENTINA)",
    "IUNIGO ARGENTINA COMPAÑÍA DE SEGUROS SAU",
    "JUNCAL COMPAÑÍA DE SEGUROS DE AUTOS Y PATRIMONIALES S.A.",
    "LA DULCE COOPERATIVA DE SEGUROS LIMITADA",
    "LA EQUIDAD SOCIAL COMPAÑÌA DE SEGUROS S.A.",
    "LA EQUITATIVA DEL PLATA SOCIEDAD ANONIMA DE SEGUROS",
    "LA ESTRELLA S.A. COMPAñíA DE SEGUROS DE RETIRO",
    "LA HOLANDO SUDAMERICANA COMPAÑIA DE SEGUROS SOCIEDAD ANONIMA",
    "LA MERIDIONAL COMPAÑÍA ARGENTINA DE SEGUROS SOCIEDAD ANÓNIMA",
    "LA NUEVA COOPERATIVA DE SEGUROS LIMITADA",
    "LA PERSEVERANCIA SEGUROS SOCIEDAD ANONIMA",
    "LA PREVISORA S.A. SEGUROS DE SEPELIO",
    "LA SEGUNDA ASEGURADORA DE RIESGOS DEL TRABAJO SOCIEDAD ANÓNIMA",
    "LA SEGUNDA COMPAÑIA DE SEGUROS DE PERSONAS SOCIEDAD ANÓNIMA",
    "LA SEGUNDA COOPERATIVA LIMITADA DE SEGUROS GENERALES",
    "LA SEGUNDA SEGUROS DE RETIRO SOCIEDAD ANONIMA",
    "LA TERRITORIAL VIDA Y SALUD COMPAÑÍA DE SEGUROS SOCIEDAD ANÓNIMA",
    "LATIN AMERICAN SEGUROS S.A.",
    "LIBRA COMPAÑIA ARGENTINA DE SEGUROS S.A.",
    "LIDER MOTOS COMPAÑÍA DE SEGUROS S.A.",
    "LIDERAR COMPAÑIA GENERAL DE SEGUROS S.A.",
    "LIFE SEGUROS DE PERSONAS Y PATRIMONIALES S.A.",
    "MAPFRE ARGENTINA SEGUROS DE VIDA S.A.",
    "MAPFRE ARGENTINA SEGUROS S.A.",
    "MAPFRE RE COMPAÑIA DE REASEGUROS S.A. (SUCURSAL ARGENTINA)",
    "METROPOL COMPAÑÍA ARGENTINA DE SEGUROS SOCIEDAD ANONIMA",
    "METROPOL SOCIEDAD DE SEGUROS MUTUOS",
    "MISTA SEGUROS DE PERSONAS S.A.",
    "MUTUAL DE EMPLEADOS Y OBREROS PETROLEROS PRIVADOS ART MUTUAL",
    "MUTUAL RIVADAVIA DE SEGUROS DEL TRANSPORTE PÚBLICO DE PASAJEROS",
    "N.S.A. SEGUROS GENERALES S.A.",
    "NACION REASEGUROS S.A.",
    "NACIÓN SEGUROS DE RETIRO S.A.",
    "NACIÓN SEGUROS S.A.",
    "NATIVA COMPAÑIA ARGENTINA DE SEGUROS S.A.",
    "NIVEL SEGUROS S.A.",
    "NOBLE COMPAÑÍA DE SEGUROS SOCIEDAD ANÓNIMA",
    "NRE COMPAÑÍA DE SEGUROS S.A.",
    "OMINT ASEGURADORA DE RIESGOS DEL TRABAJO S.A.",
    "OMINT S.A. COMPAÑÍA DE SEGUROS",
    "OPCIÓN SEGUROS S.A.",
    "ORBIS COMPAÑÍA ARGENTINA DE SEGUROS S.A.",
    "ORÍGENES SEGUROS DE RETIRO S.A.",
    "PACÍFICO COMPAÑÍA DE SEGUROS S.A.",
    "PARANÁ SOCIEDAD ANONIMA DE SEGUROS",
    "PIEVE SEGUROS SOCIEDAD ANONIMA",
    "PLENARIA SEGUROS S.A.",
    "POR VIDA SEGUROS SOCIEDAD ANONIMA",
    "PREMIAR COMPAÑÍA ARGENTINA DE SEGUROS S.A.",
    "PREVENCIÓN ASEGURADORA DE RIESGOS DEL TRABAJO S.A.",
    "PREVENCIÓN SEGUROS DE RETIRO SOCIEDAD ANÓNIMA",
    "PREVINCA SEGUROS SOCIEDAD ANONIMA",
    "PRODUCTORES DE FRUTAS ARGENTINAS COOPERATIVA DE SEGUROS LIMITADA",
    "PROTECCIÓN MUTUAL DE SEGUROS DEL TRANSPORTE PÚBLICO DE PASAJEROS",
    "PROVIDENCIA COMPAÑIA ARGENTINA DE SEGUROS S.A.",
    "PROVINCIA ASEGURADORA DE RIESGOS DEL TRABAJO S.A.",
    "PROVINCIA SEGUROS DE VIDA S. A.",
    "PROVINCIA SEGUROS SOCIEDAD ANONIMA",
    "PROYECCION SEGUROS DE RETIRO S.A.",
    "PRUDENCIA COMPAÑIA ARGENTINA DE SEGUROS GENERALES SOCIEDAD ANÓNIMA",
    "PRUDENTIAL SEGUROS S.A.",
    "PUNTO SUR SOCIEDAD ARGENTINA DE REASEGUROS S.A.",
    "QUALIA COMPAÑÍA DE SEGUROS S.A.",
    "RCI COMPAÑÍA DE SEGUROS DE PERSONAS SAU",
    "REASEGURADORES ARGENTINOS S.A.",
    "RECONQUISTA ASEGURADORA DE RIESGOS DEL TRABAJO SOCIEDAD ANONIMA",
    "REUNION RE COMPAÑIA DE REASEGUROS S.A.",
    "RÍO URUGUAY COOPERATIVA DE SEGUROS LIMITADA",
    "SAN CRISTÓBAL SEGURO DE RETIRO SOCIEDAD ANONIMA",
    "SAN CRISTÓBAL SOCIEDAD MUTUAL DE SEGUROS GENERALES",
    "SAN GERMAN SEGUROS S.A.",
    "SAN MARINO COMPAÑÍA DE SEGUROS SOCIEDAD ANÓNIMA",
    "SAN PATRICIO SEGUROS S.A.",
    "SANCOR COOPERATIVA DE SEGUROS LIMITADA",
    "SANTA LUCÍA S.A. COMPAÑÍA DE SEGUROS",
    "SANTÍSIMA TRINIDAD SEGUROS DE VIDA SOCIEDAD ANONIMA",
    "SCOR GLOBAL P&C SE (SUCURSAL ARGENTINA)",
    "SEGURCOOP COOPERATIVA DE REASEGUROS LIMITADA",
    "SEGURCOOP COOPERATIVA DE SEGUROS LIMITADA",
    "SEGUROMETAL COOPERATIVA DE SEGUROS LIMITADA",
    "SEGUROS BERNARDINO RIVADAVIA COOPERATIVA LIMITADA",
    "SEGUROS MÉDICOS SOCIEDAD ANONIMA",
    "SEGUROS SURA S.A",
    "SENTIR SEGUROS SOCIEDAD ANONIMA",
    "SMG COMPAÑIA ARGENTINA DE SEGUROS S.A.",
    "SMG LIFE COMPAÑIA DE SEGUROS DE RETIRO S.A.",
    "SMG LIFE SEGUROS DE VIDA S.A.",
    "SMSV COMPAÑIA ARGENTINA DE SEGUROS S.A.",
    "SOL NACIENTE SEGUROS SOCIEDAD ANONIMA",
    "SOLVENCIA COMPAÑÍA DE SEGUROS DE RETIRO SOCIEDAD ANÓNIMA.",
    "STARR INDEMNITY &amp; LIABILITY COMPANY, SUCURSAL ARGENTINA, DE SEGUROS",
    "STELLANTIS INSURANCE COMPAÑIA DE SEGUROS S.A.U.",
    "SUMICLI  ASOCIACION MUTUAL DE SEGUROS",
    "SUPERVIELLE SEGUROS S.A.",
    "SWISS MEDICAL ART S.A.",
    "TESTIMONIO COMPAÑÍA DE SEGUROS S.A.",
    "TPC COMPAÑIA DE SEGUROS S.A.",
    "TRES PROVINCIAS SEGUROS DE PERSONAS S.A.",
    "TRIUNFO COOPERATIVA DE SEGUROS LIMITADA",
    "TUTELAR SEGUROS SOCIEDAD ANONIMA",
    "WARRANTY INSURANCE COMPANY ARGENTINA DE SEGUROS SOCIEDAD ANÓNIMA",
    "WORANZ COMPAÑÍA DE SEGUROS S.A.",
    "ZURICH ARGENTINA COMPAÑIA DE SEGUROS DE RETIRO SOCIEDAD ANÓNIMA",
    "ZURICH ARGENTINA COMPAÑIA DE SEGUROS SOCIEDAD ANONIMA",
    "ZURICH ASEGURADORA ARGENTINA S.A.",
    "ZURICH COMPAÑIA DE REASEGUROS ARGENTINA S.A.",
    "ZURICH INTERNATIONAL LIFE LIMITED SUCURSAL ARGENTINA",
    "ZURICH SANTANDER SEGUROS ARGENTINA S.A.",
    "ZURICH SANTANDER SEGUROS ARGENTINA S.A.",
  ];

  const handleDarDeBaja = async (idPoliza) => {
    try {
      // Realiza la solicitud al servidor para dar de baja la póliza
      await axios.post(`http://192.168.56.1:3001/dar-de-baja-poliza/${idPoliza}`);
      
      // Recarga la página para reflejar los cambios
      window.location.reload();
    } catch (error) {
      console.error("Error al dar de baja la póliza:", error);
    }
  };


  const numeroLimpio = numeroLocal === "";
  const classNumero = numeroLimpio ? "is-empty" : "";
  const fechaVencimiento = formatearFecha(detallePoliza.vencimiento);
  const esFechaVencida = new Date(detallePoliza.vencimiento) < new Date();

  return (
    <div className="detalle-informe-container">
      <h2 className="h1-titulo-detalle">Detalles de la Póliza</h2>
      <div className="detalle-informe-columns">
        <p>N° de Póliza: {detallePoliza.id_poliza}</p>
        <p className={esFechaVencida ? "fecha-vencida" : ""}>
          Fecha vencimiento:{" "}
          {esDebitoAutomatico
            ? "Póliza con débito automático"
            : fechaVencimiento}
          {esDebitoAutomatico && (
            <button
              className="bt-dar-de-baja"
              onClick={() => handleDarDeBaja(detallePoliza.id_poliza)}
            >
              Dar de Baja
            </button>
          )}
        </p>
        <p>Estado de Póliza: {estadosPoliza[detallePoliza.estado]}</p>

        <select
          id="select"
          value={aseguradoraLocal}
          onChange={handleChangeAseguradora}
          onBlur={handleBlur}
          className={classAseguradora}
        >
          <option value="" disabled>
            Seleccione una aseguradora
          </option>
          {companiasDeSeguros.map((aseguradora, index) => (
            <option key={index} value={aseguradora}>
              {aseguradora}
            </option>
          ))}
        </select>
        <p className={classNumero}>
          N° de Póliza Oficial:
          <input
            type="text"
            value={numeroLocal}
            onChange={handleChangeNumero}
            onBlur={handleBlur}
            className={classNumero}
            placeholder={numeroLocal === "" ? "Completar Campo" : numeroLocal}
          />
        </p>
      </div>

      <h2 className="h1-titulo-detalle">Detalles del Informe</h2>
      <div className="detalle-informe-columns">
        <p>N° de Informe: {detallePoliza.id_informe}</p>
        <p>Objeto Asegurado: {detallePoliza.tipo_objeto}</p>
      </div>
      <h2 className="h1-titulo-detalle">Galeria de Fotos</h2>
      <div className="fotos-container">
        {Object.keys(detallePoliza).map((key) => {
          if (
            detallePoliza[key] &&
            typeof detallePoliza[key] === "string" &&
            detallePoliza[key].startsWith("data:image/jpeg;base64,")
          ) {
            return <Imagen key={key} src={detallePoliza[key]} />;
          }
          return null;
        })}
      </div>
      <h2 className="h1-titulo-detalle">Datos Personales</h2>
      <div className="detalle-informe-columns">
        <p>
          Nombre y Apellido: {detallePoliza.nombre} {detallePoliza.apellido}
        </p>
        <p>DNI: {detallePoliza.dni}</p>
        <p>Numero de Telefono: {detallePoliza.telefono}</p>
        <p>Email: {detallePoliza.email}</p>
      </div>
      <ButtonVolver onClick={goBack} titulo="Volver"></ButtonVolver>
    </div>
  );
}

export default DetallePoliza;
