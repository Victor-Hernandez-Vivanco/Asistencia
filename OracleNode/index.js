const express = require("express");
const app = express();
const oracledb = require("oracledb");
const cors = require("cors");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Configura una ruta GET en Express
app.use(cors());

// llamado tabla Profesor
app.get("/obtenerProfesor", async (req, res) => {
  try {
    const con = await oracledb.getConnection({
      user: "skeletonApp",
      password: "skeleton",
      connectString: "localhost:1521/xe",
    });

    const result = await con.execute("SELECT * FROM PROFESOR", [], {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    const rs = result.resultSet;
    const data = [];
    let row;

    while ((row = await rs.getRow())) {
      data.push(row);
    }

    await rs.close();
    con.release();

    res.json(data); // Envía los datos como respuesta en formato JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener profesores" });
  }
});

// llamado tabla Alumno

app.get("/obtenerAlumnos", async (req, res) => {
  try {
    const con = await oracledb.getConnection({
      user: "skeletonApp",
      password: "skeleton",
      connectString: "localhost:1521/xe",
    });

    const result = await con.execute("SELECT * FROM ALUMNO", [], {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    const rs = result.resultSet;
    const data = [];
    let row;

    while ((row = await rs.getRow())) {
      data.push(row);
    }

    await rs.close();
    con.release();

    res.json(data); // Envía los datos como respuesta en formato JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener los alumnos" });
  }
});

// llamado tabla Sección

app.get("/obtenerSecciones", async (req, res) => {
  try {
    const con = await oracledb.getConnection({
      user: "skeletonApp",
      password: "skeleton",
      connectString: "localhost:1521/xe",
    });

    const result = await con.execute("SELECT * FROM SECCION", [], {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    const rs = result.resultSet;
    const data = [];
    let row;

    while ((row = await rs.getRow())) {
      data.push(row);
    }

    await rs.close();
    con.release();

    res.json(data); // Envía los datos como respuesta en formato JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las secciones" });
  }
});

// llamado tabla Alumno_seccion

app.get("/obtenerAlumnoSeccion", async (req, res) => {
  try {
    const con = await oracledb.getConnection({
      user: "skeletonApp",
      password: "skeleton",
      connectString: "localhost:1521/xe",
    });

    const result = await con.execute("SELECT * FROM ALUMNO_SECCION", [], {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    const rs = result.resultSet;
    const data = [];
    let row;

    while ((row = await rs.getRow())) {
      data.push(row);
    }

    await rs.close();
    con.release();

    res.json(data); // Envía los datos como respuesta en formato JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener tabla alumno_seccion" });
  }
});

// llamado tabla lista

app.get("/obtenerLista", async (req, res) => {
  try {
    const con = await oracledb.getConnection({
      user: "skeletonApp",
      password: "skeleton",
      connectString: "localhost:1521/xe",
    });

    const result = await con.execute("SELECT * FROM LISTA", [], {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    const rs = result.resultSet;
    const data = [];
    let row;

    while ((row = await rs.getRow())) {
      data.push(row);
    }

    await rs.close();
    con.release();

    res.json(data); // Envía los datos como respuesta en formato JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener la tabla lista" });
  }
});

// llamado tabla Profesor_seccion

app.get("/obtenerProfesor_Seccion", async (req, res) => {
  try {
    const con = await oracledb.getConnection({
      user: "skeletonApp",
      password: "skeleton",
      connectString: "localhost:1521/xe",
    });

    const result = await con.execute("SELECT * FROM PROFESOR_SECCION", [], {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    const rs = result.resultSet;
    const data = [];
    let row;

    while ((row = await rs.getRow())) {
      data.push(row);
    }

    await rs.close();
    con.release();

    res.json(data); // Envía los datos como respuesta en formato JSON
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error al obtener la tabla profesor_seccion" });
  }
});

// secciones por profesor

app.get("/obtenerSeccionesPorProfesor", async (req, res) => {
  const idProfesor = req.query.idProfesor; // Obtiene el idProfesor de la consulta
  // console.log("idProfesor")
  // console.log(idProfesor)

  try {
    const con = await oracledb.getConnection({
      user: "skeletonApp",
      password: "skeleton",
      connectString: "localhost:1521/xe",
    });

    const result = await con.execute(
      "SELECT * FROM profesor_seccion WHERE IDPROFESOR = :idProfesor",
      [idProfesor], // Pasa el idProfesor como parámetro
      { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const rs = result.resultSet;
    const data = [];
    let row;

    while ((row = await rs.getRow())) {
      data.push(row);
    }

    await rs.close();
    con.release();

    res.json(data); // Envía los datos como respuesta en formato JSON
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error al obtener las secciones del profesor" });
  }
});

// secciones por alumno

app.get("/obtenerSeccionesPorAlumno", async (req, res) => {
  const idAlumno = req.query.idAlumno; // Obtiene el idAlumno de la consulta
  // console.log("idAlumno")
  // console.log(idAlumno)

  try {
    const con = await oracledb.getConnection({
      user: "skeletonApp",
      password: "skeleton",
      connectString: "localhost:1521/xe",
    });

    const result = await con.execute(
      "SELECT * FROM alumno_seccion WHERE IDALUMNO = :idAlumno",
      [idAlumno], // Pasa el idAlumno como parámetro
      { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const rs = result.resultSet;
    const data = [];
    let row;

    while ((row = await rs.getRow())) {
      data.push(row);
    }

    await rs.close();
    con.release();

    res.json(data); // Envía los datos como respuesta en formato JSON
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error al obtener las secciones del alumno" });
  }
});

// Listado de alumnos por seccion

app.get("/obtenerAlumnosAsistencia", async (req, res) => {
  const idAlumno = req.query.idAlumno; // Obtiene el idAlumno de la consulta
  // console.log("idAlumno")
  // console.log(idAlumno)

  try {
    const con = await oracledb.getConnection({
      user: "skeletonApp",
      password: "skeleton",
      connectString: "localhost:1521/xe",
    });

    const result = await con.execute(
      "SELECT a.IDALUMNO, a.NOMBRE, a.apellido, a.estado, s.IDSECCION, s.NOMBRE_SECCION, s.seccion, s.codseccion FROM seccion s LEFT JOIN alumno_seccion sa ON s.idseccion = sa.idseccion LEFT JOIN alumno a ON sa.IDALUMNO = a.IDALUMNO WHERE a.IDALUMNO = :a.idAlumno",
      [a.idAlumno],
      { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    const rs = result.resultSet;
    const data = [];
    let row;

    while ((row = await rs.getRow())) {
      data.push(row);
    }

    await rs.close();
    con.release();

    res.json(data); // Envía los datos como respuesta en formato JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener los alumnos asistencia" });
  }
});

app.get("/actualizarEstadoUsuario", async (req, res) => {
  const idAlumno = req.query.idAlumno;
  const estadoAlumno = req.query.estadoAlumno;

  if (!idAlumno || !estadoAlumno) {
    return res
      .status(400)
      .json({ error: "Faltan parámetros idAlumno o estadoAlumno" });
  }

  try {
    const con = await oracledb.getConnection({
      user: "skeletonApp",
      password: "skeleton",
      connectString: "localhost:1521/xe",
    });

    const sql = `UPDATE alumno SET estado = :estadoAlumno WHERE IDALUMNO = :idAlumno`;
    const result = await con.execute(sql, [estadoAlumno, idAlumno], {
      autoCommit: true,
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: "No se encontró el alumno" });
    }

    return res.status(200).json({ message: "Estado del alumno actualizado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el estado del alumno" });
  }
});

app.get("/getAllBySeccionId", async (req, res) => {
  const idSeccion = req.query.id;

  if (!idSeccion) {
    return res.status(400).json({ error: "Falta el parámetro id" });
  }

  try {
    const con = await oracledb.getConnection({
      user: "skeletonApp",
      password: "skeleton",
      connectString: "localhost:1521/xe",
    });

    const sql = "SELECT * FROM alumno_seccion WHERE IDSECCION = :idSeccion";
    const result = await con.execute(sql, [idSeccion], {
      resultSet: true,
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    const rs = result.resultSet;
    const data = [];
    let row;

    while ((row = await rs.getRow())) {
      data.push(row);
    }

    await rs.close();
    con.release();

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron alumnos para la sección" });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener alumnos por sección" });
  }
});

// Inicia el servidor Express en el puerto 3000
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor Node.js en ejecución en el puerto ${PORT}`);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor Node.js en ejecución en el puerto ${PORT}`);
});
