# NoSQL

## Overview

* **NoSql** = ***Not Only SQL***
* O MongoDB é um sistema NOSQL
* Ao invés de utilizar dados relacionais, é utilizado o formato JSON ou BSON (binary Json);
* Orientado a Documentos;
* Fornece alta disponibilidade/tolerância falhas;
* Suporta QREP;
* Suporta consulta avançada, incides;

**Estrutura:**

```
Da		tabase
		|_______ Colections
									|_______ Documents
```



## NoSql X Sql

* Quando queremos mais desempenho? 

* O NOSQL NÃO SUBSTITUI O SQL;

* Precisa lidar com dados não estruturados ou semi estruturados?

* Precisa de uma alta velocidade de leitura e gravação?

* Precisa de flexibilidade?

  * Um Documento pode conter:

    * ```json
      {
        "_id":"123",
        "name":"Igor",
        "age":27
      }
      ```

  * Como pode ter:

    * ```json
      {
        "_id":"123",
        "age":27
      }
      ```

* **Não segue o padrão linha e coluna**;
* Se tornou popular para aplicações modernas, que lidam com problemas de **escala** (big data, tanto ao tamanho dado mas também aos acessos simultâneos dos usuários)
  * Amazon, Facebook, Google e IBM, foram de milhares de usuários para **milhões de usuários**, disponibilidae e **desempenho** eram essenciais
  * Amazon desenvolveu o DynamoDB e passou a lançar o DBaaS (Database as Service)
* **Tipos de NoSQL**:
  * Key-Value
  * Document
  * BigTable/Column-Oriented
  * Graph
* **Why NoSQL?**
  * **Escalabilidade**: É possível escalar horizontalmente entre clusters. É feit opara atender grande tamanho de dados e também a usuários simultâneos.
  * **Performance:** resposta rápida mesmo com grande conjunto de dados 
  * **Alta Disponibilidade**: como existe cópias dos dados entre diversos cluster, se torna mais resiliente do que uma solução em um único servidor
  * **Custo**
  * **Esquema flexível (Flexible Schema)**: precisa adiconar uma nova feature, nova column? NoSQL não irá bloquear, é rápido de se alterar
  * **Diferentes estruturas de dados**: NoSQL possui o Key-value, que é rápido para buscas, o Document que é bom para guardar muitos dados que não estão padronizados e o Graph para dados associativos



## Types of NoSQLs

### Key-Value

#### Pros & Cons

* Este tipo é o menos complexos dos NoSQLs
* Todos dados são armazenados com uma chave e um blob associado
* Como são armazenados com um mapa Hash, são ótimos para o CRUD
* Não são bons para consultas que conectam diversos bancos de dados

#### Quando utilizar?

* Sempre que precisar de um desempenho rápido e os dados não estiverem conectados
* Exemplo:
  * Armazenar e recuperar sessão de um usuários. Cada usuários recebe uma chave hash exclusiva e todos dados iriam para o Blob. Não haveria necessidade de consulta na base as informações do Blob, apenas utilizar a chave hash (se precisar consultar valores do Blob, compensa utilizar o tipo **Document**)
  * Carrinho de Compras
  * Preferencias de usuários em um aplicativo

#### Popular DB

* DynamoDB (Amazon)
* Redis
* Memcached



### Document

* Tipo mais popular dos NoSQLs
* Tipo Document, se baseia no banco Key-value, porém torna o valor visível para ser consultado
* Os dados ficam como um JSON ou XML
* Oferece flexibilidade no schema, onde 2 docs n precisam ser iguais/mesma informação
* Oferece oportunidade de criar index, ou queries com MapReduce

#### Quando Utilizar?

* Document foi pensado para trabalhar com JSON, RESTful APIs e dados não estruturados;
* Blog, um usuários seria um documento, um post, outro documento, cada comentário outro documento, curtida outro documento e etc.

Se a aplicação começa a ter um modelo normalizado/tabular de dados, então é momento para um BD Relacional.

#### Popular DBs

* MongoDB
* Terrastore
* IBM Cloudant



