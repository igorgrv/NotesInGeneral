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

## Comandos NoSql

* Iniciar servidor mongo: **`mongod`**

* Mostrar banco: **`show databases`**

* Selecionar o banco: **`use nomeDoBanco`**

* Criar collection: **`db.createCollection("nomeColecao")`**

  * ###### Precisa estar no banco, com o `use`

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



## Spring + MongoDB

Spring boot provê:

```xml
<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

Entidade -> usar `@Document` ao invés do `@Entity`:

```java
@Data
@Document
public class Article {}
```

Repository -> usar `MongoRepository`

```java
public interface ArticleRepository extends MongoRepository<Article, String>
```



### Conexão com o banco

* Por default, quando iniciamos o `mongosh` temos o banco de dados `test`:

  ```bash
  ➜  ~ mongosh
  Current Mongosh Log ID:	65232a607cbb8899b6df4cf2
  Connecting to:		mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1
  Using MongoDB:		7.0.2
  Using Mongosh:		2.0.1
  
  For mongosh info see: https://docs.mongodb.com/mongodb-shell/
  
  ------
     The server generated these startup warnings when booting
     2023-10-05T22:13:11.933-03:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
  ------
  
  test>
  ```

Então se subirmos nosso app e adicionar um novo documento, será armazenado no DB `test`!

**Personalizando conexão**

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost/blog
      port: 27017
      username:
      password:
```

acessando via `mongsh` após inserir um documento

```bash
test> use blog
switched to db blog

blog> show collections
article

blog> db.article.find()
[
  {
    _id: ObjectId("65232e6dc8431b18d6db52d0"),
    title: 'Exemplo de Título',
    text: 'Aqui está o texto da entidade.',
    url: 'https://www.exemplo.com',
    createdDate: ISODate("2023-10-08T03:00:00.000Z"),
    status: 1,
    _class: 'com.igor.blognosql.entity.Article'
  }
]
```



### DBRef - Objeto usando outro Objeto

É comum no java um objeto referenciar outro objeto, mas com o MongoDB precisamos anotar com **`@DBRef`**.

Exemplo - Crie a estrutura do documento abaixo:

```json
{
  "title": "Exemplo de Título 2",
  "text": "Aqui está o texto da entidade2.",
  "url": "https://www.exemplo2.com",
  "createdDate": "2023-10-08",
  "status": 1,
  "author": {
    "name": "Igor",
    "biography": "A developer that loves what he does",
    "image": "jpg"
  }
}
```

Entidade `Author`:

```java
@Data
@Document
public class Author {
  
  @Id
  private String id;
  private String name;
  private String biography;
  private String image;

}
```

Entidade `Article`:

```java
@Data
@Document
public class Article {
  
  @Id
  private String id;
  private String title;
  private String text;
  private String url;
  private LocalDate createdDate;
  private Integer status;

  @DBRef
  private Author author;

}
```



### CRUD básico

