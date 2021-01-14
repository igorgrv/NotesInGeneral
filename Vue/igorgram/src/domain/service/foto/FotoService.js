export default class FotoService {
  constructor(resource) {
    this._resource = resource("v1/fotos{/id}");
  }

  cadastra(foto) {
    return this._resource
      .save(foto)
      .then(null, err => {
        console.log(err);
        throw new Error('Não foi possível salvar a imagem')
      });
  }

  listaFotos() {
    return this._resource.query().then(
      res => res.json(),
      err => console.log(err)
    );
  }

  getFotoById(id){
    return this._resource
      .get({id});
  }

  remove(id){
    return this._resource
      .delete( {id} )
      .then(null, err => {
        console.log(err);
        throw new Error('Não foi possível excluir a imagem');
      })
  }
}
