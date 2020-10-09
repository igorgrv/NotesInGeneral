const AtendimentoController = require('../controllers/atendimento-controller');
const atendimentoController = new AtendimentoController();
const atendimentoRoutes = AtendimentoController.routes();

module.exports = (app) => {
  app.route(atendimentoRoutes.atendimento)
    .get(atendimentoController.getAll())
    .post(atendimentoController.addAtendimento());

  app.route(atendimentoRoutes.atendimentoId)
    .get(atendimentoController.getOne())
    .patch(atendimentoController.updateAtendimento())
    .delete(atendimentoController.deleteAtendimento());
};
