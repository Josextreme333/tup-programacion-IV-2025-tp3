const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getAlumnos, createAlumno, updateAlumno, deleteAlumno } = require('../controllers/alumnos');

// Todas las rutas protegidas con JWT
router.get('/', passport.authenticate('jwt', { session: false }), getAlumnos);
router.post('/', passport.authenticate('jwt', { session: false }), createAlumno);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateAlumno);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteAlumno);

module.exports = router;
