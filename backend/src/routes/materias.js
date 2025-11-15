const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getMaterias, createMateria, updateMateria, deleteMateria } = require('../controllers/materias');

router.get('/', passport.authenticate('jwt', { session: false }), getMaterias);
router.post('/', passport.authenticate('jwt', { session: false }), createMateria);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateMateria);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteMateria);

module.exports = router;

