const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { nombre, email, password } = req.body;
  try {
    // verificar email unico
    const [exist] = await pool.query('SELECT id FROM usuario WHERE email = ?', [email]);
    if(exist.length) return res.status(400).json({ msg: 'Email ya registrado' });

    const hash = await bcrypt.hash(password, saltRounds);
    const [result] = await pool.query('INSERT INTO usuario (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, hash]);

    const userId = result.insertId;
    const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '4h' });

    res.status(201).json({ token, user: { id: userId, nombre, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error interno' });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT id, nombre, email, password FROM usuario WHERE email = ?', [email]);
    if(!rows.length) return res.status(401).json({ msg: 'Credenciales invalidas' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(401).json({ msg: 'Credenciales invalidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '4h' });
    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error interno' });
  }
};
