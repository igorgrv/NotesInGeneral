class BaseController {
  home() {
    return (req, res) => res.marko(require('../views/base/home/home.marko'));
  }
}

module.exports = BaseController;
