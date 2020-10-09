const customExpress = require('./src/config/custom-express');
const Table = require('./src/app/infra/table');

const connection = require('./src/app/infra/connection');
connection.connect((error) => {
	if(error) console.log('Erro ao conectar: ' + error);
	console.log('Conectado ao bd...');

	Table.init(connection);
	const app = customExpress();
	app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});