### BigTable/Column-Family

* Criado pelo google
* É parecido com tabelas em um banco relacional
* Cada linha no column-family não necessitam ter as mesmas colunas. As colunas podem ser adicionadas para nenhuma ou para todas as linhas.

<img src="https://studio3t.com/wp-content/uploads/2017/12/cassandra-column-family-example-1024x608.png" alt="The Main NoSQL Database Types | Studio 3T" style="zoom:50%;" />

#### Popular DBs

* Cassandra
* HBase
* Amazon SimpleDB



## Escolha da tecnologia

Alguns fatores são importantes para decidir entre NoSQL vs SQL e até mesmo entre os tipos de NoSQL.

Tipos de perguntas para se decidir:

* Quais tipos de perguntas você irá fazer ao seu banco de dados e quanto pode esperar por respostas?
  * Se possui uma aplicação que exige respostas interativas, NoSql pode ser uma boa escolha
  * Se seus dados parecem como uma tabela, então SQL é o seu banco
* Quão grande o banco vai ficar? quantas interações ao mesmo tempo?
* Precisará escalar horizontalmente?
* Seus dados cabem em uma RAM? Durabilidade é um must-have?
  * Alguns dados não podem ser perdidos então n podem ficar na RAM
* Precisa fazer rollback de alguma change no BD?
  * Rollbacks são fáceis em bancos SQL



## Tipos de relacionamentos

Sim, Nosql tem relacionamentos!

* Incorporação
* Referência (referencia chave valor, um documento vai ter a chave do outro)
* Desnormalização

### Incorporação

Quando um Documento incorpora/possui outro documento

Exemplo - **Usuário vs Postagens**

```json
{
  "_id": ObjectId("user1"),
  "nome": "João",
  "idade": 25,
  "postagens": [
    {
      "_id": ObjectId("post1"),
      "titulo": "Primeira postagem",
      "conteudo": "Conteúdo da primeira postagem"
    },
    {
      "_id": ObjectId("post2"),
      "titulo": "Segunda postagem",
      "conteudo": "Conteúdo da segunda postagem"
    }
  ]
}
```



### Referência:

Como o nome diz, um documento referencia o outro por Id:

```json
{
  "_id": ObjectId("user1"),
  "nome": "João",
  "idade": 25,
  "postagens": [
    ObjectId("post1"),
    ObjectId("post2")
  ]
}
```



### Desnormalização

Basicamente se trata de **duplicar dados** de um documento em vários, para melhorar o desempenho das consultas (evitando buscas em diversos documentos)

* Usado quando pensamos no que uma página irá exibir (trazemos somente as informações q a página precisa);
* Útil quando se tem consultas frequentes, que exigem acesso rápido aos dados;
* Melhora o desempenho das consultas
* **Contras: ocupa mais espaço no banco e cria redundância de dados**

Exemplo - trazer a última postagem do usuário:

```json
{
  "_id": ObjectId("user1"),
  "nome": "João",
  "idade": 25,
  "ultimaPostagem": {
    "_id": ObjectId("post2"),
    "titulo": "Segunda postagem",
    "conteudo": "Conteúdo da segunda postagem"
  }
}
```



## Instalando CLI

MongoDb Community Server: https://www.mongodb.com/try/download/community

Mac: 

```shell
$ brew install mongodb-atlas
$ atlas setup
```

Depois de instalar, tente:

```bash
mongosh
```

Se retornar

```bash
➜  /usr mongosh
Current Mongosh Log ID:	651f5f0ce4f49732716ff4f7
Connecting to:		mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1
MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
```

Tente pausar e restartar:

```bash
brew services stop mongodb-community
brew services start mongodb-community
```

Resultado esperado:

```bash
➜  /usr mongosh
Current Mongosh Log ID:	651f5f27e507f33d557300d4
Connecting to:		mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1
Using MongoDB:		7.0.2
Using Mongosh:		2.0.1

For mongosh info see: https://docs.mongodb.com/mongodb-shell/

------
   The server generated these startup warnings when booting
   2023-10-05T22:13:11.933-03:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
------

test> show databases
admin   40.00 KiB
config  12.00 KiB
local   40.00 KiB
```



