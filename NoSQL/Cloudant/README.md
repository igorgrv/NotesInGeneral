# Cloudant



## Cloudant Index types

* Cloudant suporta 4 tipos de indexes:

  * **Primary**: utiliza o id como chave primária, utilizado para pegar uma lista de docs por ID;

  * **Cloudant Query**: utilizado quando queremos fazer as queries diretamente na "mão"

    * ```sql
      {
      	"selector":{
      		"_id":"meuId"
      	}
      }
      ```

  * **Secondary/view**: utiliza o 'mapReduce', onde podemos fazer as operações de *sum, count, average* e outros processos matemáticos com o **reduce**

  * **Search**: para queries mais avançadas, onde queremos buscar um bloco de texto

  * **Geospatial**: para localizações



### Primary Index

Uma URL do Cloudant API, é composta por:

* Nome da conta: **https://337b7d2b-61b0-4c38-b85a-637298ebc7f1-bluemix.cloudant.com**
* Nome do banco de dados: **alert_dev**
* Endpoints: pode ser a query, o tipo de index e etc
  * **_all_docs:** retorna todos documentos do banco, porém **somente ids & keys**
  * **include_docs**: irá mostrar não somente os ids/keys mas também o documento completo
    * `include_docs=true`
  * **limit**: limita a pesquisa
    * `limit=10`
  * **skip**: pula os primeiros documentos
    * `skip=1` 
  * **key**: filtra pelo key
    * `key=32399048asbdsa3289032`
  * **startKey and endKey**: utilizado para um range de documentos, ordenado pela key
    * `startkey="1"&endkey="10`
  * **descending**: ordena em ordem decrescente 
    * `descending=true`
  * **group**: permite agrupar os valores 
    * `group=true`
  * ?: irá informar que os próximos dados são parametros
  * &: concatena parametros

```
https://337b7d2b-61b0-4c38-b85a-637298ebc7f1-bluemix.cloudant.com/alert_dev/_all_docs?limit=10&include_docs=true
```

**NOTE: O BD Cloudant funciona exatamente como uma API, dado um parametro retorne valores!**



### Cloudant Queries

Criando um index:
```json
{
    "index": {
        "fields": [
            "foo"
        ]
    },
    "name": "foo-index",
    "type": "json"
}
```

Query:

```json
{
    "selector": {
        "bar": {
            "$gt": 1000000
        }
    },
    "fields": [
        "_id",
        "_rev",
        "foo",
        "bar"
    ],
    "sort": [
        {
            "bar": "asc"
        }
    ],
    "limit": 10,
    "skip": 0
}
```



#### Index types

* Json

  * Mais rápido que o tipo text, irá utilizar **mapReduce** com **indexes secundários**, porém para queries mais complexas pode resultar em mais trabalho

* Text

  * Mais utilizado para **search index**, te permite indexas todos documentos com um comando simples:

    * ```json
      { "index": {}, "type": "text" }
      ```



#### Index operators

Os operadores abaixo servem para expressar lógicas:

* Simples:

  * ```json
    {
      "name":"Paul"
    }
    ```

* Com period (.):

  * ```json
    {
      "name":"Paul",
    	"Location.city":"Sao paulo"
    }
    ```

* Com `$`:

  * Equal to (“$eq”)

  * Greater than (“$gt”)

  * Greater than or equal to (“$gte”)

  * Less than (“$lt”)

  * Less than or equal to (“$lte”)

    ```json
    {
      "age": {
        "$gt":20
      }
    }
    ```



## Secondary Index / MapReduce / View

O Cloudant query cria um segundo index, também chamado de **view**, utiliza de **mapReduce** que possibilita fazer queries de diferentes modos!

#### Map phase

Cloudant checa todos JSON e emite uma lista de key e values e cria um index sorteado pela key. Nesta etapa podemos utilizar IF para restringir a verificação

#### Reduce phase

É opcional, utilizado para fazer outras análises. Tipos de reduce:

* _count
* _sum
* _stats

<img src="/Users/igorromero/NotesInGeneral/Cloudant/Cloudant.assets/Screen Shot 2022-09-23 at 21.20.55.png" alt="Screen Shot 2022-09-23 at 21.20.55" style="zoom:50%;" />



#### Grouping

As vezes é necessário ter as informações agrupadas, para isso:

```json
function (doc) {
  if (doc.docType=='user') {
    emit([doc.isLocationBased, doc.emailNotif]);
  }
}
```



Rodando a view, só precisaremos alterar a URL para agrupar:

```
https://test.cloudant.com/alert_dev/_design/testingViewDocument/_view/test-group?group=true
```



