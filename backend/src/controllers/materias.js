const pool = require('../config/db');

// Listar todas las materias
exports.getMaterias = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM materias');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al obtener materias', err });
  }
};

// Crear una materia
exports.createMateria = async (req, res) => {
  const { nombre, codigo, anio } = req.body;
  if (!nombre || !codigo || !anio) {
    return res.status(400).json({ msg: 'Faltan campos obligatorios' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO materias (nombre, codigo, anio) VALUES (?, ?, ?)',
      [nombre, codigo, anio]
    );
    res.json({ id: result.insertId, nombre, codigo, anio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al crear materia', err });
  }
};

// Actualizar materia
exports.updateMateria = async (req, res) => {
  const { id } = req.params;
  const { nombre, codigo, anio } = req.body;
  try {
    await pool.query('UPDATE materias SET nombre=?, codigo=?, anio=? WHERE id=?', [nombre, codigo, anio, id]);
    res.json({ id, nombre, codigo, anio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al actualizar materia', err });
  }
};

// Eliminar materia
exports.deleteMateria = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM materias WHERE id=?', [id]);
    res.json({ msg: 'Materia eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al eliminar materia', err });
  }
};