## Instalando MongoDb Compass

Link: https://www.mongodb.com/try/download/compass

<img src="/Users/igorgomesromerovilela/Development/NotesInGeneral/Java/graduate/imageResource/mongodbCompass.png" alt="mongodbCompass" style="zoom:80%;" />

## Comandos

* Iniciar servidor mongo: **`mongod`**

* Mostrar banco: **`show databases`**

* Selecionar o banco: **`use nomeDoBanco`**

* Criar collection: **`db.createCollection("nomeColecao")`**

  * Precisa estar no banco, com o `use`

* Mostrar colections: **`show collections`**

* Deletar collection: **`db.nomeCollec.drop()**

* Count documentos de uma collection: **`db.nomeCollection.countDocuments()`**

* Listar documentos: **`db.nomeCollection.find()`**

* Listar com filtro: **`db.nomeCollection.find({},{})`**

  * Find recebe 2 parâmetros:

    * 1. parâmetro: se `{}` irá trazer todos os documentos, seria nosso `WHERE` 
      2. parâmetro: é o que queremos ver, seria nosso `SELECT`

    ```json
    db.customers.find({}, {"_id": 0})
    // significa que queremos todos documentos
    // mas que não mostre o _id
    
    db.customers.find({}, {"_id": 1})
    // irá exibir somente o _id
    ```

  * `LIKE` no NoSql é feito pelo `//`

    ```json
    db.customers.find({nome: '/I/'})
    // podemos por 'i' ao final, para ignorar camelCase
    db.customers.find({nome: '/I/i'})
    ```

  * StartsWith é feito pelo `/^/`

    ```json
    db.customers.find({nome: '/^Ig/i'})
    ```

  * `>=` -> Greater than

    ```json
    db.customers.find({idade: {$gte: 18}})
    ```

  * `AND` por mais de uma busca

    ```json
    db.customers.find( { idade: {$gte: 18}, nome: {$regex: /i/} })
    ```

  * Baseado em um objeto dentro de um **objeto**

    ```json
    // dado: { _id: 123, autor: { nome: igor} } -> busque este elemento
    db.customers.find( {"autor.nome": "igor" })
    ```

  * Baseado em um objeto de um **array**:

    ```json
    // dado: { _id: 123, tags: ["tag1","tag2"] } -> busque tag2
    db.customers.find( {tags: "tag2"})
    ```

* Count + Find: **`db.nomeCollec.find( {atributo: valor} ).count()`**

```json
db.customers.find( {idade: {$gt: 40} } ).count()
```

* Find + Range: **`db.nomeCollec.find({atributo: {$ind:[x,u]} })`**

```json
db.customers.find({idade: {$in:[1,4]} })
```

* Add um documento: **`db.nomeCollection.insertOne({ nome: "test" })`**

* Add vários documentos: **`db.nomeCollection.insertMany([{ nome: "test" },{ nome: "test2" }])`**

  * MongoDb permite criar variáveis temporárias:

    ```bash
    custArray = [{ nome: "test" },{ nome: "test2" }]
    db.customers.insertMany(custArray)
    ```

* Ordernar um documento: **`db.nomeCollection.find().sort({atributo: 1})`**

  * se `1` -> ASC

  * se `-1` -> DESC

    ```json
    db.nomeCollection.find().sort( {nome: 1} )
    ```

* Atualizar um doc: **`db.nomeCollection.replaceOne( {atributo: 'valorAntigo'}, {atributo: 'valornovo'})`**

```json
db.nomeCollection.replaceOne( {nome: 'Igor'}, {nome: 'Igor2', idade: 23})
```

*PERIGOSO! O ideal é fazer um **UPDATE com WHERE***

* Atualizar doc pela chave: **`db.nomeCollection.updateOne( {_id: 123}, {$set: {atrib: valor} })`**