```java
// Repository
public interface ArticleRepository extends MongoRepository<Article, String> {}

// Service
@Service
@RequiredArgsConstructor
public class ArticleService {

  private final ArticleRepository articleRepository;
  private final AuthorService authorService;
  
  public List<Article> findAll() {
    return articleRepository.findAll();
  }

  public Article findById(String articleId) {
    return articleRepository
        .findById(articleId)
        .orElseThrow(() -> new IllegalArgumentException("Could not find article"));
  }

  public Article create(Article article) {
    if (article.getAuthor() != null) {
      Author author = authorService.findById(article.getAuthor().getId());
      article.setAuthor(author);
    } else {
      article.setAuthor(null);
    }
    return articleRepository.save(article);
  }
  
  public Article update(Article article) {
    return articleRepository.save(article);
  }
  
  public void delete(String articleId) {
    Article article = findById(articleId);
    articleRepository.delete(article);
  }

}


// Controller
@RestController
@RequestMapping("/articles")
class ArticleController {

  @Autowired
  private ArticleService service;

  @GetMapping
  public ResponseEntity<List<Article>> getAll() {
    List<Article> items = new ArrayList<>();
    service.findAll().forEach(items::add);
    if (items.isEmpty())
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    return new ResponseEntity<>(items, HttpStatus.OK);
  }

  @GetMapping("{id}")
  public ResponseEntity<Article> getById(@PathVariable("id") String articleId) {
    Article existingItemOptional = service.findById(articleId);
    return new ResponseEntity<>(existingItemOptional, HttpStatus.OK);
  }

  @GetMapping("findByDate")
  public ResponseEntity<List<Article>> getByDateGreaterThan(@RequestParam LocalDate date) {
    List<Article> articles = new ArrayList<>();
    service.findByDateGreaterThan(date).forEach(articles::add);
    if (articles.isEmpty())
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    return new ResponseEntity<>(articles, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<Article> create(@RequestBody Article article) {
    Article savedItem = service.create(article);
    return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
  }

  @PutMapping
  public ResponseEntity<Article> update(@RequestBody Article article) {
    Article updatedItem = service.update(article);
    return new ResponseEntity<>(updatedItem, HttpStatus.OK);
  }
  
  @DeleteMapping("{id}")
  public ResponseEntity<Article> delete(@PathVariable("id") String articleId) {
    service.delete(articleId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
```





### MongoTemplate - Queries customizadas

E se quisermos fazer queries customizadas, igual temos com:

```bash
db.nomeCollection.find( {createdDate: {$gte: 2023-10-08}} )
```

Para isso usamos do **`MongoTemplate`**!

```java
private final MongoTemplate mongoTemplate;

public List<Article> findByDateGreater(LocalDate date) {
    Query query = new Query(Criteria.where("createdDate").gt(date));
    return mongoTemplate.find(query, Article.class);
}
```

Update:

```java
public void updateArticleUrl(String id, Article article) {
    Query query = new Query(Criteria.where("id").is(id));
    Update update = new Update().set("url", article.getUrl());
    mongoTemplate.updateFirst(query, update, Article.class);
}
```



#### Criteria + Query + MongoTempl

```java
// Find using mongoTemplate
public List<Article> findByStatusDateAndTitle(String status, LocalDate date, String title) {
  Criteria criteria = new Criteria();
  
  criteria.and("date").lte(date);
  if (status != null) criteria.and("status").is(status);
  if (title != null && !title.isEmpty()) criteria.and("title").is(title);
  
  Query query = new Query(criteria);
  return mongoTemplate.find(query, Article.class);
}
```



### @Query

Assim como no SQL, o MongoDb também permite queries customizadas com o **`@Query`**:

* Exemplo: retorne articles de dentro de um range:
  * Com o uso `?X` passamos a sequência dos parâmetros

```java
// repository
public interface ArticleRepository extends MongoRepository<Article, String> {

  @Query("{ $and: [ { 'createdDate': {$gte: ?0}}, { 'createdDate': {$lte: ?1} } ]}")
  List<Article> findByCreatedDateGreaterThanAndLessThan(LocalDate stars, LocalDate ends);
}
```

Simple query com `$eq`:

```java
@Query(value = "{ 'title': { $eq: ?0 } }")
List<Article> findByTitleWithQuery(String title);
```



### Pageable

Funciona igual a como é feito com JPA clássica:

```java
// service
public Page<Article> findAll(Pageable pageable) {
  return articleRepository.findAll(pageable);
}

// Controller
@GetMapping("page")
public ResponseEntity<Page<Article>> getAll(Pageable pageable) {
  Page<Article> articles = service.findAllPageble(pageable);
  return new ResponseEntity<>(articles, HttpStatus.OK);
}
```

Requisição do `Pageable` espera `page=0&size=5`

```http
GET -> http://localhost:8080/pageable?page=0&size=5
```



### OrderBy

