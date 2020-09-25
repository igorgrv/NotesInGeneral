const LivroController = require('../controllers/livro-controller');
const livroController = new LivroController();

const BaseController = require('../controllers/base-controller');

const Livro = require('../model/livro');

module.exports = (app) => {
  const rotasLivro = LivroController.rotas();

  app.use(rotasLivro.autenticadas, (req, resp, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      resp.redirect(BaseController.routes().login);
    }
  });

  app.get(rotasLivro.lista, livroController.lista());

  app
    .route(rotasLivro.cadastro)
    .get(livroController.formularioCadastro())
    .post(Livro.validacoes(), livroController.cadastra())
    .put(livroController.edita());

  app.get(rotasLivro.edicao, livroController.formularioEdicao());
  app.delete(rotasLivro.delecao, livroController.remove());
};