```json
// $set -> altera o dado do elemento/ou inclui caso n exista
// dado: { _id: 123, nome: Tiago }
db.customer.updateOne( {_id: ObjectId("123")}, {$set: {nome: "Igor", Idade: 2} })
// após o set: { _id: 123, nome: Igor, idade: 2}
```

* Atualiza o subdocumento

  ```json
  // dado: { _id: 123, autor: {nome: Igor} } -> troque nome do autor
  db.customer.updateOne( {_id: ObjectId("123")}, {$set: {"autor.nome": "Tiago"} })
  ```

  

* Atualizar TODOS doc: **`db.nomeCollec.update( {}, {$set: {att: valor}}, {multi:true})`**

```json
db.customers.update( {}, {$set: {idade: 0}}, {multi:true})
```

* Remover um campo: **`db.nomeCollection.updateOne( {_id: 123}, {$unset: {atrib: "valor"}})`**

```json
// $unset -> remove o atributo
db.customer.updateOne( {_id: 123}, {$unset: {cidade: "rj"}})
```

* Adicionar um objeto a um array: **`db.nomCol.updateOne( {_id: 123}, {$push: {atrib: "valor"}})`**

```json
// push add objeto a um array
// dado: { title: test, comentario: [] }
// add um objeto array 'comentario'
db.post.updateOne( {_id: 123}, {$push: {comentario : {title: comentTitle} } })
```

* Remover um objeto de um array: **`db.nomCol.updateOne( {_id: 123}, {$pull: {atrib: "valor"}})`**

```json
// $pull remove objeto de um array
// dado: { title: test, comentario: [ { title: comentTitle} ] }
// remova o comentario 'comentTitle'
db.nomeCollection.updateOne( {_id: 123}, {$pull: {comentario : {title: comentTitle} } })
```

* Deletar um doc: **`db.nomeCollection.deleteOne( {atributo: valor} )`**

```json
db.customers.deleteOne( {_id: ObjectId("id")} )
```

* Distinct: **`db.nomeCollec.distinct("atributo")`**

```json
db.customers.distinct("nome")
```

* Count Docs if Exists: **`db.customers.find( {attr: {$exists:true} }).count()`**

```json
db.customers.find( {"nome":{$exists:true}} ).count()
```

* Data: **`ISODate("2023-10-01T01:00:00.00Z")`**

* GROUP BY: **`db.nomeCollec.agregate(operations)`**

  * No exemplo abaixo iremos agregar pelo nome, e queremos fazer uma soma dos counts

    * ```json
      db.customers.agregate( [ {$group: {_id: "name", num_tutorial: {$sum: 1} } } ] )
      ```

  * Se quiseremos somar pelo field `likes`:

    * ```json
      db.customers.agregate([{$group: {_id: "name", num_tutorial: {$sum: "$likes"} }}])
      ```

* INNER JOIN: **`db.nomeCollec.agregate([{ $lookup:{} }])`**

  ```json
  // dado as 2 collections: ORDERS & PRODUCTS faça o innerJoin
  // Order: { _id: 1, productId: 101}
  // Product: { _id: 101, name: "xbox", category: "eletronic"}
  
  db.orders.agregate([{
    $lookup: {
      from: "products",
      localfield: "productId",
      foreignField: "_id",
      as: "product"
    }
  }])
  ```

  * `$project` -> serve para filtrar o que queremos ver do `$lookup`:

    ```json
    db.orders.agregate([{
      $lookup: {
        from: "products",
        localfield: "productId",
        foreignField: "_id",
        as: "product"
      }
    }, {
      $project: {
        _id: 0,
        productName: "$product.name"
      }
    }])
    ```

  * `$match` -> serve para fazer um filtro (`WHERE`) no INNER JOIN:

    ```json
    db.orders.agregate([{
      $lookup: {
        from: "products",
        localfield: "productId",
        foreignField: "_id",
        as: "product"
      }
    },
    {
      $match: {
        "product.category":"eletronics"
      }
    },
    {
      $project: {
        _id: 0,
        productName: "$product.name"
      }
    }])
    ```











