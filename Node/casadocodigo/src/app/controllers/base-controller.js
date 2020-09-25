const LivroController = require('./livro-controller');
const template = require('../views/template');

class BaseController {
  static routes() {
    return {
      home: '/',
      login: '/login',
    };
  }

  home() {
    return (req, res) => res.marko(template.base.home);
  }

  login() {
    return (req, res) => res.marko(template.base.login);
  }

  efetuaLogin() {
    return (req, res, next) => {
      const passport = req.passport;
      passport.authenticate('local', (error, username, info) => {
        if (info) {
          return res.marko(template.base.login);
        }
        if (error) {
          return next(error);
        }
        req.login(username, (erro) => {
          if (erro) {
            return next(erro);
          }
          return resp.redirect(LivroController.rotas().lista);
        });
      })(req, res, next);
    };
  }
}

module.exports = BaseController;
