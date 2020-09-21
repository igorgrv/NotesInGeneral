const { check } = require('express-validator');

const LivroController = require('../controllers/livro-controller');
const livroController = new LivroController();

const BaseController = require('../controllers/base-controller');
const baseController = new BaseController();

module.exports = (app) => {
  app.get('/', baseController.home());

  app.get(LivroController.rotas().lista, livroController.lista());

  app.get(LivroController.rotas().cadastro, livroController.formularioCadastro());

  app.post(
    LivroController.rotas().lista,
    [
      check('titulo').isLength({ min: 5 }).withMessage('Necessário ter no mínimo 5 caracteres'),
      check('preco').isCurrency().withMessage('Necessário ser um valor correto'),
    ],
    livroController.cadastra()
  );

  app.get(LivroController.rotas().edicao, livroController.formularioEdicao());

  app.put(LivroController.rotas().lista, livroController.edita());

  app.delete(LivroController.rotas().delecao, livroController.remove());
};
