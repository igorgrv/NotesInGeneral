const app = require('./src/config/custom-express');

app.listen(3000, function () {
  console.log('teste da chamada');
});

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
  res.send(`
		<html>
			<head>
					<meta charset="utf-8">
			</head>
			<body>
					<h1> Lista de livros </h1>
			</body>
		</html>
		`);
});
