class Table {
  init(connection) {
		console.log('Tabelas foram criadas no BD...');
		this.connection = connection;
		this.creatAtentimentos();
	}

	creatAtentimentos() {
		const sql =
      'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20),data datetime NOT NULL, dataCriacao datetime NOT NULL, servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))';
		this.connection.query(sql, (error) => {
			if(error) console.log('Erro criar TB Atendimento: ' + error);
			console.log('TB - Atendimento criado com sucesso')
		})
	}
}

module.exports = new Table();
