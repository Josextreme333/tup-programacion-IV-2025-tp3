const pool = require('../config/db');

// Listar todas las notas
exports.getNotas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM notas');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al obtener notas', err });
  }
};

// Crear nota
exports.createNota = async (req, res) => {
  const { alumno_id, materia_id, nota1, nota2, nota3 } = req.body;
  if (!alumno_id || !materia_id) {
    return res.status(400).json({ msg: 'Faltan campos obligatorios' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO notas (alumno_id, materia_id, nota1, nota2, nota3) VALUES (?, ?, ?, ?, ?)',
      [alumno_id, materia_id, nota1 || 0, nota2 || 0, nota3 || 0]
    );
    res.json({ id: result.insertId, alumno_id, materia_id, nota1, nota2, nota3 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al crear nota', err });
  }
};

// Actualizar nota
exports.updateNota = async (req, res) => {
  const { id } = req.params;
  const { nota1, nota2, nota3 } = req.body;
  try {
    await pool.query('UPDATE notas SET nota1=?, nota2=?, nota3=? WHERE id=?', [nota1, nota2, nota3, id]);
    res.json({ id, nota1, nota2, nota3 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al actualizar nota', err });
  }
};

// Eliminar nota
exports.deleteNota = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM notas WHERE id=?', [id]);
    res.json({ msg: 'Nota eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al eliminar nota', err });
  }
};
