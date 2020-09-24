const { check } = require('express-validator');

class Livro {

  static validacoes() {
    return [
      check('titulo').isLength({ min: 5 }).withMessage('Necessário ter no mínimo 5 caracteres'),
      check('preco').isCurrency().withMessage('Necessário ser um valor correto'),
    ];
	}

}

module.exports = Livro;
