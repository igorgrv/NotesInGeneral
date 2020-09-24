const uuid = require('uuid/v4');
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./database');
const UsuarioDao = require('../app/dao/usuario-dao');
const usuarioDao = new UsuarioDao(db);

module.exports = (app) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'senha',
      },
      (username, password, done) => {
        usuarioDao
          .buscaPorEmail(username)
          .then((usuario) => {
            if (!usuario || usuario.senha != password) {
              return done(null, false, { mensagem: 'usuário ou senha não existem!' });
            }
            return done(null, usuario);
          })
          .catch((err) => done(err, false));
      }
    )
  );
};
