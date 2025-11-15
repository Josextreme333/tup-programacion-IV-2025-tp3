const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getNotas, createNota, updateNota, deleteNota } = require('../controllers/notas');

router.get('/', passport.authenticate('jwt', { session: false }), getNotas);
router.post('/', passport.authenticate('jwt', { session: false }), createNota);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateNota);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteNota);

module.exports = router;

