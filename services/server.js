const express = require("express");
const app = express();

const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "aseguradora",
});




// Controlador para guardar datos personales
app.post("/datos-personales", async (req, res) => {
  const datosPersonales = req.body.datosPersonales;

  try {
    const result = await guardarDatosPersonales(datosPersonales);
    res.status(200).json({ id_datosPersonales: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar los datos personales" });
  }
});

// Controlador para guardar datos del vehículo
app.post("/datos-objeto", async (req, res) => {
  const datosObjeto = req.body.datosObjeto;

  try {
    await guardarDatosObjeto(datosObjeto);
    res.status(200).json({ message: "Datos del vehículo guardados correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar los datos del vehículo" });
  }
});

function guardarDatosPersonales(datosPersonales) {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO datos_personales SET ?", datosPersonales, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function guardarDatosObjeto(datosObjeto) {
  return new Promise((resolve, reject) => {
    const Tipo_objeto = datosObjeto.Tipo_objeto;
    db.query(`INSERT INTO ${Tipo_objeto} SET ?`, datosObjeto, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

app.listen(3001, () => {
  console.log("Corriendo Node.js en el puerto 3001");
});























/* app.post("/datos-personales", (req, res) => {
  const datosPersonales = req.body.datosPersonales;
  db.query(
    "INSERT INTO datos_personales SET ?",datosPersonales,
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ error: "Error al guardar los datos personales" });
      } else {
      }
    }
  );
});


app.post("/datos-objeto", (req, res) => {
  const datosObjeto = req.body.datosObjeto;
  const Tipo_objeto = datosObjeto.Tipo_objeto;

  // Realiza la inserción en la tabla correspondiente (usando el tipoVehiculo como nombre de tabla)
  db.query(`INSERT INTO ${Tipo_objeto} SET ?`, datosObjeto , (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Error al guardar los datos del vehículo" });
    } else {
      res.status(200).json({ message: "Datos del vehículo guardados correctamente" });
    }
  });
});



app.listen(3001, () => {
  console.log("corriendo Node.js en el puerto 3001");
});
 */