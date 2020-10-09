const Atendimento = require('../model/atendimento-model');

class AtendimentoController {
  static routes() {
    return {
      atendimentoId: '/atendimentos/:id',
      atendimento: '/atendimentos',
    };
  }

  getAll() {
    return (req, res) => {
      Atendimento.getAll(res);
    };
  }

  getOne() {
    return (req, res) => {
      const id = req.params.id;
      Atendimento.getCliente(res, id);
    };
  }

  addAtendimento() {
    return (req, res) => {
      Atendimento.adiciona(req.body, res);
    };
  }

  updateAtendimento() {
    return (req, res) => {
      const id = req.params.id;
      Atendimento.updateCliente(res, req.body, id);
    };
  }

  deleteAtendimento() {
    return (req, res) => {
      const id = req.params.id;
      Atendimento.deleteCliente(res, id);
    };
  }
}

module.exports = AtendimentoController;
