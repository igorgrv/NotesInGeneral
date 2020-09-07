const express = require('express');
const app = express();
const routes = require('../app/routes/routes');

require('marko/node-require').install();
require('marko/express');

routes(app);

module.exports = app;