## Search Index

Imagine poder escrever somente o que quer em um input e obter os resultados?

<img src="/Users/igorromero/NotesInGeneral/Cloudant/Cloudant.assets/Screen Shot 2022-09-24 at 21.41.07.png" alt="Screen Shot 2022-09-24 at 21.41.07" style="zoom:50%;" />



Com um Design já criado, crie um search, adicionando uma search index function abaixo

```json
function (doc) {
  if (doc.docType) {
    index("docType", doc.docType, {"store": true})
  }
}
```

Digitando `*:*` na search query, irá retornar todos os tipos de docType agrupados!



Parametros para função de ***search index***:

1. Parâmetro: é o nome do index que será usado na pesquisa, exemplo acima poderíamos pesquisar por `docType:user`, pois `docType` está mapeado

2. Parâmetro: é o campo que iremos pesquisar

3. Parâmetro: é um objeto que poderá conter:

   1. `store=true`: informa que queremos que o campo apareça nos resultados, caso `false` não irá aparecer;

   2. `facet=true`: habilita uma espécie de counter

      1. é possível utilizar de `ranges`, exemplo: `field:[a TO d]` ou um mais complexo:
         ```
         ranges={"nomeDoField":{"rangeA":"{1 TO 10}", "rangeB":"[11 TO 20]"}}
         ```

         

   3. `index=true`: permite que o campo seja filtrado, se estiver false, o campo aparecerá nos resultados, mas não será possível pesquisar por ele



# IBM Badge - Quiz

* Which type of index allows you to perform a faceted search?

  * Select one:

    A.Geospatial index

    B.Primary index

    C.Secondary index

    **D.Search index**

* When querying a view, what parameter can you add to the query to get the document details?

  * A.key="null"

    **B.include_docs=true**

    C.include_docs=yes

    D.key=true

* When creating a full text search index, what does the "index" field do?

  * A.Lists the name of this index

    B.Lists the additional types of indexes in this database

    C.Indicates that this is an index

    **D.Indicates which fields should be indexed and searchable**

    **E.Lists the names of the fields to be indexed**

* Given the following query, which part indicates the type of index? ablanks.cloudant.com/foundbite/_design/app/_view/count_by_user

  * **A._view**

    B._design/app

    C.foundbite

    D.count_by_user

* Given a view with the following map and reduce functions, what would querying this view return? function(doc) {if(doc.salesperson) {emit(doc.salesperson, doc.totalsales);}} reduce: _sum

  * A.A sum of the total sales for all sales people

    B.A sorted list of the _sum field in each document

    C.All documents sorted by sales person's name

    **D.A sum of the total sales for each sales person**

* In a search index, if you want to store a date as "2016-01-18", you need to specify which type of analyzer?

  * A.Simple

    **B.Keyword**

    C.Classic

    D.Standard

* Which parameter specifies whether or not to include the endkey in the results?

  * A.include_end=true

    B.endkey=ture

    **C.inclusive_end=true**

    D.include_endkey=true

* Given a view with the following map function, what would querying this view return? function(doc) {if(doc.type === 'entry') {emit([doc.userid, doc.timetaken]);}}

  * A.All documents of type ‘entry’ containing null values sorted by userid and timetaken

    B.All documents of type ‘entry’ sorted by timetaken

    C.All documents of type ‘entry’ sorted by userid

    **D.All documents of type ‘entry’ sorted first by userid and then by timetaken**

* Given the following search index, what does "name:d*" do? ablanks.cloudant.com/businesscard-design/_design/app_search/searchAll?q=name:d*

  * A.Find names that end with "d"

    B.Find names containing "d"

    C.Find names with exactly "d"

    **D.Find names that start with "d"**

* Which type of index is built when you specify "json" using Cloudant Query?

  * A.Secondary index

    B.Geospatial index

    C.Search index

    **D.Primary index**

* Which geospatial geometry does Cloudant support to create a rectangle?

  * A.Polygon

    B.Bbox

    **C.Multi-point** -> TE (-> TE -> TE) (igor) (igor2)

    **D.Multi-line** -> TE (-> TE -> TE) (igor) (igor2)

    **E.Multi-poly** -> TE (igor2)

* What type of indexes can you use to perform geospatial queries?

  * **A.Views and Geospatial indexes** (-> TE -> TE) (igor)

    B.Primary and Search indexes

    C.Search and Views

    D.Search and Geospatial indexes  -> TE 

