const pool = require('../config/db'); // tu conexión a MySQL

// Listar todos los alumnos
exports.getAlumnos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alumnos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al obtener alumnos', err });
  }
};

// Crear un alumno
exports.createAlumno = async (req, res) => {
  const { nombre, apellido, dni } = req.body;
  if (!nombre || !apellido || !dni) {
    return res.status(400).json({ msg: 'Faltan campos obligatorios' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO alumnos (nombre, apellido, dni) VALUES (?, ?, ?)',
      [nombre, apellido, dni]
    );
    res.json({ id: result.insertId, nombre, apellido, dni });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al crear alumno', err });
  }
};

// Actualizar alumno
exports.updateAlumno = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, dni } = req.body;
  try {
    await pool.query(
      'UPDATE alumnos SET nombre=?, apellido=?, dni=? WHERE id=?',
      [nombre, apellido, dni, id]
    );
    res.json({ id, nombre, apellido, dni });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al actualizar alumno', err });
  }
};

// Eliminar alumno
exports.deleteAlumno = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM alumnos WHERE id=?', [id]);
    res.json({ msg: 'Alumno eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al eliminar alumno', err });
  }
};
