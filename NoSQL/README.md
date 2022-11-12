# NoSQL

## Overview

* O termo NoSQL, surge para um novo tipo de banco de dados **não relacional**, que n**ão segue o padrão linha e coluna**;
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
  * **Performance:** resposta rápida mesmo com grnde conjunto de dados 
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