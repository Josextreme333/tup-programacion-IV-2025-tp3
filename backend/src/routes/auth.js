const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register',
  body('nombre').notEmpty().withMessage('nombre es requerido'),
  body('email').isEmail().withMessage('email invalido'),
  body('password').isLength({ min: 6 }).withMessage('password minimo 6'),
  authController.register
);

router.post('/login',
  body('email').isEmail().withMessage('email invalido'),
  body('password').notEmpty().withMessage('password requerido'),
  authController.login
);

module.exports = router;
