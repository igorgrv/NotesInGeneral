# NodeJS

O Node é uma plataforma que foi criada para o **desenvolvimento de aplicações _backend_** utilizando o **JavaScript**! Para iniciar neste mundo, é **necessário baixar o** [NodeJs](https://nodejs.org/en/) e instala-lo, para que seja possível acessarmos via **cmd**. Vamos testar com um `npm -version`.

## Hello World

O Node funciona com arquivos `.js` ou seja, podemos simplesmente:

1. Criar um arquivo, do tipo `.js`;
2. Escrever `console.log('ola mundo');`;
3. Rodar um `node helloworld.js` no terminal e ver o resultado!

Mas e se no nosso código incluíssimos um `alert('oi')`? No Terminal **não iria funcionar!** Pois estamos rodando o código pelo lado do servidor e não pelo do navegador!

## Getting Started

### Criando Servidor c/ JavaScript

O Node trabalha com módulos/bibliotecas, onde **todo arquivo `.js`** é um módulo.<br>Para criar o servidor, iremos:

1. Criar o arquivo`server.js`;

2. Adicionar o módulo `http` utilizando o `require('modulo')` e atribui-lo a uma `const`;

   ```javascript
   const http = require ('http');
   ```

Com o `http`, podemos **criar o servidor**, configurar a porta e devolver uma resposta!

1. Utilizaremos do `createServer()` para criar um objeto do tipo `Server`;

2. O método `createServer()` espera receber um `requestListener` que recebe um `request e response`!

   ```javascript
   const http = require ('http');
   const server = http.createServer(function (req, res) {
       res.end(` 
           <html>
               <head>
               	<meta charset="utf-8">
               </head>
               <body>
               	<h1> Casa do Código </h1>
               </body> 
           </html>
   	`)
   })
   ```

3. Com o objeto `server` iremos configurar a porta, com o `listen(NumeroDaPorta)`;

   ```javascript
   server.listen(3000);
   ```

4. Agora rodamos o servidor com `node server.js` e então acessamos via `localhost:3000`;

### Iniciando projeto c/ Node

Até o passo anterior criamos um projeto basicamente com `javascript`, mas onde entra o Node?<br>

Para criarmos um **servidor com Node** utilizaremos do **Express.js**, mas devemos:

1. Iniciar um projeto Node com `npm init`;

   1. Algumas perguntas serão feitas, devemos nos atentar ao **1º arquivo a ser gerado**;

      ```
      package name: (casadocodigo)
      version: (1.0.0)
      description: Projeto para praticar o uso do node
      entry point: (olamundo.js) server.js
      test command:
      git repository:
      keywords:
      author: Igor Romero
      license: (ISC)
      ```

2. Será gerado um arquivo `package.json` que é onde se define que se trata de um projeto **Node**!

3. Para instalar o Express, iremos rodar o `npm i express@4.16.3 --save-exact`;

Mas precisamos já começar a **organizar a estrutura de pastas** do projeto

```
src
|--- app	-> fica toda lógica do projeto
|--- config -> fica toda config. do projeto
```

### Criando servidor c/ Node

Uma vez que o projeto ja foi criado e o express ja está instalado, iremos:

1. Apagar o código com javascript e começar a utilizar o express!

   ```javascript
   const express = require('express');
   
   // const http = require('http');
   // const server = http.createServer(function (req, res) {
   //   res.end(`
   // 	 <html>
   // 			<head>
   // 					<meta charset="utf-8">
   // 			</head>
   // 			<body>
   // 					<h1> Casa do Código </h1>
   // 			</body>
   // 	</html>
   // 	`);
   // }).listen(3000);
   
   ```

2. Com o `const` criado, iremos associar o método `express()` a uma nova variavel chamada `app`;

3. Agora precisamos configurar a **porta** e retorno após a chamada da porta;

   ```typescript
   const express = require('express');
   const app = express();
   
   app.listen(3000, function(){
   	console.log('teste da chamada');
   });
   ```

Porém, se chamarmos um `localhost:3000` iremos receber um `cannot get /`, pois não mapeamos nenhuma rota! Para mapear a rota precisamos:

1. utilizar o método `app.get` que espera a rota e uma função!

   ```javascript
   const express = require('express');
   const app = express();
   
   app.listen(3000, function () {
     console.log('teste da chamada');
   });
   
   app.get('/', function (req, res) {
   	res.send(`
   		<html>
   			<head>
   					<meta charset="utf-8">
   			</head>
   			<body>
   					<h1> Casa do Código </h1>
   			</body>
   		</html>
   		`);
   });
   
   app.get('/livros', function (req, res) {
     res.send(`
   		<html>
   			<head>
   					<meta charset="utf-8">
   			</head>
   			<body>
   					<h1> Lista de livros </h1>
   			</body>
   		</html>
   		`);
   });
   ```

## Module.exports

### Encapsulando  o express

O arquivo `server.js` está com muitas responsabilidades e sabemos que isto não é ideal. Para resolver iremos:

1. **Encapsular** a chamada do `require('express')` em um arquivo chamado `custom-express.js`;

2. Criar o arquivo `custom-express.js` dentro de `config` e mover parte do código para lá!

3. Para que a variável `app` seja acessível devemos utilizar o **MODULE.EXPORTS**!

   ```javascript
   //src/config/custom-express.js
   const express = require('express');
   const app = express();
   
   module.exports = app;
   
   //-------------------------------------------------
   //server.js
   const app = require('./src/config/custom-express');

   app.listen(3000, function () {
     console.log('teste da chamada');
   });
   
   app.get('/', function (req, res) {
   	res.send(`
   		<html>
   			<head>
   					<meta charset="utf-8">
   			</head>
   			<body>
   					<h1> Casa do Código </h1>
   			</body>
   		</html>
   		`);
   });
   ```

### Encapsulando as rotas

Ainda deixamos como responsabilidade ao `server.js` declarar as rotas, portanto, iremos encapsula-las!

1. Vamos criar uma pasta ‘routes’ com o arquivo `routes.js` dentro de `src/app`;

2. Este arquivo será responsável por todo código referente a rota:

   ```javascript
   app.get('/', function (req, res) {
     res.send(`
   		<html>
   			<head>
   					<meta charset="utf-8">
   			</head>
   			<body>
   					<h1> Casa do Código </h1>
   			</body>
   		</html>
   		`);
   });
   
   app.get('/livros', function (req, res) {
     res.send(`
   		<html>
   			<head>
   					<meta charset="utf-8">
   			</head>
   			<body>
   					<h1> Lista de livros </h1>
   			</body>
   		</html>
   		`);
   });
   
   ```

**PORÉM**, de onde vem o `app`? Precisaremos fazer com que o `routes.js` receba este valor através do **`module.exports`** utilizando uma `Arrow Function`!

```typescript
module.exports = (app) => {
  app.get('/', function (req, res) {
    res.send(`
			<html>
				<head>
						<meta charset="utf-8">
				</head>
				<body>
						<h1> Casa do Código </h1>
				</body>
			</html>
			`);
  });

  app.get('/livros', function (req, res) {
    res.send(`
			<html>
				<head>
						<meta charset="utf-8">
				</head>
				<body>
						<h1> Lista de livros </h1>
				</body>
			</html>
			`);
  });
};

```

Agora, precisamos declarar o `routes.js` em algum lugar, mas onde? Se pensarmos bem, no:

* `server.js` -> configurações referente ao servidor;
* `express.js` -> controllador das chamadas;

Portanto, o ideal é colocar dentro do `express.js` as chamadas as rotas, portanto, ficamos:

```
server.js -> chama custom-express.js -> chama o routes.js
```

## Nodemon

O Nodemon nos permite atualizar nosso código e não precisar ficar reiniciando o servidor toda hora!

1. Para instalar o `nodemon` rodamos tanto no projeto local como no global;

   ```
   npm i nodemon@1.18.4 --save-dev --save-exact
   npm i -g nodemon@1.18.4
   ```

Com o módulo instalado, vamos no arquivo `package.json` e alteramos o `start` para `nodemon server.js`!

```json
{
    "name": "casadocodigo",
    "version": "1.0.0",
    "description": "Projeto para praticar o uso do node",
    "main": "server.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon server.js"
    },
```

Agora é possível rodar o código com `npm start`

## Marko

Para começar utilizar o `Marko` precisamos instala-lo com  `npm install marko@4.13.4-1 --save-exact` e também precisamos pedir para nosso **nodemon** para ignorar o arquivo:

```

```



### Template Estático

Atualmente nosso arquivo `routes.js` possui o código HTML inserido, o que sabemos que não é uma boa prática. **Iremos criar uma pasta view** onde ficarão os templates com a extensão `.marko`.

1. Dentro do arquivo `custom-express.js` iremos adicionar duas linhas para habilitar o uso do `marko`

   ```javascript
   require('marko/node-require').install();
   require('marko/express');
   ```

2. Criaremos `src/app/views/livros/lista` e dentro criaremos `lista.marko` com o HTML:

   ```html
   <html>
       <head>
           <meta charset="utf-8">
       </head>
       <body>
           <h1> Listagem de livros </h1>
   
           <table>
               <tr>
                   <td>ID</td>
                   <td>Título</td>
               </tr>
                   <tr>
                   <td>1</td>
                   <td>Fundamentos do Node</td>
               </tr>
           </table> 
       </body> 
   </html>
   ```

3. Podemos retirar o código HTML do `routes.js` e chamar o estático `lista.marko` com o `res.marko()`;

   ```javascript
   app.get('/livros', function (req, res) {
       res.marko(require('../views/livros/lista/lista.marko'));
   });
   ```

### Template quase dinâmico

Não queremos popular o HTML com dados fixos na tabela, agora **queremos utilizar um ARRAY JAVASCRIPT**. Que facilitará a criação da tabela.

1. Dentro do arquivo `routes.js` iremos atribuir um novo parâmetro no método `marko()` e iremos incluir o nosso **array de livros**:

   ```javascript
   app.get('/livros', function (req, res) {
       res.marko(require('../views/livros/lista/lista.marko'), {
           livros: [
               {
                   id: 1,
                   titulo: 'Fundamentos do Node',
               },
               {
                   id: 2,
                   titulo: 'Node Avançado',
               },
           ],
       });
   });
   ```

2. Deste modo, no arquivo `lista.marko` iremos utilizar a TAG `for()` que espera receber um `data.livros`:

   ```html
   <table>
       <tr>
           <td>ID</td>
           <td>Título</td>
       </tr>
       <tr for (livro in data.livros)>
           <td>${livro.id}</td>
           <td>${livro.titulo}</td>
       </tr>
   </table>
   ```

3. Agora só rodar o `npm start` novamente e ver!

### Template Dinâmico - Acesso ao BD

Necessário:

1.  Baixar: [database.js](https://caelum-online-public.s3.amazonaws.com/980-nodejs-fundamentos/03/database.js) e move-lo para pasta `src/config`;
2. Instalar o `sqlite` -> `npm install sqlite3`;

Com a configuração feita, iremos trabalhar com o banco de dados no `routes.js`, onde estamos com o array de `livros`.

1. Adicionaremos o `db` com o `const db`;

   ```javascript
   const db = require('../../config/database');
   ```

2. Com o método `db.all` podemos colocar o SQL e também trabalhar com o `resultado`, através da função de `callback`:

   ```javascript
   app.get('/livros', function (req, res) {
       db.all("SELECT * FROM livros", function(erro,resultado){
           res.marko(
               require('../views/livros/lista/lista.marko'),
               {
                   livros: resultado,
               }
           );
       });
   });
   ```

## DAO

Com o padrão DAO, centralizamos tudo ao que se refere de **aceso ao BD** a uma classe.

1. Criaremos `src/app/dao` a classe `LivrosDao`;

2. Esta classe irá receber no construtor um parâmetro `db` e terá um método `lista()` que receberá um `callback`;

   ```javascript
   class LivroDao {
       constructor(db) {
           this._db = db;
       }
   
       lista(callback) {}
   }
   ```

3. Dentro do método `lista` iremos chamar o `db.all` passando o SQL e a função de `callback` e então exportaremos a classe;

   ```javascript
   class LivroDao {
       constructor(db) {
           this._db = db;
       }
   
       lista(callback) {
           this._db.all(
               'SELECT * FROM livros',
               (erro, resultado) =>
               callback(erro,resultado)
           );
       }
   }
   
   module.exports = LivroDao;
   ```

4. Agora no arquivo `routes.js` iremos importar esta classe e utilizar o método `lista()`;

   ```javascript
   const db = require('../../config/database');
   const LivroDao = require ('../dao/LivroDao');
   
   app.get('/livros', function (req, res) {
   
       const livroDao = new LivroDao(db);
       livroDao.lista(function(erro,resultado){
           res.marko (
               require('../views/livros/lista/lista.marko'),
               {
                   livros: resultado,
               }
           );
       });
   });
   ```

   

### Com Promise

E se invés de passarmos um parâmetro ao `lista(callback)` não passassemos parâmetro algum? Isto **é possível com o `Promise`**!<br>

Toda `Promise` recebe dois parâmetros `(resolve, reject)` que nos retornar um “rejeitar” a chamada ou retornar o que estamos esperando, ex.:

```javascript
método(){
    return new Promise((resolve,reject) => {
        if(erro) return reject('Deu erro');
        return resolve (respostaCorreta);
    })
}
```

1. Dentro da classe `ListaDao` iremos alterar o método `lista` e utilizar o `Promise`;

   ```javascript
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
   ```

2. Na classe `routes.js` iremos utilizar o `then()` e o `catch()`

   ```javascript
   app.get('/livros', function (req, res) {
       const livroDao = new LivroDao(db);
       livroDao
           .lista()
           .then((livros) =>
                 res.marko(require('../views/livros/lista/lista.marko'), {
           		livros: livros,
       		 })
           )
           .catch((erro) => console.log(erro));
   });
   ```

   