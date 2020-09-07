const db = require('../../config/database');
const LivroDao = require('../dao/LivroDao');

module.exports = (app) => {
  app.get('/', function (req, res) {
    res.send(`
			<html>
				<head>
						<meta charset="utf-8">
				</head>
				<body>
						<h1> Casa do Código </h1>
				</body>
			</html>
			`);
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
};
