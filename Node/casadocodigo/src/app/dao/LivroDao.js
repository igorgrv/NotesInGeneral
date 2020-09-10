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

  buscaPorId(id) {
    return new Promise((resolve, reject) => {
      this._db.get(
        `
        SELECT * FROM livros WHERE id = ?
      `,
        [id],
        (err, livro) => {
          if (err) return reject('Nenhum livro encontrado');
          return resolve(livro);
        }
      );
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
          DELETE FROM livros WHERE id = ?
        `,
        [id],
        (err) => {
          if (err) return reject('Nenhum livro encontrado para remoção');
          resolve();
        }
      );
    });
  }

  atualiza(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
          UPDATE livros
          SET titulo = ?,
          preco = ?,
          descricao = ?
          WHERE id = ?
        `,
        [livro.titulo, livro.preco, livro.descricao, livro.id],
        (err) => {
          if (err) return reject('Nenhum livro encontrado para remoção');
          resolve();
        }
      );
    });
  }
}

module.exports = LivroDao;