Funciona da mesma forma como na JPA:

```java
// repository
public interface ArticleRepository extends MongoRepository<Article, String> {
  
	List<Article> findByStatusOrderByTitleAsc(String title);
}
```

ou com `@Query` podemos passar o `sort`:

```java
@Query(value = "{ 'title': /?0/i }", sort = "{ 'title' : 1 }")
List<Article> findByTitleWithQuery(String title);
```



#### Pageable + Order

Para fazer o sort dentro de um Pageable, faremos uso do objeto `Sort`:

```java
@GetMapping("pageable")
public ResponseEntity<Page<Article>> getAll(Pageable pageable) {
  Sort sort = Sort.by("titles").ascending();
  Pageable pageableSorted = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
  Page<Article> articles = service.findAllPageble(pageableSorted);
  return new ResponseEntity<>(articles, HttpStatus.OK);
}
```



### Group By - Aggregation

Dado os documentos:

```json
[
  {
    "id": "65233c5af93a492cece07770",
    "title": "Exemplo updated",
    "text": "Aqui está o texto updated",
    "url": "https://www.exemplo.com",
    "createdDate": "2023-09-30",
    "status": 0,
    "author": {
      "id": "6523640a2fad9b797e73cd26",
      "name": "Tiago",
      "biography": "A developer that loves what he does",
      "image": "jpg"
    }
  },
  {
    "id": "652a9b66776b9336fb8aadd2",
    "title": "A title",
    "text": "Aqui está o texto da entidade2.",
    "url": "https://www.exemplo2.com",
    "createdDate": "2023-10-08",
    "status": 1,
    "author": {
      "id": "65233c3bf93a492cece0776f",
      "name": "Igor",
      "biography": "A developer that loves what he does",
      "image": "jpg"
    }
  }
]
```

Vamos agrupar por `status` e exibir uma quantidade do agrupamento

1. Precisamos criar uma classe DTO que irá representar o resultado:

   ```java
   @Data
   public class ArticleStatusCount {
     
     private String status;
     private int count;
   }
   ```

2. Com o uso do `TypedAggregation` e `Aggregation`:

   1. `TypedAggregation` espera 3 parâmetros:
      1. Classe base que contém os dados;
      2. O tipo de agregação, usando o `Aggregation` , ou seja, qual field será o `GROUP BY`;
      3. Saída dos dados, como se fosse os campos que ficariam no `SELECT`;
   2. Com o `MongoTemplate` usamos a função `aggregate` que recebe:
      1.  `TypedAggregation` 
      2. Classe DTO de saída

   ```java
   public List<ArticleStatusCount> getStatusCount() {
       TypedAggregation<Article> typedAggregation = 
         	Aggregation.newAggregation(
             Article.class,
             Aggregation.group("status").count().as("quantity"),
             Aggregation.project("quantity").and("status").previousOperation()
       		);
   
       AggregationResults<ArticleStatusCount> result = mongoTemplate.aggregate(typedAggregation, ArticleStatusCount.class);
       return result.getMappedResults();
    }
   ```

   

**Find + Agregação**

Em muitos cenários precisamos fazer um FIND antes de fazer um GROUP BY, no NoSql usamos **Criteria + Aggregation**

1. Crie um DTO que representará a saída
2. Faça o Filtro com Criteria;
3. Crie o `AggregationTyped`
4. Use `MongoTemplate` para agregar o valor e converter o resultado no DTO;

```java
public List<AuthorArticleCount> getArticlesGroupedByAuthorFrom(LocalDate startDate, LocalDate endDate) {
  Criteria criteria = Criteria.where("createdDate")
    .gte(startDate.atStartOfDay())
    .lt(endDate.plusDays(1).atStartOfDay());

  AggregationOperation match = Aggregation.match(criteria);
  AggregationOperation group = Aggregation.group("author").count().as("totalArticles");

  AggregationOperation project = 
    Aggregation.project("totalArticles")
    	.and("author").previousOperation();

  TypedAggregation<Article> typedAggregation = Aggregation.newAggregation(
      Article.class,
      match,
      group,
      project);

  AggregationResults<AuthorArticleCount> result = 
    	mongoTemplate.aggregate(typedAggregation, AuthorArticleCount.class);
  return result.getMappedResults();
}
```