* In search indexes, secondary index, and primary indexes, what does the bookmark parameter do?

  * A.Allows you to jump to a particular document in a list

    B.Bookmarks a group of documents

    C.Bookmarks a particular document

    **D.Allows you to page through query results**

* In a search index, which parameter returns all documents?

  A.q=docs:all

  **B.q=*:***

  C.q=all_docs

  D.q="all"

* For Geospatial indexes, in what format must the data be structured?

  **A.GeoJSON**

  B.Geography Markup Language (GML)

  C.Spatial Data file

  D.Digital Line Graph (DLG)

* Given the following query, which part indicates the design document name? ablanks.cloudant.com/foundbite/_design/app/_view/count_by_user

  **A._design/app**

  B.count_by_user

  C._view

  D.app -> TE

* Which of the following statements return just the document with id "llama" assuming the database contains many documents all with unique ids?

  Select one or more:

  **A.https://ablanks.cloudant.com/animaldb/_all_docs?key="llama"** -> TE (TE2) (igor) (igor2)

  **B.https://ablanks.cloudant.com/animaldb/_all_docs?startkey="llama"** (TE2)

  **C.https://ablanks.cloudant.com/animaldb/_all_docs?endkey="llama"&inclusive_end=true** (TE2) (igor)

  D.https://ablanks.cloudant.com/animaldb/llama

  E.https://ablanks.cloudant.com/animaldb/_all_docs

* What is the best method of providing application access to your database?

  A.Create a generic account and use that username and password

  B.Create an array of user's names and passwords to use in your application

  **C.Generate an API Key**

  D.Supply your username and password

* Given a view with the following map function, what would querying this view return? function(doc) {if(doc.type === 'entry') {emit(doc.userid);}}

  **A.All documents of type ‘entry’ sorted by userid**

  B.All documents of type ‘entry’ containing any null values

  C.All documents of type ‘entry’ where the userid is null

  D.All documents of type ‘entry’ sorted from smallest to largest

* For Geospatial indexes, how many points do you need to specify for a triangle?

  **A.Four**

  B.Three

  C.Six

  D.Five

* Given a view with the following map and reduce functions, what would querying this view return? function(doc) {if(doc.type === 'entry') {emit(doc.userid);}} reduce: _count

  A.A count of the total number of documents of type ‘entry’ with null values sorted by userid

  B.A sorted list of the _count field in each document of type ‘entry’

  C.A list of all documents of type ‘entry’ sorted by userid

  **D.A count of the total number of documents of type ‘entry’**

* Which parameter finds a document with a specific key using the primary index?

  A.startkey

  **B.key**

  C.q

  D.endkey

* Which type of index is built when you specify "text" using Cloudant Query?

  **A.Search index**

  B.Primary index

  C.Secondary index

  D.Geospatial index

* Given the following search index, what does "sort=["state< string >"]" do? ablanks.cloudant.com/businesscard-design/_design/app_search/searchAll?q=name:d* AND language:English&sort=["state< string >"]

  A.Specifies that the values in the state field should be converted to a string for sorted purposes

  **B.Sorts by the state field which is a string in ascending order**

  C.Sorts by the state field which is a string in descending order

  D.Specifies that the string fields should be sorted based on the document state

* In a search index, which statement would retrieve a range of values from b to d for the name field?

  Select one or more:

  A.name(b TO d)

  B.name:{b-d}

  C.name:range{b-d}

  **D.name:[b TO d]** -> TE (-> TE -> TE) (igor) (igor2)

  E.name:{b TO d} -> TE (igor)

* Given the following query, what type of index is being queried? ablanks.cloudant.com/foundbite/_design/app/_view/count_by_user

  A.Primary index

  B.Geospatial index

  **C.Secondary index**

  D.Search index

* Which primary index query returns all documents in the animaldb database?

  Select one:

  A.https://ablanks.cloudant.com/animaldb/q=*:*

  B.https://ablanks.cloudant.com/animaldb/key="all_docs"

  C.https://ablanks.cloudant.com/animaldb/include_docs=true

  **D.https://ablanks.cloudant.com/animaldb/_all_docs**

* Given the following query, which part indicates the index name? ablanks.cloudant.com/foundbite/_design/app/_view/count_by_user

  A._design/app

  **B.count_by_user**

  C._view

  D.foundbite

* Given the following query, which part indicates the database name? ablanks.cloudant.com/foundbite/_design/app/_view/count_by_user

  A.count_by_user

  **B.foundbite**

  C._view

  D._design/app

* What are the two types of Cloudant query indexes?

  A.Primary and secondary

  B.Search and view

  C.Search and secondary

  **D.JSON and text**