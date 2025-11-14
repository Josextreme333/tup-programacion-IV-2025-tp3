const { Strategy, ExtractJwt } = require('passport-jwt');
const pool = require('../config/db');

module.exports = function(passport){
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };
  passport.use(new Strategy(opts, async (payload, done) => {
    try {
      const [rows] = await pool.query('SELECT id, nombre, email FROM usuario WHERE id = ?', [payload.id]);
      if(rows.length) return done(null, rows[0]);
      return done(null, false);
    } catch(err){
      return done(err, false);
    }
  }));
}
