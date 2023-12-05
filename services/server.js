const express = require("express");
const app = express();

const mysql = require("mysql");
const cors = require("cors");
const sharp = require('sharp');
const multer = require("multer");
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

const session = require("express-session");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "aseguradora",
});

// Configuración de sesiones
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware de autorización para el administrador
function requireAdmin(req, res, next) {
  if (req.session && req.session.nivel_acceso === 5) {
    next();
  } else {
    res.status(403).send("Acceso denegado");
  }
}

// Ruta protegida para el administrador
app.get("/admin", requireAdmin, (req, res) => {
  res.send("Esta es una ruta protegida para administradores.");
});

app.get("/cerrar-sesion", (req, res) => {
  // Destruye la sesión y elimina la información de la sesión
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al cerrar sesión" });
    } else {
      res.status(200).json({ message: "Sesión cerrada exitosamente" });
    }
  });
});

app.post("/iniciar-sesion", async (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM usuario WHERE nombre = ? AND contraseña = ?";

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const user = results[0]; // Aquí debes obtener el objeto de usuario

    req.session.nivel_acceso = user.nivel_acceso; // Almacena el nivel de acceso en req.session

    let responseMessage;
    let userData = {
      id: user.id_usuario,
      username: user.nombre,
      // Agrega otros datos del usuario que desees incluir aquí
    };

    if (user.nivel_acceso === 1) {
      responseMessage = "Bienvenido, Administrador";
    } else if (user.nivel_acceso === 5) {
      responseMessage = "Bienvenido, Usuario Normal";
    } else {
      return res.status(403).json({ error: "Acceso no autorizado" });
    }

    res.status(200).json({
      message: responseMessage,
      usuario: userData, // Agrega los datos del usuario aquí
    });
  });
});

/* -------------------------------------------DATOS PERSONALES------------------------------------------- */
app.post("/datos-personales", async (req, res) => {
  const datosPersonales = req.body.datosPersonales;
  try {
    const result = await guardarDatosPersonales(datosPersonales);
    const idDatosPersonales = result.id_datosPersonales; // Corregido aquí
    res.status(200).json({ id_datosPersonales: idDatosPersonales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar los datos personales" });
  }
});

function guardarDatosPersonales(datosPersonales) {
  return new Promise((resolve, reject) => {
    const insertQuery = "INSERT INTO datos_personales SET ?";
    const selectLastIdQuery = "SELECT LAST_INSERT_ID() as id";

    db.query(insertQuery, datosPersonales, (err, result) => {
      if (err) {
        reject(err);
      } else {
        // Ejecuta la consulta para obtener el último ID insertado
        db.query(selectLastIdQuery, (err, result) => {
          if (err) {
            reject(err);
          } else {
            const generatedId = result[0].id;
            console.log("Generated ID:", generatedId);
            resolve({ id_datosPersonales: generatedId });
          }
        });
      }
    });
  });
}

/* -------------------------------------------DATOS COTIZACION------------------------------------------- */
app.post("/crear-cotizacion", async (req, res) => {
  const datosCotizacion = req.body;

  try {
    await guardarCotizacion(datosCotizacion);
    res.status(200).json({ mensaje: "Cotización guardada exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar la cotización" });
  }
});

function guardarCotizacion(datosCotizacion) {
  return new Promise((resolve, reject) => {
    const insertQuery = "INSERT INTO cotizaciones SET ?";

    db.query(insertQuery, datosCotizacion, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(); // No se devuelve ningún ID en este caso
      }
    });
  });
}

/* -------------------------------------------MOSTRAR COTIZACION------------------------------------------- */
app.get("/mostrar-cotizaciones", (req, res) => {
  const selectQuery = "SELECT * FROM cotizaciones";

  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error("Error al obtener las cotizaciones:", err);
      res.status(500).json({ error: "Error al obtener las cotizaciones" });
    } else {
      res.status(200).json(result);
    }
  });
});

/* -------------------------------------------DETALLE COTIZACION------------------------------------------- */
app.get('/detalle-cotizacion/:id', (req, res) => {
  const cotizacionId = req.params.id;
  const selectQuery = `SELECT * FROM cotizaciones WHERE id = ${cotizacionId}`;

  db.query(selectQuery, (err, result) => {
    if (err) {
      console.error('Error al obtener los detalles de la cotización:', err);
      res.status(500).json({ error: 'Error al obtener los detalles de la cotización' });
    } else {
      res.status(200).json(result);
    }
  });
});

