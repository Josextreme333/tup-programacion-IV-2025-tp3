require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');

require('./src/middleware/passport')(passport);

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/alumnos', require('./src/routes/alumnos'));
app.use('/api/materias', require('./src/routes/materias'));
app.use('/api/notas', require('./src/routes/notas'));

// ruta de prueba
app.get('/', (req, res) => res.json({ ok: true, msg: 'Backend TP3 funcionando' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend escuchando en ${PORT}`));



