class LivroDao {
  constructor(db) {
    this._db = db;
  }

  lista() {
    return new Promise((resolve, reject) => {
      this._db.all('SELECT * FROM livros', (erro, resposta) => {
        if (erro) return reject('Não foi possível consultar o BD');
        return resolve(resposta);
      });
    });
  }

  adiciona(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
				INSERT INTO LIVROS (
				titulo,
				preco,
				descricao
				) values (?, ?, ?)
				`,
        [livro.titulo, livro.preco, livro.descricao],
        function (err) {
          if (err) {
            console.log(err);
            return reject('erro ao inserir dados no BD');
          }
          resolve();
        }
      );
    });
  }
}

module.exports = LivroDao;