/* -------------------------------------------ACTUALIZAR COTIZACION------------------------------------------- */
app.post('/actualizar-estado-cotizacion/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('UPDATE cotizaciones SET estado = "C" WHERE id = ?', [id]);

    // Devuelve una respuesta exitosa
    res.status(200).json({ message: 'Pago informado exitosamente' });
  } catch (error) {
    console.error('Error al informar el pago:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/* -------------------------------------------DATOS OBJETOS------------------------------------------- */
app.post("/datos-objeto", async (req, res) => {
  const datosObjeto = req.body.datosObjeto;
  const idDatosPersonales = req.body.id_datos_personales;

  try {
    const idDatosObjeto = await guardarDatosObjeto(
      datosObjeto,
      idDatosPersonales
    );
    res.status(200).json({ id_datos_objeto: idDatosObjeto });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar los datos del objeto" });
  }
});

function guardarDatosObjeto(datosObjeto, idDatosPersonales) {
  return new Promise((resolve, reject) => {
    const Tipo_objeto = datosObjeto.Tipo_objeto;

    db.query(`INSERT INTO ${Tipo_objeto} SET ?`, datosObjeto, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const idObjetoInsertado = result.insertId;

        // Actualiza el registro con el ID de datosPersonales
        db.query(
          `UPDATE ${Tipo_objeto} SET id_datosPersonales = ? WHERE id_${Tipo_objeto} = ?`,
          [idDatosPersonales, idObjetoInsertado],
          (errUpdate, resultUpdate) => {
            if (errUpdate) {
              reject(errUpdate);
            } else {
              resolve(idObjetoInsertado);
            }
          }
        );
      }
    });
  });
}

