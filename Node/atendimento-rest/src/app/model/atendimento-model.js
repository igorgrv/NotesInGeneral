const moment = require('moment');
const connection = require('../infra/connection');

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
    const atendimentoDate = { ...atendimento, dataCriacao, data };

    const dataEhValida = moment(data).isSameOrAfter(atendimentoDate);
    const clientEhValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        campo: 'data',
        valido: dataEhValida,
        mensagem: 'Data deve ser maior ou igual a data atual',
      },
      {
        campo: 'cliente',
        valido: clientEhValido,
        mensagem: 'Cliente deve ter no mínimo 5 caracteres',
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;
    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const sql = 'INSERT INTO atendimentos SET ?';

      connection.query(sql, atendimentoDate, (error, result) => {
        if (error) res.status(400).json(error);
        else res.status(200).json(result);
      });
    }
  }

  getAll(res) {
    const sql = 'SELECT * FROM atendimentos';
    connection.query(sql, (err, result) => {
      if (err) res.status(400).json(err);
      res.status(200).json(result);
    });
  }

  getCliente(res, id) {
    const sql = 'SELECT * FROM atendimentos WHERE id = ?';
    connection.query(sql, id, (err, result) => {
      const atendimento = result[0];
      if (err) res.status(400).json(err);
      res.status(200).json(atendimento);
    });
  }

  updateCliente(res, atendimento, id) {
    if (atendimento.data) {
      atendimento.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
    }
    const sql = 'UPDATE atendimentos SET ? WHERE id = ?';
    connection.query(sql, [atendimento, id], (err, result) => {
      if (err) res.status(400).json(err);
      res.status(200).json(atendimento);
    });
  }

  deleteCliente(res, id) {
    const sql = 'DELETE FROM atendimentos WHERE id = ?';

    connection.query(sql, id, (err, result) => {
      if (err) res.status(400).json(err);
      res.status(200).json(id);
    });
  }
}
module.exports = new Atendimento();
