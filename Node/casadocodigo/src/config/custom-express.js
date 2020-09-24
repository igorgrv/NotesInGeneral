const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const template = require('../app/views/template');
const sessao = require('../config/sessao-autenticacao');
sessao(app);

require('marko/node-require').install();
require('marko/express');

app.use('/estatico', express.static('src/app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

const routes = require('../app/routes/routes');
routes(app);

app.use((req, res, next) => res.status(404).marko(template.base.erro404));
app.use((error, req, res, next) => res.status(500).marko(template.base.erro500));

module.exports = app;
