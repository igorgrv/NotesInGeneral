const LivroController = require('../controllers/livro-controller');
const livroController = new LivroController();

const Livro = require('../model/livro');

module.exports = (app) => {
  app.get(LivroController.rotas().lista, livroController.lista());

  app
    .route(LivroController.rotas().cadastro)
    .get(livroController.formularioCadastro())
    .post(Livro.validacoes(), livroController.cadastra())
    .put(livroController.edita());

  app.get(LivroController.rotas().edicao, livroController.formularioEdicao());
  app.delete(LivroController.rotas().delecao, livroController.remove());
};
