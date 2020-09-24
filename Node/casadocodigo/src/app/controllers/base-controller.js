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
    return (req,res) => res.marko(template.base.login);
  }

  efetuaLogin() {
    return (req, res) => {
      console.log('efetuou login');
    };
  }
}

module.exports = BaseController;
