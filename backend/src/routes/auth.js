const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ msg: 'Faltan datos' });
    }

    try {
        // Revisar si el email ya existe
        const [existing] = await pool.query('SELECT id FROM usuario WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ msg: 'El email ya está registrado' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar en la DB
        const [result] = await pool.query(
            'INSERT INTO usuario (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, hashedPassword]
        );

        res.status(201).json({ msg: 'Usuario registrado', userId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
});

module.exports = router;
