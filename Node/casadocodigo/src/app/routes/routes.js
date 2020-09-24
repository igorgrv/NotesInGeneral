const livroRoutes = require('./livro-routes');
const baseRoutes = require('./base-routes');

module.exports = (app) => {
  livroRoutes(app);
  baseRoutes(app);
};