### Concorrência no Mongo

Para lidar com concorrência no mongo, precisamos incluir a dependência:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-mongodb-reactive</artifactId>
  <version>3.1.4</version>
</dependency>
```

Adicionar nas entidades um **`@Version`**

```java
@Version
private Long version;
```

E adicionar com **`@Transactional`** todos os métodos de CRUD do Service:

* Se for métodos de find, basta colocarmos `@Transactional(readOnly = true)`

```java
@Transactional(readOnly = true)
public List<Article> findAll() {
  return articleRepository.findAll();
}
```

* Métodos de Update, Delete, Insert:

```java
@Transactional
public Article create(Article article) {
  if (article.getAuthor() != null) {
    Author author = authorService.findById(article.getAuthor().getId());
    article.setAuthor(author);
  } else {
    article.setAuthor(null);
  }
  return articleRepository.save(article);
}
```



#### OptimisticLockingFailureException

Quando passamos a utilizar o `version` no body, o Mongo irá lidar com as versões do documento, onde se algo for alterado no documento, será incrementado o `version`.

* Com o uso do `version` podemos lidar com diferentes usuários alterando o mesmo documento!
* Caso um usuário altere o mesmo documento, com a mesma `version`, será lançado uma excessão, **`OptimisticLockingFailureException`**

Para lidar com este problema, precisamos criar um handler para exception!

```java
@RestControllerAdvice
public class CustomExceptionHandler {

  @ExceptionHandler(OptimisticLockingFailureException.class)
  public ResponseEntity<Object> handleException(OptimisticLockingFailureException ex) {
    Error error = new Error(HttpStatus.CONFLICT.value(),
        "Error: this document was already changed by another user. Please try again");
    return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
  }

  private record Error(int statusCode, String message) {}
}
```



#### Optimistic handle

Retornar a exception para o usuário não é o ideal, podemos:

1. Verificar com `try/catch` se houve a exception;
2. Se houve a exception, podemos recuperar o documento com a version mais atualizada;
3. Alterar os dados que foram passados pelo usuário;
4. Salvar o documento com a version atualizada manualmente;

```java
public Article update(Article article) {
  try {
    return articleRepository.save(article);
  } catch (OptimisticLockingFailureException e) {
    Article articleUpdated = findById(article.getId());
    articleUpdated.setAuthor(article.getAuthor());
    articleUpdated.setCreatedDate(article.getCreatedDate());
    articleUpdated.setStatus(article.getStatus());
    articleUpdated.setVersion(articleUpdated.getVersion() + 1);

    return articleRepository.save(article);
  }
}
```



### Bean Validation

Assim como um banco SQL, no MongoDB Podemos continuar fazendo as validações dos atributos que vão em um documento:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

E nas classes podemos ter os validadores:

```java
@Data
@Document
public class Article {

  @Id
  private String id;

  @NotBlank(message = "Title is required")
  private String title;

  @NotBlank(message = "Text is required")
  private String text;

  @NotBlank(message = "url is required")
  private String url;

  @NotNull(message = "createdDate is mandatory")
  @DateTimeFormat(pattern = "YYYY-MM-dd")
  @Past
  private LocalDate createdDate;

  @NotNull(message = "Status is required")
  private Integer status;

  @DBRef
  private Author author;

  @Version
  private Long version;

}
```

E na controller precisamos sempre por **`@Valid`**:

```java
@PostMapping
public ResponseEntity<Article> create(@Valid @RequestBody Article article) {
  Article savedItem = service.create(article);
  return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
}
```