/* -------------------------------------------SUBIR FOTOS------------------------------------------- */
app.post("/subir-fotos", upload.array("images"), async (req, res) => {
  try {
    const idDatosPersonales = req.body.id_datos_personales;
    const photos = req.files;

    if (idDatosPersonales && photos) {
      // Construir un objeto con las fotos para la inserción
      const fotosParaInsertar = { id_datospersonales: idDatosPersonales };
      photos.forEach((photo, index) => {
        fotosParaInsertar[`foto${index + 1}`] = photo.buffer;
      });

      // Construir la consulta de inserción
      const insertQuery = `INSERT INTO fotos SET ?`;

      // Ejecutar la consulta de inserción
      db.query(insertQuery, [fotosParaInsertar], (err, result) => {
        if (err) {
          console.error("Error al insertar las fotos: ", err);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          res.status(200).json({ mensaje: "¡Fotos insertadas exitosamente!" });
        }
      });
    } else {
      res.status(400).json({ error: "Datos insuficientes para la inserción." });
    }
  } catch (error) {
    console.error("Error al insertar las fotos: ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}); 

/* -------------------------------------------FILTROS HISTORIAL INFORME------------------------------------------- */
app.get("/obtener-informes/:filtro", (req, res) => {
  const { filtro } = req.params;
  let query =
    "SELECT informe.*, datos_personales.* , auto.patente, moto.patenteMoto FROM informe LEFT JOIN datos_personales ON informe.id_datosPersonales = datos_personales.id_datosPersonales LEFT JOIN bicicleta ON bicicleta.id_datosPersonales = datos_personales.id_datosPersonales LEFT JOIN celular ON celular.id_datosPersonales = datos_personales.id_datosPersonales LEFT JOIN moto ON moto.id_datosPersonales = datos_personales.id_datosPersonales LEFT JOIN auto ON auto.id_datosPersonales = datos_personales.id_datosPersonales WHERE ";

  switch (filtro) {
    case "auto":
      query += "informe.tipo_objeto = 'auto'";
      break;
    case "moto":
      query += "informe.tipo_objeto = 'moto'";
      break;
    case "bici":
      query += "informe.tipo_objeto = 'bicicleta'";
      break;
    case "celular":
      query += "informe.tipo_objeto = 'celular'";
      break;
    case "todas":
      query += "1=1";
      break;
    default:
      return res.status(400).json({ error: "Filtro no válido" });
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    res.status(200).json(results);
  });
});

/* -------------------------------------------DETALLE INFORME------------------------------------------- */
app.get('/detalle-informe/:id/:tipoObjeto', (req, res) => {
  const { id, tipoObjeto } = req.params;
  const query = `SELECT informe.*, informe.estado AS estadoInfo, datos_personales.*, ${tipoObjeto}.*, fotos.* FROM informe INNER JOIN datos_personales ON informe.id_datosPersonales = datos_personales.id_datosPersonales INNER JOIN ${tipoObjeto} ON ${tipoObjeto}.id_datosPersonales = datos_personales.id_datosPersonales LEFT JOIN fotos ON fotos.id_datospersonales = datos_personales.id_datosPersonales WHERE informe.id_informe = ${id} AND informe.tipo_objeto = '${tipoObjeto}';`;

  db.query(query, [id], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    // Verificar si se encontraron resultados
    if (results.length === 0) {
      return res.status(404).json({ error: 'Informe no encontrado' });
    }

    const processedResults = await Promise.all(
      results.map(async (result) => {
        for (const key in result) {
          if (result[key] instanceof Buffer) {
            const imageUrl = `data:image/jpeg;base64,${result[key].toString('base64')}`;
            result[key] = imageUrl;
          }
        }
        return result;
      })
    );

    // Registro de resultados procesados
    /* console.log('Resultados procesados:', processedResults); */

    // Enviar el primer resultado (debería ser único) al cliente
    res.status(200).json(processedResults[0]);
  });
});

/* -------------------------------------------DATOS POLIZA------------------------------------------- */
app.post("/poliza", async (req, res) => {
  const idInforme = req.body.id_informe; // Asegúrate de que el nombre sea el mismo que en tu solicitud Axios
  const estado = req.body.estado;

  try {
    const result = await guardarEnPoliza(idInforme, estado);

    res.status(200).json({ id_poliza: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar en la tabla Poliza" });
  }
});

function guardarEnPoliza(id_informe, estado) {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO poliza (id_informe, estado) VALUES (?, ?)";
    db.query(sql, [id_informe, estado], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

/* -------------------------------------------LISTAR POLIZA------------------------------------------- */
app.get("/polizas", (req, res) => {
  const query = "SELECT poliza.* , datos_personales.* FROM poliza INNER JOIN informe ON poliza.id_informe = informe.id_informe INNER JOIN datos_personales ON datos_personales.id_datosPersonales = informe.id_datosPersonales";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    res.status(200).json(results);
  });
});

/* -------------------------------------------ESTADO DE POLIZA------------------------------------------- */
app.get("/poliza-activa/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT estado FROM poliza WHERE id_informe = ${id}`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    // Devuelve solo el estado de la primera póliza encontrada
    const estado = results[0].estado;
    res.status(200).json({ estado });
  });
});

/* -------------------------------------------DETALLE POLIZA------------------------------------------- */
app.get("/detalle-poliza/:id", async (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT
      poliza.*,
      informe.*,
      datos_personales.*,
      fotos.*
    FROM
      poliza
      INNER JOIN informe ON poliza.id_informe = informe.id_informe
      INNER JOIN datos_personales ON informe.id_datosPersonales = datos_personales.id_datosPersonales
      LEFT JOIN fotos ON fotos.id_datospersonales = datos_personales.id_datosPersonales
    WHERE
      poliza.id_poliza = ?`;

  // Utiliza parámetros de consulta para prevenir inyección de SQL
  db.query(query, [id], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    // Verificar si se encontraron resultados
    if (results.length === 0) {
      return res.status(404).json({ error: "Informe no encontrado" });
    }

    // Procesar las imágenes en los resultados
    const processedResults = await Promise.all(
      results.map(async (result) => {
        for (const key in result) {
          if (result[key] instanceof Buffer) {
            const imageUrl = `data:image/jpeg;base64,${result[key].toString('base64')}`;
            result[key] = imageUrl;
          }
        }
        return result;
      })
    );

    res.status(200).json(processedResults[0]); // Devolver el primer resultado (debería ser único)
  });
});

/* -------------------------------------------GENERAR POLIZA ACTIVA------------------------------------------- */
app.post('/crear-poliza/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Actualiza el estado de la póliza asociada al informe con el ID proporcionado
    await db.query('INSERT INTO poliza (id_informe, estado, vencimiento) VALUE (? ,"A", DATE_ADD(CURDATE(), INTERVAL 1 MONTH))', [id]);
    await db.query('UPDATE informe SET estado = "P" WHERE id_informe = ?', [id]);

    // Devuelve una respuesta exitosa
    res.status(200).json({ message: 'Pago informado exitosamente' });
  } catch (error) {
    console.error('Error al informar el pago:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/* -------------------------------------------ACTUALIZAR POLIZA------------------------------------------- */
app.post('/actualizar-poliza/:id', async (req, res) => {
  const { id } = req.params;
  const { aseguradora } = req.body;
  const { numero_oficial } = req.body;

  try {
    // Actualiza el nombre de la aseguradora para la póliza con el ID proporcionado
    await db.query('UPDATE poliza SET aseguradora = ? , numero_oficial = ? WHERE id_poliza = ?', [aseguradora , numero_oficial, id]);

    // Devuelve una respuesta exitosa
    res.status(200).json({ message: 'Póliza actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la póliza:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/* -------------------------------------------ACTUALIZAR FECHA POLIZA------------------------------------------- */
app.post('/actualizar-fecha/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Actualiza el nombre de la aseguradora para la póliza con el ID proporcionado
    await db.query('UPDATE poliza SET vencimiento = DATE_ADD(CURDATE(), INTERVAL 1 MONTH) WHERE id_poliza = ?', [id]);

    // Devuelve una respuesta exitosa
    res.status(200).json({ message: 'Póliza actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la póliza:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


/* -------------------------------------------DATOS INFORMES------------------------------------------- */
app.post("/informe", async (req, res) => {
  const idUsuario = req.body.id_Usuario; // Asegúrate de obtener correctamente el ID del usuario desde el cuerpo de la solicitud
  const idDatosPersonales = req.body.id_datos_personales;
  const tipoObjeto = req.body.tipo_objeto;

  try {
    // Realiza la lógica necesaria para guardar en la tabla Informe
    const result = await guardarEnInforme(
      idUsuario,
      idDatosPersonales,
      tipoObjeto
    );
    res.status(200).json({ id_informe: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar en la tabla Informe" });
  }
});

function guardarEnInforme(idUsuario, idDatosPersonales, tipoObjeto) {
  
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO informe (tipo_objeto, id_usuario, id_datosPersonales, estado) VALUES (?, ?, ?, 'A')",
      [tipoObjeto, idUsuario, idDatosPersonales],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}


app.listen(3001, () => {
  console.log("Corriendo Node.js en el puerto 3001");
});

