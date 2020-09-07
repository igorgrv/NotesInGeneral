class LivroDao {
  constructor(db) {
    this._db = db;
  }

  lista() {
    return new Promise((resolve,reject) => {
			this._db.all(
				'SELECT * FROM livros',
				(erro, resposta) => {
					if(erro) return reject('Não foi possível consultar o BD');
					return resolve(resposta);
				}
			)
		});
  }
}

module.exports = LivroDao;
