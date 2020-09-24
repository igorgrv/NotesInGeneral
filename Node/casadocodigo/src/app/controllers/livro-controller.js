const LivroDao = require('../dao/LivroDao');
const db = require('../../config/database');
const { validationResult } = require('express-validator');
const template = require('../views/template');

class LivroController {
  static rotas() {
    return {
      lista: '/livros',
      cadastro: '/livros/form',
      edicao: '/livros/form/:id',
      delecao: '/livros/:id',
    };
  }

  lista() {
    return (req, res) => {
      const livroDao = new LivroDao(db);
      livroDao
        .lista()
        .then((livros) =>
          res.marko(template.livro.lista, {
            livros: livros,
          })
        )
        .catch((erro) => console.log(erro));
    };
  }

  formularioCadastro() {
    return (req, resp) => {
      resp.marko(template.livro.form, { livro: {} });
    };
  }

  cadastra() {
    return (req, resp) => {
      console.log(req.body);

      const erros = validationResult(req);
      console.log(JSON.stringify(erros));
      if (!erros.isEmpty()) {
        return resp.marko(template.livro.form, {
          livro: req.body,
          errosValidacao: erros.array(),
        });
      }
      const livroDao = new LivroDao(db);
      livroDao
        .adiciona(req.body)
        .then(resp.redirect(LivroController.rotas().lista))
        .catch((err) => console.log(err));
    };
  }

  formularioEdicao() {
    return (req, resp) => {
      const { id } = req.params;

      const livroDao = new LivroDao(db);
      livroDao
        .buscaPorId(id)
        .then((livro) => {
          resp.marko(template.livro.form, {
            livro: livro,
          });
        })
        .catch((err) => console.log(err));
    };
  }

  edita() {
    return (req, resp) => {
      console.log(req.body);
      const livroDao = new LivroDao(db);
      livroDao
        .atualiza(req.body)
        .then(resp.redirect(LivroController.rotas().lista))
        .catch((err) => console.log(err));
    };
  }

  remove() {
    return (req, resp) => {
      const id = req.params.id;

      const livroDao = new LivroDao(db);
      livroDao
        .remove(id)
        .then(() => resp.status(200).end())
        .catch((err) => console.log(err));
    };
  }
}

module.exports = LivroController;
