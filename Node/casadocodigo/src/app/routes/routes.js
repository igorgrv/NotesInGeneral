const db = require('../../config/database');
const LivroDao = require('../dao/LivroDao');
const { check, validationResult } = require('express-validator');

module.exports = (app) => {
  app.get('/', function (req, res) {
    res.marko(require('../views/base/home/home.marko'));
  });

  app.get('/livros', function (req, res) {
    const livroDao = new LivroDao(db);
    livroDao
      .lista()
      .then((livros) =>
        res.marko(require('../views/livros/lista/lista.marko'), {
          livros: livros,
        })
      )
      .catch((erro) => console.log(erro));
  });

  app.get('/livros/form', (req, resp) => {
    resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
  });

  app.post(
    '/livros',
    [
      check('titulo').isLength({ min: 5 }).withMessage('Necessário ter no mínimo 5 caracteres'),
      check('preco').isCurrency().withMessage('Necessário ser um valor correto'),
    ],
    (req, resp) => {
      console.log(req.body);

      const erros = validationResult(req);
      console.log(JSON.stringify(erros));
      if (!erros.isEmpty()) {
        return resp.marko(require('../views/livros/form/form.marko'), {
          livro: req.body,
          errosValidacao: erros.array(),
        });
      }
      const livroDao = new LivroDao(db);
      livroDao
        .adiciona(req.body)
        .then(resp.redirect('/livros'))
        .catch((err) => console.log(err));
    }
  );

  app.get('/livros/form/:id', (req, resp) => {
    const { id } = req.params;

    const livroDao = new LivroDao(db);
    livroDao
      .buscaPorId(id)
      .then((livro) => {
        resp.marko(require('../views/livros/form/form.marko'), {
          livro: livro,
        });
      })
      .catch((err) => console.log(err));
  });

  app.put('/livros', (req, resp) => {
    console.log(req.body);
    const livroDao = new LivroDao(db);
    livroDao
      .atualiza(req.body)
      .then(resp.redirect('/livros'))
      .catch((err) => console.log(err));
  });

  app.delete('/livros/:id', (req, resp) => {
    const id = req.params.id;

    const livroDao = new LivroDao(db);
    livroDao
      .remove(id)
      .then(() => resp.status(200).end())
      .catch((err) => console.log(err));
  });
};
