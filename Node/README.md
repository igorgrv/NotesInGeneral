

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

4. Criar o arquivo `server.js` na pasta raíz;

Mas precisamos já começar a **organizar a estrutura de pastas** do projeto

```
src
|--- app	-> fica toda lógica do projeto
|--- config -> fica toda config. do projeto
server.js
package.json
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

```javascript
const express = require('express');
const app = express();
const routes = require('../app/routes/routes');

routes(app);

module.exports = app;
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
nodemon server.js --ignore *.marko.js
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

### GET ALL

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

   

### GET ALL - c/ Promise

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

### POST + body-parser

Precisamos criar um `form` e uma **nova rota** para acessar este formulário!

1. Criar o arquivo `form.marko` em `srv/app/view/livros/form`

   ```html
   <html>
     <body>
       <h1>Cadastro de livros</h1>
       <form action="/livros" method="post">
         <input type="hidden" id="id" name="id"/>
         <div>
           <label for="titulo">Titulo:</label>
           <input type="text" id="titulo" name="titulo" placeholder="coloque o titulo"/>
         </div>
         <div>
           <label for="preco">Preço:</label>
           <input type="text" id="preco" name="preco" placeholder="150.25"/>
         </div>
         <div>
           <label for="descricao">Descrição:</label>
           <textarea cols="20" rows="10" id="descricao" name="descricao" placeholder="fale sobre o livro"/>
         </div>
         <input type="submit" value="Salvar"/>
       </form>
     </body>
   </html>
   ```

2. Adicionar a rota `/livros/form` no arquivo `routes.js`

   ```javascript
   app.get('/livros/form', (req, resp) => {
       resp.marko(require('../views/livros/form/form.marko'));
     });
   ```

<br>

Para realizar um POST, teremos que adicionar um **MIDDLEWARE**, chamado de **`body-parser`**:

```
npm i body-parser
```

Este módulo, é responsável por habilitar a leitura do `req.body` e deverá ser configurado no `express.js`.

1. Devemos fazer um `require` no `body-parser`;

2. Usar o método `use()` do `app`, onde iremos passar o `body-parser`;

   1. Exemplo:

   ```javascript
   // o método use() é utilizado para acrescentar um middleware
   // 1º parâmetro é a URL que acionará o middleware e o 2º a função que define oq o mid. irá fazer
   
   // A função, recebe 3 parâmetros (req, res, next) - o next avança para o prox. mid.
   // caso não haja mais nenhum mid. ele irá terminar a func. ativa
   app.use('*', (req, res, next) => {
      console.log('1.1');
      next();
      console.log('1.2');
   });
   
   app.use('*', (req, res, next) => {
      console.log('2.1');
      next();
      console.log('2.2');
   });
   
   app.get('/livros', function(req, resp) {
          console.log('listagem livros')
   }
   
   // irá imprimir
   // 1.1 2.1 listagem livros 2.2 1.2
   ```

3. Utilizar o método `urlEnconded( extended: true)` -> irá permitir retornar um json;

   ```javascript
   const app = express();
   const bodyParser = require ('body-parser');
   
   app.use(
     bodyParser.urlencoded({
       extended: true,
     })
   );
   
   const routes = require('../app/routes/routes');
   routes(app);
   ```

Deste modo, podemos receber do um `json` do `console.log`!

```json
{ id: '', titulo: 'teste', preco: '12', descricao: 'teste2' }
```

Agora devemos fazer a inserção no banco de dados!

1. Dentro da classe `LivrosDao` iremos criar o método `adiciona()` que deverá receber um `livro` (proveniente do req.body);

2. Dentro do método `adiciona(livro)` iremos utilizar a `promise` e o método `run()` de `db`;

   1. O método `run()` irá receber 3 parâmetros:
      1. String SQL;
      2. Os valores a serem substituidos do `?,?,?`;
      3. Retorno do resolve e reject em caso de erro;

   ```javascript
   // adiciona({titulo,preco,descricao}) -> tbm é possivel, inves de passar o objeto
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
                       return reject('Erro na inserção do BD');
                   }
                   resolve();
               }
           );
       });
   }
   ```

Agora podemos alterar o `routes.js` passando o novo método adiciona, onde queremos após ter sido feita a requisição, seja redirecionado para tela `/livros`:

```javascript
app.post('/livros', (req, resp) => {
    console.log(req.body);
    const livroDao = new LivrosDao(db);
    livroDao
      .adiciona(req.body)
      .then(resp.redirect('/livros'))
      .catch((err) => console.log(err));
});
```

### GET BY ID

Para buscar por id, iremos utilizar o método `get` do `db`, onde invés de devolvermos todos os resultado, iremos devolver o id em específico:

```javascript
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
```

### DELETE + Arquivos Estáticos

Como o `Delete` não queremos que tenha nenhum retorno, podemos utilizar o método `run` do `db`:

```javascript
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
```

Com o DAO pronto, agora precisamos:

* Adicionar ao `lista.marko` uma tag `<a>` para que seja feita a remoção;
* Criar o arquivo estático do ajax para efetuar remoção;
  * Adiciona um middleware para o arquivo estático;
* Registrar a rota para que seja chamado o metodo `remove(id)`;

Começando pelo alteração no `lista.marko`:

```html
<table id="livros">
    <tr>
        <td>ID</td>
        <td>Título</td>
        <td>Preço</td>
        <td>Editar</td>
        <td>Remover</td>
    </tr>
    <tr id="livro_${livro.id}" for (livro in data.livros)>
        <td>${livro.id}</td>
        <td>${livro.titulo}</td>
        <td>${livro.preco}</td>
        <td><a href="#">Editar</a></td>
        <td><a href="#" data-ref="${livro.id}" data-type="remocao">Remover</a></td>
    </tr>
</table>

<!-- arquivo responsavel por fazer a remoção via ajax -->
<script src="/estatico/js/remove-livro.js"></script>
```

O arquivo `remove-livro.js` deverá ficar na pasta `src/app/public/js` (no HTML deve ficar com a rota cadastrada no `express.js`);

```javascript
let tabelaLivros = document.querySelector('#livros');
tabelaLivros.addEventListener('click', (evento) => {
  let elementoClicado = evento.target;

  if (elementoClicado.dataset.type == 'remocao') {
    let livroId = elementoClicado.dataset.ref;
    fetch(`http://localhost:3000/livros/${livroId}`, { method: 'DELETE' })
      .then((resposta) => {
        let tr = elementoClicado.closest(`#livro_${livroId}`);
        tr.remove();
      })
      .catch((erro) => console.log(erro));
  }
});

```

Dentro do `express.js` iremos cadastrar uma rota e um middleware para este arquivo estático!

```javascript
// devemos colocar antes do body-parser
app.use('/estatico', express.static('src/app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
```

Por último, devemos fazer o cadastro da rota, conforme definido no `remove-livro.js`, com o `app.delete`:

```javascript
app.delete('/livros/:id', (req, resp) => {
   const id = req.params.id;
    
    const livroDao = new LivroDao(db);
    livroDao
        .remove(id)
    	.then( () => resp.status(200).end())
    	.catch((err) => console.log(err));
});
```



### UPDATE  +  method-override

Segue o mesmo padrão do `POST` e `DELETE` para a classe `LivroDao`;

```javascript
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
```

Para realizar uma atualização dos dados, iremos **utilizar o mesmo formulário para adição** e para isto, precisaremos:<br>

No `form.marko`:

* Inserir um `value` para cada `<input>` -> contendo a variável que será definida no `routes.js` (`${data.livro.id}`);
* Adicionar uma `<div>` com um `if` verificando se existe algum id preenchido;
* Incluir o `<input hidden>` que o **middleware Method-Override**  pede, com o tipo `PUT`;

```html
<form action="/livros" method="post">
    <div if(data.livro.id)>
        <input type="hidden" name="_method" value="PUT">
        <input type="hidden" id="id" name="id" value="${data.livro.id}" />
    </div>
    <div>
        <label for="titulo">Titulo:</label>
        <input type="text" id="titulo" name="titulo" value="${data.livro.titulo}" placeholder="coloque o titulo" />
    </div>
    <div>
        <label for="preco">Preço:</label>
        <input type="text" id="preco" name="preco" value="${data.livro.preco}" placeholder="150.25" />
    </div>
    <div>
        <label for="descricao">Descrição:</label>
        <textarea cols="20" rows="10"  id="descricao" name="descricao" placeholder="fale sobre o livro">${data.livro.descricao}</textarea>
    </div>

    <input type="submit" value="Salvar" />
</form>
```

No `express.js`:

* Instalar com `npm i method-override`;
* Adicionar o middleware **depois do `body-parser`**!

```javascript
const bodyParser = require('body-parser');
const methodOverride = require ('method-override');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
```

No `routes.js`:

* Teremos de alterar o `app.get('/livros/form')` para que seja passado um `livro : {}`;
* Adicionar o método `app.put` que será identico ao `app.post` porém usando o `livroDao.atualiza`;
* Adicionar um `app.get('/livros/form/:id')` para a TAG `<a>` que ficará no `list.marko`;

```javascript
app.get('/livros/form', (req, resp) => {
    resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
});

app.put('/livros', (req, resp) => {
    console.log(req.body);
    const livroDao = new LivroDao(db);
    livroDao
        .atualiza(req.body)
        .then(resp.redirect('/livros'))
        .catch((err) => console.log(err));
});
```

No `list.marko`:

* Adicionar a URL a TAG `<a>`:

```html
<tr id="livro_${livro.id}" for (livro in data.livros)>
    <td>${livro.id}</td>
    <td>${livro.titulo}</td>
    <td>${livro.preco}</td>
    <td><a href="/livros/form/${livro.id}">Editar</a></td>
    <td><a href="#" data-ref="${livro.id}" data-type="remocao">Remover</a></td>
</tr>
```



## Tratando erros  404 e 500

Atualmente se entrarmos em uma **rota inexistente** iremos tomar um **erro 404** (página não encontrada), assim como como se inserirmos uma rota **com id** incorreto, iremos tomar um **erro 500** (erro no back-end).<br>

Para direcionarmos a uma nova página iremos **precisar de um Middleware** que verifique o erro e direcione para uma página de erro!<br>**PORÉM,** precisamos nos atentar que **ERROS VÃO NO FINAL DO EXPRESS**, pois se trata de um middleware onde a ordem importa!.

* Middleware para o erro 404:

  ```javascript
  app.use((req, res, next) => (
    res.status(404).marko(require('../app/views/base/erros/404.marko'))
  ));
  ```

* Middleware para o error 500 -> devemos **atribuir 4º parâmetro** para que o express entenda que se trata de um erro do servidor

  ```javascript
  app.use((error, req, res, next) => (
    res.status(500).marko(require('../app/views/base/erros/500.marko'))
  ));
  ```

HTML:

```html
<!-- 500.marko -->
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/estatico/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/estatico/css/fontawesome.min.css" />
    <link rel="stylesheet" href="/estatico/css/casadocodigo.css" />
</head>
<body>
    <header class="cabecalhoPrincipal">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-4">
                    <h1 class="logo"><img src="/estatico/imagens/logo-casadocodigo.svg" alt="Casa do Código" /></h1>
                </div>
                <div class="cabecalhoPrincipal-navegacao col-8">
                    <a href="#" class="login">
                        <i class="fas fa-sign-in-alt"></i>Login
                    </a>
                </div>
            </div>
        </div>
    </header>
    <main class="conteudoPrincipal">
        <div class="container">
            <h1>Opss!</h1>
            
            <p>Houve um problema. Tente mais tarde.</p>
            <a href="/">Voltar</a>
        </div>
    </main>
    <footer class="rodape">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-4">
                    <img src="/estatico/imagens/logo-rodape.svg" class="logo-rodape" />
                </div>
                <div class="col-8">
                    <ul class="redesSociais">
                        <li><a href="http://www.facebook.com/casadocodigo" class="compartilhar-facebook" target="_blank">/CasaDoCodigo</a></li>
                        <li><a href="http://www.twitter.com/casadocodigo" class="compartilhar-twitter" target="_blank">@casadocodigo</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
```



## Validações - express-validator

O **Express-validator** é uma biblioteca cheia de validações já pré-definidas, ou que podem ser customizadas também! Que nos auxilia nas etapas de verificação dos campos.

Para fazer as validações com o `express-validator`, precisaremos:

1. Instalar o `express-validator`: `npm i express-validator`;

2. Adicionar no `routes.js` a constante `check, validationResult` do `express-validator`;

3. No `app.post` iremos fazer a validação, onde basta criaremos um `array` antes da chamada `req, res`, passando um `check` nos campos;

4. No callback, é chamada a função `validationResult(req)`;

   ```javascript
   const { check, validationResult } = require ('express-validator');
   
   app.post(
       '/livros',
       [
           check('titulo').isLength({ min: 5 }).withMessage('Necessário ter no mínimo 5 caracteres'),
           check('preco').isCurrency().withMessage('Necessário ser um valor correto'),
       ],
       (req, resp) => {
           console.log(req.body);
   
           const erros = validationResult(req);
           console.log(JSON.stringify(erros));
           if (!erros.isEmpty()) {
               return resp.marko(require('../views/livros/form/form.marko'), {
                   livro: req.body,
                   errosValidacao: erros.array(),
               });
           }
           const livroDao = new LivroDao(db);
           livroDao
               .adiciona(req.body)
               .then(resp.redirect('/livros'))
               .catch((err) => console.log(err));
       }
   );
   ```

   ```html
   <div class="container">
       <h1>Cadastro de livros</h1>
   
       <div if(data.errosValidacao)>
           <div class="alert alert-danger" for(erro in data.errosValidacao)>
               ${erro.param} - ${erro.msg}
           </div>
       </div>
   
       <form action="/livros" method="post">
   ```

# MVC

![mvc](https://caelum-online-public.s3.amazonaws.com/1021-node-mvc-autenticacao-autorizacao/Transcri%C3%A7%C3%B5es/Imagens/casadocodigo7.png)

## Controller

Atualmente nosso arquivo `routes.js` esta com **muita responsabilidade** e para isto o **padrão MVC** cai como uma luva!<br>

O Controller será responsável por cada `function(req,res)` do `routes`, para isto, precisaremos:

1. Criar dentro de `app/controllers` as classes `base-controller.js` e  `livro-controller.js`

2. Estas classes terão todas as funções utilizadas no `routes.js`;

3. No `routes.js` iremos chamar ambas as classes e seus respectivos métodos;

   ```javascript
   // routes.js
   const { check } = require('express-validator');
   
   const LivroController = require('../controllers/livro-controller');
   const livroController = new LivroController();
   
   const BaseController = require('../controllers/base-controller');
   const baseController = new BaseController();
   
   module.exports = (app) => {
     app.get('/', baseController.home());
   
     app.get('/livros', livroController.lista());
   
     app.get('/livros/form', livroController.formularioCadastro());
   
     app.post(
       '/livros',
       [
         check('titulo').isLength({ min: 5 }).withMessage('Necessário ter no mínimo 5 caracteres'),
         check('preco').isCurrency().withMessage('Necessário ser um valor correto'),
       ],
       livroController.cadastra()
     );
   
     app.get('/livros/form/:id', livroController.formularioEdicao());
   
     app.put('/livros', livroController.edita());
   
     app.delete('/livros/:id', livroController.remove());
   };
   ```

   ```javascript
   // base-controller.js
   class BaseController {
     home() {
       return (req, res) => res.marko(require('../views/base/home/home.marko'));
     }
   }
   
   module.exports = BaseController;
   
   
   // livro-controller.js
   const LivroDao = require('../dao/LivroDao');
   const db = require('../../config/database');
   const { validationResult } = require('express-validator');
   
   class LivroController {
     lista() {
       return (req, res) => {
         const livroDao = new LivroDao(db);
         livroDao
           .lista()
           .then((livros) =>
             res.marko(require('../views/livros/lista/lista.marko'), {
               livros: livros,
             })
           )
           .catch((erro) => console.log(erro));
       };
     }
   
     formularioCadastro() {
       return (req, resp) => {
         resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
       };
     }
   
     cadastra() {
       return (req, resp) => {
         console.log(req.body);
   
         const erros = validationResult(req);
         console.log(JSON.stringify(erros));
         if (!erros.isEmpty()) {
           return resp.marko(require('../views/livros/form/form.marko'), {
             livro: req.body,
             errosValidacao: erros.array(),
           });
         }
         const livroDao = new LivroDao(db);
         livroDao
           .adiciona(req.body)
           .then(resp.redirect('/livros'))
           .catch((err) => console.log(err));
       };
     }
   
     formularioEdicao() {
       return (req, resp) => {
         const { id } = req.params;
   
         const livroDao = new LivroDao(db);
         livroDao
           .buscaPorId(id)
           .then((livro) => {
             resp.marko(require('../views/livros/form/form.marko'), {
               livro: livro,
             });
           })
           .catch((err) => console.log(err));
       };
     }
   
     edita() {
       return (req, resp) => {
         console.log(req.body);
         const livroDao = new LivroDao(db);
         livroDao
           .atualiza(req.body)
           .then(resp.redirect('/livros'))
           .catch((err) => console.log(err));
       };
     }
   
     remove() {
       return (req, resp) => {
         const id = req.params.id;
   
         const livroDao = new LivroDao(db);
         livroDao
           .remove(id)
           .then(() => resp.status(200).end())
           .catch((err) => console.log(err));
       };
     }
   }
   
   module.exports = LivroController;
   
   ```

### Encapsulando as rotas

Dentro do `LivroController` vemos que repetimos a rota `/livros` e no `routes.js` repetimos varias vezes também! Um bom modo de encapsular as rotas é **criar um método estático** chamados `rotas()` que erá **responsável por dedevolver** um objeto javascript com todas as rotas!

```javascript
class LivroController {
    static rotas() {
        return {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id',
        };
    }
}
```

Desta forma os métodos irão chamar `rotas().lista`:

```javascript
.then(resp.redirect(LivroController.rotas().lista))
```

e no `routes.js`:

```javascript
module.exports = (app) => {
    app.get('/', baseController.home());

    app.get(LivroController.rotas().lista, livroController.lista());

    app.get(LivroController.rotas().cadastro, livroController.formularioCadastro());

    app.post(
        LivroController.rotas().lista,
        [
            check('titulo').isLength({ min: 5 }).withMessage('Necessário ter no mínimo 5 caracteres'),
            check('preco').isCurrency().withMessage('Necessário ser um valor correto'),
        ],
        livroController.cadastra()
    );

    app.get(LivroController.rotas().edicao, livroController.formularioEdicao());

    app.put(LivroController.rotas().lista, livroController.edita());

    app.delete(LivroController.rotas().delecao, livroController.remove());
};
```

### Agregação de rotas + app.route

O `routes.js` esta melhor, porém ainda possui algumas rotas iguais, como:

```javascript
app.get(LivroController.rotas().cadastro, livroController.formularioCadastro());
app.post(LivroController.rotas().cadastro, Livro.validacoes(), livroController.cadastra());
app.put(LivroController.rotas().cadastro, livroController.edita());
```

Para este caso o `express` fornece um método chamado `route()` que nos permite **passar a URL** e os método HTTP que esta URL possuirá!

1. No `routes.js` iremos adicionar o método `app.route()` passando o `LivroController.rotas().cadastro`;

2. Como **método complementar** iremos adicionar o `get, post e put`;

   ```javascript
   app.route(LivroController.rotas().cadastro)
       .get(livroController.formularioCadastro())
       .post(Livro.validacoes(), livroController.cadastra())
       .put(livroController.edita());
   ```

## Model

De toda refatoração feita, ainda no arquivo `routes.js` ficaram as **validações**, o que não é de responsabilidade do `routes`, portanto, por se tratar de um validação de `livro` iremos:

1. Criar a pasta `src/app/model` e dentro inserir a classe `livro.js`;

2. Iremos retirar o código do `routes.js` que se refere a validações:

   ```javascript
   // const { check } = require('express-validator'); -> irá para livro
   
   const LivroController = require('../controllers/livro-controller');
   const livroController = new LivroController();
   
   module.exports = (app) => {
       app.post(
           LivroController.rotas().lista,
          // irá para o livro.js
          //
          // [
          //     check('titulo').isLength({ min: 5 }).withMessage('Necessário ter no mínimo 5 caracteres'),
          //     check('preco').isCurrency().withMessage('Necessário ser um valor correto'),
          // ],
           livroController.cadastra()
       );
       
   }
   ```

3. Adicionaremos no `livro.js` e substituiremos no `routes.js`, que agora chamará o **model** `livro`;

   1. **_para que seja possível utilizar a função `valicadacoes()` é necessário utilizar o `static`_**;

   ```javascript
   const { check } = require('express-validator');
   
   class Livro {
   
       static validacoes() {
           return [
               check('titulo').isLength({ min: 5 }).withMessage('Necessário ter no mínimo 5 caracteres'),
               check('preco').isCurrency().withMessage('Necessário ser um valor correto'),
           ];
       }
   
   }
   
   module.exports = Livro;
   ```

## View

### Encapsulando o template

Havíamos criado a **view** e inserimos todos os nossos **templates**, **PORÉM** toda vez que vamos utilizar o template, temos que escrever `require(../app/view/base/home/home.marko)`, o que é ruim e feio. Para **encapsularmos** o **template** iremos:

1. Criar dentro das pastas `view/base` e `view/livro` o arquivo `index.js`, que irá conter os layouts que estamos utilizando, através de um **objeto javascript _(titulo: chave)_**;

   ```javascript
   //index.js -> base
   module.exports = {
     erro404: require('./erros/404.marko'),
     erro500: require('./erros/500.marko'),
     home: require('./home/home.marko'),
   };
   
   //index.js -> livro
   module.exports = {
     lista: require('./lista/lista.marko'),
     form: require('./form/form.marko'),
   };
   ```

2. Então criamos na pasta `view` o arquivo `template` que irá fazer um `require` na **base e no livro**:

   1. **_não é necessário expor o `index.js`, pois por padrão o NodeJs faz isto!_**

   ```javascript
   // template.js
   module.exports = {
   	base: require('./base'),
   	livro: require('./livros')
   }
   ```

3. Agora basta ajustarmos nos `Controllers` e no `express` quando há erros:

   ```javascript
   // BaseController
   const template = require('../views/template');
   
   class BaseController {
     home() {
       return (req, res) => res.marko(template.base.home);
     }
   }
   
   //-------------------------------------------------------------
   // LivroController
   const template = require('../views/template');
   
   class LivroController {
     formularioCadastro() {
       return (req, resp) => {
         resp.marko(template.livro.form, { livro: {} });
       };
     }   
   }
   //-------------------------------------------------------------
   // express.js
   const template = require('../app/views/template');
   
   app.use((req, res, next) => res.status(404).marko(template.base.erro404));
   app.use((error, req, res, next) => res.status(500).marko(template.base.erro500));
   ```

# Autenticação

## Como funciona?

![nodejsAutenticacao](C:\Users\867695\Pictures\nodejsAutenticacao.PNG)

Na prática a aplicação faz a **serialização** das informações passadas pelo formulário para **dentro de uma sessão**. Com a criação da sessão, será **devolvido** um ID de forma que **toda qualquer requisição** proveniente daquele ID será já autenticado. O **trafégo** ocorrerá via **cookie**!

## Template Login

Para que seja realizado a **autenticação** será necessário incluirmos uma [página](https://caelum-online-public.s3.amazonaws.com/1021-node-mvc-autenticacao-autorizacao/04/login.zip) para **efetuar o login**, no formato `marko`!

1. Adicionaremos a [página](https://caelum-online-public.s3.amazonaws.com/1021-node-mvc-autenticacao-autorizacao/04/login.zip) na `views/base/login`;

2. Incluiremos no `index.js` da base;

   ```javascript
   module.exports = {
     erro404: require('./erros/404.marko'),
     erro500: require('./erros/500.marko'),
     home: require('./home/home.marko'),
     login: require('./login/login.marko'),
   };
   ```

3. Incluiremos no método `static` da `BaseController` a nova rota `/login`;

   1. Adicionaremos um método `efetuaLogin()`  que não fará nada a princípio;

   ```javascript
   const template = require('../views/template');
   
   class BaseController {
       static routes() {
           return {
               home: '/',
               login: '/login',
           };
       }
   
       login() {
           return (req,res) => res.marko(template.base.login);
       }
   
       efetuaLogin() {
           return (req, res) => {
               console.log('efetuou login');
           };
       }
   
   }
   ```

4. Incluiremos no `base-routes.js` a rota para `/login`;

   1. Teremos um método `get` para exibir o formulário e o `post` para fazer o login;

   ```javascript
   const BaseController = require('../controllers/base-controller');
   const baseController = new BaseController();
   
   module.exports = (app) => {
       const baseRoutes = BaseController.routes();
   
       app.get(baseRoutes.home, baseController.home());
       app.route(baseRoutes.login)
           .get(baseController.login())
           .post(baseController.efetuaLogin());
   }
   ```

## Config. Autenticação

### Modulos

Para utilizarmos a autenticação/sessão será necessário utilizar os módulos abaixo:

```
npm install uuid@3.3.2 express-session passport passport-local
```

### UsuarioDao

Iremos mapear a busca de usuários pelo email, com o `usuario-dao.js`:

```javascript
class UsuarioDao {
    constructor(db) {
        this._db = db;
    }

    buscaPorEmail(email) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                SELECT *
                FROM usuarios
                WHERE email = ?
                `,
                [email],
                (erro, usuario) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o usuário!');
                    }
                    return resolve(usuario);
                }
            );
        });
    }
}

module.exports = UsuarioDao;
```

### Autenticação do Usuario

1. Criar o arquivo `sessao-autenticacao.js` dentro da pasta `app/config`;

2. Adicionar os pacotes `uuid | sessao  | passport | passport-local` como constantes que irá importar os módulos;

   1. Para o `passport-local` será utilizado a classe `Strategy`;

   ```javascript
   const uuid = require('uuid/v4');
   const sessao = require('express-session');
   const passport = require('passport');
   const LocalStrategy = require('passport-local').Strategy;
   
   module.exports = (app) => {
       //configuração da sessão e da autenticação.
   }
   ```
   
3. No arquivo `express.js` iremos precisar passar o express para o `sessao-autenticacao.js`

   ```javascript
   //express.js
   const sessao = require('../config/sessao-autenticacao');
   sessao(app);
   ```

4. Dentro do `module.exports` utiizaremos o método `use` do `passport`, que recebe um `Strategy`;

   ```javascript
   module.exports = (app) => {
       passport.use(new LocalStrategy());
   }
   ```

5. O `Strategy` recebe 2 parâmetros:

   1º parâmetro: **objeto javascript**, contendo o `userNameField e passWordField` (que recebem o `name` do `input`);

   2º parâmetro: função que receberá `(email, senha, done)` -> `done()` é uma função responsável por fazer determinada ação após o termino da verificação;

   ```javascript
   module.exports = (app) => {
     passport.use(
       new LocalStrategy(
         {
           usernameField: 'email',
           passwordField: 'senha',
         },
         (username, password, done) => {
             //Chama classe UsuarioDao para verificar email
         }
       )
     );
   };
   ```

6. Mapearemos o `UsuarioDao` e o `DB`:

   ```javascript
   const db = require('./database');
   const UsuarioDao = require('../app/dao/usuario-dao');
   const usuarioDao = new UsuarioDao(db);
   ```

7. Dentro do 2º parâmetro do construtor, chamaremos o método `buscaPorEmail` que espera receber o `username`;

8. O método `buscaPorEmail` retorna um `Promise`, então podemos fazer um `then()` pegando o **usuário!** portanto, caso exista o usuário e a **senha** coincida com o `password`, podemos utilizar o método `done()` que recebe 3 parâmetros:

   ​	1º parâmetro: erro (caso não exista, retornamos `null`);

   ​	2º parâmetro: usuario autenticado (caso não seja autenticado, retornamos `false`);

   ​	3º parâmetro: objeto javascript informando oq aconteceu (neste caso iremos passar uma mensagem);

   ```javascript
   (username, password, done) => {
       usuarioDao
           .buscaPorEmail(username)
           .then((usuario) => {
               if(!usuario || usuario.senha != password) {
                   return done(null, false, { mensagem: 'usuário ou senha não existem!' });
               }
           	return done (null, usuario);
       	})
           .catch((err) => done(err, false));
   }
   ```

### Serialização

A serialização do usuário é feita utilizando o método `serializeUser` do módulo `passport`. A função, recebe 2 parâmetros:

1. parâmetro: é o `usuario` que estará vindo do **banco de dados**;
2. parâmetro: função `done`;

```javascript
passport.serializeUser((usuario, done) => {
    // passaremos os valores que serão serializados
});
```

Dentro da função, iremos:

1. Criar uma `const usuarioSessao` que será um **objeto javascript**, contendo as informações do **nome do usuário** e **email**;

2. Passaremos o `usuarioSessao` na função `done()`;

   ```javascript
   passport.serializeUser((usuario, done) => {
       const usuarioSessao = {
           nome: usuario.nome_completo,
           email: usuario.email
       };
       done(null, usuarioSessao);
   });
   ```

### Desserialização

A desserialização é mais simples, apenas irá pegar o valor do **usuário serializado** e passar dentro da função `done()`;

* Lembrando que dentro da variável `passport` o usuario **já esta serializado!**;

```javascript
passport.deserializeUser((usuarioSerializado, done) => {
    done(null, usuarioSerializado);
});
```

## Sessão

A configuração da **sessão** irá ficar no arquivo `sessao-autenticacao.js`, logo após a desserialização!

* Para configurarmos a sessão, é necessário criarmos um **`secret` e uma chave aleatória com `uuid`**;

A sessão é configurada em um **middleware**, portanto utilizaremos o famoso `app.use()`, passando nossa `const sessao`:

```javascript
app.use(
    sessao({
        secret: 'igor',
        genid: (req) => {
            return uuid();
        },
        resave: false,
        saveUninitialized: false,
    })
);
```

**Inicializando** a Sessão e a Autenticação:

```javascript
app.use(passport.initialize());
app.use(passport.session());
```

### Sessão + Autenticação

```javascript
const uuid = require('uuid/v4');
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./database');
const UsuarioDao = require('../app/dao/usuario-dao');
const usuarioDao = new UsuarioDao(db);

module.exports = (app) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'senha',
      },
      (username, password, done) => {
        usuarioDao
          .buscaPorEmail(username)
          .then((usuario) => {
            if (!usuario || usuario.senha != password) {
              return done(null, false, { mensagem: 'usuário ou senha não existem!' });
            }
            return done(null, usuario);
          })
          .catch((err) => done(err, false));
      }
    )
  );

  passport.serializeUser((usuario, done) => {
    const usuarioSessao = {
      nome: usuario.nome_completo,
      email: usuario.email,
    };

    done(null, usuarioSessao);
  });

  passport.deserializeUser((usuarioSerializado, done) => {
    done(null, usuarioSerializado);
  });

  app.use(
    sessao({
      secret: 'igor',
      genid: (req) => {
        return uuid();
      },
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
```



## Implementando Autenticação

Voltando ao `base-controller.js` iremos implementar de fato a **a sessão**. Relembrando, quando fazemos o `post` na URL `/login` estamos chamando o método `efetuaLogin()`;

1. Dentro do método `efetuaLogin()`, iremos chamar o `passport` , porém como?

   1. Será necessário no método `sessao-autenticacao.js` **atribuir na requisição** o `passport`:

      ```javascript
      app.use(passport.initialize());
      app.use(passport.session());
      
      app.use((req,res,next) => {
          req.passport = passport;
          next();
      });
      ```

2. Com o `passport` atribuido na requisição, podemos fazer uso do `app.passport`, portanto no arquivo `base-controller.js`, iremos criar a `const passport` que irá receber o  `app.passport`;

3. O `passport` possui o método `authenticate` que recebe os mesmos 3 parâmetros (erro, usuario, informação) e **deve receber o tipo de armazenamento, que nosso caso é `‘local'`**;

4. Dentro deste método iremos verificar se há algum erro ou informação, caso não haja, sabemos que o usuário foi autenticado e podemos redirecionar para `lista` com o método `login()`;

   ```javascript
   efetuaLogin() {
       return (req, res, next) => {
           const passport = req.passport;
           passport.authenticate('local', (error, username, info) => {
               if (info) return res.marko(template.base.login);
               if (error) return next(error);
               req.login(username, (erro) => {
                 if (erro) {
                   return next(erro);
                 }
                 return resp.redirect(LivroController.rotas().lista);
               });
           });
       };
   }
   ```

5. Por último, a função `authenticate` retorna outra função q precisa receber o `req, res, next`!

   ```javascript
   efetuaLogin() {
       return (req, res, next) => {
           const passport = req.passport;
           passport.authenticate('local', (error, username, info) => {
               if (info) return res.marko(template.base.login);
               if (error) return next(error);
               
               req.login(username, (erro) => {
                 if (erro) {
                   return next(erro);
                 }
                 return resp.redirect(LivroController.rotas().lista);
               });
           })(req, res, next);
       };
   }
   ```

## Autorizando

Na aplicação, o que queremos é que somente usuários **autenticados** consigam acessar as rotas **/livro**** então, iremos no `LivroController` fazer esta validação!

1. Devemos criar a rota necessária, que chamaremos de `autenticada`

```javascript
// LivroController
static rotas() {
    return {
        autenticadas: '/livros*',
        lista: '/livros',
        cadastro: '/livros/form',
        edicao: '/livros/form/:id',
        delecao: '/livros/:id',
    };
}
```

2. Com a rota criada, em `livro-routes` iremos utilizar o middleware para verificar se o usuário esta autenticado, ou não!

   ```javascript
   module.exports = (app) => {
       app.use(LivroController.rotas().autenticadas, (req, resp, next) => {
           if (req.isAuthenticated()) {
               next(); // caso esteja autenticado, irá prosseguir
           } else {
               resp.redirect(BaseController.routes().login);
           }
       });
       
       // demais rotas e middlewares
   ```

   

# REST

## Requisitos

* Node Js;
* MySql;
* Postman;
* Express;

## Estrutura de pastas

```
| - src
|
| - - app
| - - - - controller
| - - - - model
| - - - - routes
| - - - - infra
| - - - - - - connection.js
| - - - - - - tables.js
|
| - - config
| - - - - custom-express.js
|
| - index.js
```

## Dependencias utilizadas

```bash
npm i express nodemon consign body-parser mysql moment
```



## Iniciando

Se inicia o projeto, criando a pasta e depois rodando o `npm init`;

1. Criar o `express` -> exportar o `app`;

   ```javascript
   const express = require('express');
   
   module.exports = () => {
       const app = express();
   
       return app;
   };
   ```

2. Criar o `index.js` -> será o servidor q executa o `listen()`

   ```javascript
   const customExpress = require('./src/config/custom-express');
   const app = customExpress();
   
   app.listen(3000, () => console.log('executando na porta 3000'));
   ```

### GET

1. Crie a pasta `src/controllers` e adicione o arquivo `atendimentos.js`

   ```javascript
   module.exports = (app) => {
       app.get('/atendimentos', (req, res) => {
           res.send('olá atendimentos');
       });
   }
   ```

   Para que funcione, será **preciso utilizar o `consign`!**

#### Consign

O Consign é responsável por agrupar todas as rotas que estão sendo criadas e coloca tudo dentro do `app`!

1. Declare ele no `custom-express.js`

   ```javascript
   const express = require('express');
   const consign = require('consign');
   ```

2. Declare o que o `consign` irá agrupar

   ```javascript
   module.exports = () => {
     const app = express();
   	consign().include('src/app/controllers').into(app);
   
   	return app;
   };
   ```

### POST

Para utilizar o `post` iremos precisar instalar o `body-parser` e chama-lo no `customExpress`:

```javascript
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
    
  // demais metodos
}
```

 Para criar o `post` iremos criar o metodo abaixo testar via **postman**:

```javascript
app.post('/atendimentos', (req, res) => {
    res.send('olá atendimentos POST');
});
```

Postman: `localhost:3000/atendimentos` com o método **POST**;<br>

#### Utilizando o Body

1. No postman, em `headers` configuremos para o `content-type` ser o `json`;

2. Com o `body-parser` configurado para receber tratar o json, iremos dar um `console.log(req.body)`, para exibir o que está sendo passado no `json`;

   ```javascript
   app.post('/atendimentos', (req, res) => {
       console.log(req.body);
       res.send('olá atendimentos POST');
   });
   ```

3. No postman, em `body`, iremos selecionar o tipo `raw` e passar um `json`:

   ```json
   { 
       "nome": "igor"
   }
   ```

**Podemos consumir com o [CURL](https://www.hostinger.com.br/tutoriais/comando-curl-linux/)** invés do Postman

## SQL

Iremos criar o BD no **MySQL Workbench**

1. Crie o BD, chamado `agenda-petshop`;

2. Instalamos a dependência com `npm i mysql`;

3. No Projeto, criamos a pasta `src/infra` e o arquivo `connection.js`;

   1. Este arquivo ficará as configurações do BD:

      ```javascript
      const mysql = require('mysql');
      
      const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'agenda-petshop',
      });
      
      module.exports = connection;
      ```

4. No `index.js` iremos **conectar o BD**:

   ```javascript
   const customExpress = require('./src/config/custom-express');
   
   const connection = require('./src/app/infra/connection');
   connection.connect((error) => {
   	if(error) console.log('Erro ao conectar: ' + error);
   	console.log('Conectado ao bd...');
   
       // só irá abrir o express caso não tenha erro no banco de dados
   	const app = customExpress();
   	app.listen(3000, () => console.log('executando na porta 3000'));
   });
   
   ```

   Caso dê erro, execute no MySQL:

   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
   flush privileges;
   ```

### Tabelas

1. Criemos o arquivo `tables.js` dentro de `src/infra`;

2. Este arquivo conterá a classe `Table`, que irá receber o método `init()`, que espera receber uma `connection`;

   ```javascript
   class Table {
       init(connection) {
           console.log('Tabelas foram criadas no BD...');
       }
   }
   
   module.exports = new Table();
   ```

3. No `index.js` iremos fazer um `require` para esta classe, passando a `connection`:

   ```javascript
   const customExpress = require('./src/config/custom-express');
   const Table = require('./src/app/infra/table');
   const connection = require('./src/app/infra/connection');
   
   connection.connect((error) => {
   	if(error) console.log('Erro ao conectar: ' + error);
   	console.log('Conectado ao bd...');
   
       Table.init(connection);
   	const app = customExpress();
   	app.listen(3000, () => console.log('executando na porta 3000'));
   });
   ```

4. Agora só precisamos criar um método na `table.js` que cria a tabela, através do `connection.query`

   ```javascript
   class Table {
       init(connection) {
           console.log('Tabelas foram criadas no BD...');
           this.connection = connection;
           this.creatAtentimentos();
       }
   
       creatAtentimentos() {
           const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
           
           this.connection.query(sql, (error) => {
               if(error) console.log('Erro criar TB Atendimento: ' + error);
               console.log('TB - Atendimento criado com sucesso')
           })
       }
   }
   ```

   

## Persistindo os dados

Por enquanto estamos somente configurando o BD/Tabelas, para persistir os dados, teremos de **criar um Model**, que será responsável por realizar o **CRUD** da aplicação!

### INSERT

1. Criaremos a pasta `src/model` e o arquivo `atendimento.js`, que irá ter o método responsável pela **adicao**:

   ```javascript
   class Atendimento {
   	adiciona(atendimento) {
   
   	}
   }
   module.exports = Atendimento;
   ```

2. Para realizar a inserção no BD, é necessário utilizar a `connection`, portanto iremos dar um `require()` na conexão e depois com o método `query`, iremos passar:

   1. Sintax SQL, o objeto e uma função de callback, para nos informar o que esta acontecendo;

   ```javascript
   const connection = require('../infra/connection');
   
   class Atendimento {
       adiciona(atendimento) {
           const sql = 'INSERT INTO atendimentos SET ?';
   
           connection.query(sql, atendimento, (error, result) => {
               if (error) console.log('erro ao inserir no atendimentos: ' + error);
               console.log(result);
           });
           
   /*
   conexao.query(`INSERT INTO Servicos(nome, preco) VALUES('${nome}', '${preco}')`, (erro, resultados) => {
    */
       }
   }
   module.exports = Atendimento;
   ```

3. No `Controller` iremos dar um `require` no model  `atendimento` e passar o `req.body`

   ```javascript
   const Atendimento = require('../model/atendimento');
   
   module.exports = (app) => {
   
       app.post('/atendimentos', (req, res) => {
           Atendimento.adiciona(req.body);
           res.send('olá atendimentos POST');
       });
   };
   ```

4. No Postman, em `body` iremos incluir os campos como `x-www-form`

   ```
   cliente:igor
   pet:Sonic
   servico:tosa
   status:agendado
   observacoes:muito bondoso
   ```

   

#### Acrescentando campo DateTime

Queremos que quando gravarmos o um registro, que apareça a data e horário que este registro foi efetuado! E para trabalhar com **Datas** nada melhor do que o **`moment`** -> `npm i moment`

1. Iremos alterar a tabela direto no MySql:

   ```sql
   ALTER TABLE `agenda-petshop`.atendimentos add data datetime NOT NULL, add dataCriacao datetime NOT NULL;
   ```

2. Alterar o `CREATE TABLE` da classe `table`, acrescentando a `data` e `dataCriacao`

   ```javascript
   "pet varchar(20),data datetime NOT NULL, dataCriacao datetime NOT NULL, servico varchar(20) NOT NULL"
   ```

3. No `atendimento` da classe **Model**, iremos alterar o método `adiciona()` para que quando for recebermos a data, a gente tratar ela (pois poderá vir com um padrão diferente do PT-BR e o banco de dados aceitará um tipo só)

   ```javascript
   const moment = require('moment');
   const connection = require('../infra/connection');
   
   class Atendimento {
     adiciona(atendimento) {
       const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss');
       const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
       const atendimentoDate = {...atendimento, dataCriacao, data};
       const sql = 'INSERT INTO atendimentos SET ?';
   
       connection.query(sql, atendimentoDate, (error, result) => {
         if (error) console.log('erro ao inserir no atendimentos: ' + error);
         else console.log(result);
       });
     }
   }
   module.exports = new Atendimento;
   ```

#### Status HTTP

Até o momento retornamos um `console.log` informando o que foi feito, mas e se retornassemos uma mensagem? um objeto? um status da requisição?

1. No `Atendimento` do controller, iremos passar o `res` como parâmetro do `adiciona()`

   ```javascript
   app.post('/atendimentos', (req, res) => {
       Atendimento.adiciona(req.body, res);
   });
   ```

2. Dentro do `atendimento` do Model, iremos receber o `res` e no lugar dos `console.log` iremos passar um `res.status.json`

   ```javascript
   adiciona(atendimento, res) {
       const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss');
       const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
       const atendimentoDate = {...atendimento, dataCriacao, data};
       const sql = 'INSERT INTO atendimentos SET ?';
   
       connection.query(sql, atendimentoDate, (error, result) => {
           if (error) res.status(400).json(error);
           else res.status(200).json(result);
       });
   }
   ```

#### Validações

E se passarmos um campo em branco? E se a data marcada para o pet for antes da data atual? Temos que aplicar validações!<br>A idéia é de criar um **array de Validacoes**, que irá encapsular `booleans` e irá retornar uma mensagem em caso de erro;

1. Iremos criar os `booleans`;

   1. A data só pode ser maior ou igual a data atual:

      ```javascript
      const dataEhValida = moment(data).isSameOrAfter(atendimentoDate);
      ```

   2. O cliente tem que ter no mínimo 5 caractéres:

      ```javascript
      const clientEhValido = atendimento.cliente.length >= 5;
      ```

2. Agrupando as validações:

   ```javascript
   const validacoes = [
       {
           campo: 'data',
           valido: dataEhValida,
           mensagem: 'Data deve ser maior ou igual a data atual',
       },
       {
           campo: 'cliente',
           valido: clientEhValido,
           mensagem: 'Cliente deve ter no mínimo 5 caracteres',
       },
   ];
   ```

3. Agora iremos **filtrar** `validacoes` pegando somente se algum campo tiver erro

   ```javascript
   const erros = validacoes.filter(campo => !campo.valido);
   ```

4. Iremos checar se `erros` possui algum elemento e caso possua, retornamos estes `erros`:

   ```javascript
   const existemErros = erros.length;
   
   if (existemErros) {
       res.status(400).json(erros);
   } else {
       const sql = 'INSERT INTO atendimentos SET ?';
   
       connection.query(sql, atendimentoDate, (error, result) => {
           if (error) res.status(400).json(error);
           else res.status(200).json(result);
       });
   }
   ```

   

### GET - All

Para realizar o **getAll** basta recebermos o `res` e realizarmos um `SELET * FROM atendimentos`.

1. No `atendimento` controller:

   ```javascript
   const Atendimento = require('../model/atendimento');
   
   module.exports = (app) => {
     app.get('/atendimentos', (req, res) => {
       Atendimento.getAll(res);
     });
   ```

2. No `atendimento` model, iremos criar o método `getAll`:

   ```javascript
   getAll(res) {
       const sql = "SELECT * FROM atendimentos";
       connection.query(sql, (err,result) => {
           if(err) res.status(400).json(err);
           res.status(200).json(result);
       })
   }
   ```

### GET - One

Para pegar um cliente, será parecido como o método de pegar todos, porém iremos receber um id

1. No `atendimento` controller:

   ```javascript
   const Atendimento = require('../model/atendimento');
   
   module.exports = (app) => {
    
     app.get('/atendimentos/:id', (req, res) => {
       const id = req.params.id;
       console.log(id);
       Atendimento.getCliente(res, id);
     });
   ```

2. No `atendimento` model, iremos criar o método `getOne`:

   ```javascript
   getCliente(res, id) {
       const sql = 'SELECT * FROM atendimentos WHERE id = ?';
       connection.query(sql, id, (err, result) => {
           const atendimento = result[0];
           if (err) res.status(400).json(err);
           res.status(200).json(atendimento);
       });
   }
   ```



### UPDATE

O update será uma junção do `post` com o `get`, portanto precisa receber um `body` e um `id`

```javascript
app.patch('/atendimentos/:id', (req, res) => {
    const id = req.params.id;
    Atendimento.updateCliente(res, req.body, id);
});
```

E previamente devemos fazer um tratamento da data, para não termos problema

```javascript
updateCliente(res, atendimento, id) {
    if(atendimento.data) {
        atendimento.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
    }
    const sql = 'UPDATE atendimentos SET ? WHERE id = ?';
    connection.query(sql, [atendimento, id], (err, result) => {
        if (err) res.status(400).json(err);
        res.status(200).json(atendimento);
    });
}
```

### DELETE

O Delete segue o mesmo padrão para o `getOne`, mudando apenas o método http:

```javascript
app.delete('/atendimentos/:id', (req, res) => {
    const id = req.params.id;
    Atendimento.deleteCliente(res, id);
});
```

```javascript
deleteCliente(res, id) {
    const sql = 'DELETE FROM atendimentos WHERE id = ?';

    connection.query(sql, id, (err, result) => {
        if (err) res.status(400).json(err);
        res.status(200).json(id);
    });
}
```



# MongoDB

MongoDB é um banco de dados **NoSQL**, que possui algumas diferenças em relação a um banco de dados **SQL**, ou seja, MongoDB é um banco **não relacional** e o **MySQL é um banco relacional**.

<br>

Differença entre ambos bancos:

![nosql](https://github.com/igorgrv/NotesInGeneral/blob/master/images/nosql_sql.PNG?raw=true)

## Conectando ao MongoDB

Para utilizar o MongoDB em uma aplicação node, precisaremos instalar a dependência:

```bash
npm i mongodb@3.1.10
```

Após a instalação da dependência, podemos realizar a **conexão com o mongo**.

1. Caso seja inicializado local, precisa subir o arquivo `mongod.exe` que se encontra na pasta bin da aplicação;
2. Para rodar remoto, o [Mongo Atlas Account](https://account.mongodb.com/account/) pede um Login para criação dos clusters;
3. Com um cluster criado, basta clicarmos em Connect -> Connect your application -> copiar a URL dada, e substituir para a senha;

Criando o arquivo `mongodb.js`, realizaremos a conexão com o banco de dados:

```javascript
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//const connectionUrlRemota = 'mongodb+srv://igor-accenture:<password>@usersign.pr5k3.mongodb.net/UserSign?retryWrites=true&w=majority';
const connectionUrl = 'mongodb://127.0.0.1:27017';

MongoClient.connect(connectionUrl, { useNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log('erro ao conectar no BD: ' + error);
    }
    return console.log('Connectado com sucesso');
})
```

### Criando Collection e inserindo dados

Com o `client` na função de call-back, basta que seja informado **qual o Cluster** e referencia uma Collection na chamada:

```javascript
const connectionUrl = 'mongodb+srv:...';
const cluster = 'UsuarioSign';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('erro ao conectar no BD: ' + error);
    }

    const db = client.db(cluster);
    db.collection('usuario-node').insertOne({
        nome: 'igor',
        email: 'igorgrv@hotmail.com',
        senha: '123456',
    });
});

```



# Mongoose

O Mongoose nos permite trabalhar com o MongoDB de forma simples, assim como a JPA auxilia na inserção de dados em um BD, o **mongoose**, permite:

* Criar as colunas/fields com tipagem;
* Validar os campos;
* Relacionar Collections/ Tabelas

<br>

Para utilizar o **mongoose:**

```
npm i mongoose@5.3.16
```

Com a conexão ao banco de dados já pré-configurada:

```javascript
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//const connectionUrl = 'mongodb+srv://connectionRetornadaPeloMongoAtlas';
const url = 'mongodb://127.0.0.1:27017/UsuarioSign';
const cluster = 'UsuarioSign';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('erro ao conectar no BD: ' + error);
  }

  const db = client.db(cluster);
});
```

Criamos a o arquivo `mongoose.js` que ficará com as configurações necessárias:

1. Crie o arquivo `mongoose.js` dentro da pasta `src/app/database`;

2. Este arquivo irá passar a mesma URL que foi utilizada no Mongo e também irá conter o mesmo parâmetro, somente com uma adição ao index

   ```javascript
   const mongoose = require('mongoose');
   const url = 'mongodb+srv:....;
   
   mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
   ```

## Model

Para que o mongoose saiba persistir, validar os dados, precisamos especificar um **model**, que conterá:

* Fields;
* Validações
* Tipagem;

```javascript
const url = 'mongodb://127.0.0.1:27017/UsuarioSign';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });

const Usuario = mongoose.model('Usuario', {
    nome: {
        type: String,
    },
    email: {
        type: String,
    },
    senha: {
        type: String,
    },
});

// -----------------------------------------------------------
// utilizado para inserir um usuario no BD
const usuarioInsert = new Usuario({
    nome: 'Igor',
    email: 'igorgrv@hotmail.com',
    senha: '123456',
});

usuarioInsert
  .save()
  .then(() => {
    console.log('usuario inserido com sucesso');
  })
  .catch((error) => {
    console.log('erro ao inserir usuario: ' + error);
  });
```

## Validação

Os tipos de validações que o mongoose fornece, estão disponívels [neste documento](https://mongoosejs.com/docs/validation.html#validation);<br>

Junto com o mongoose, existe uma **bilioteca para validações**, chamada [**Validator**](https://www.npmjs.com/package/validator):

```bash
npm i validator@10.9.0
```

Para utilizar o validator, precisamos dar um `require('validator')`, o que nos permitirá utilizar um monte de validações já pré-disponíveis, como:

* `isEmail()`;
* `isCreditCard()`;

E também possui funções para ‘tratar’ os valores:

* `required`;
* `trim`;
* `lowercase`:

```javascript
const mongoose = require('mongoose');
const validator = require('validator');

const url = 'mongodb://127.0.0.1:27017/UsuarioSign';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });

const Usuario = mongoose.model('Usuario', {
  nome: {
    type: String,
    required: [true, 'Necessário informar um nome'],
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Necessário informar um email'],
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email invalido');
      }
    },
  },
  senha: {
    type: String,
    required: [true, 'Necessário informar uma senha'],
    validate(value) {
      if (value < 0) {
        throw new Error('senha invalida');
      }
    },
  },
});
```

## Estruturando as pastas

`src/app/model`:

* `usuario.js`

  ```javascript
  const mongoose = require('mongoose');
  const validator = require('validator');
  
  const Usuario = mongoose.model('Usuario', {
    nome: {
      type: String,
      required: [true, 'Necessário informar um nome'],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Necessário informar um email'],
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email invalido');
        }
      },
    },
    senha: {
      type: String,
      required: [true, 'Necessário informar uma senha'],
      validate(value) {
        if (value < 0) {
          throw new Error('senha invalida');
        }
      },
    },
  });
  
  module.exports = Usuario;
  ```

* `telefone.js`:

  ```javascript
  const mongoose = require('mongoose');
  
  const Telefone = mongoose.model('Telefone', {
    numero: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true,
    },
    ddd: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true,
    },
  });
  
  module.exports = Telefone;
  ```

<br>

`src/db/mongoose`:

* `mongoose.js`

  ```javascript
  const mongoose = require('mongoose');
  
  const url = 'mongodb://127.0.0.1:27017/UsuarioSign';
  mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
  ```

## Rest

Para criar uma API Rest iremos utilizar o **express + nodemon**:

![folder](https://github.com/igorgrv/NotesInGeneral/blob/master/images/foldersEstructure.PNG?raw=true)

`express.js`:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

const routes = require('../app/routes/routes');
routes(app);

module.exports = app;
```

`index.js`:

```javascript
const app = require('./src/config/custom-express');
const port = process.env.PORT || 3000;
require('./src/app/database/mongoose');

app.listen(port, () => console.log('executando servidor porta 3000'));
```

`mongoose.js`

```javascript
const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/UsuarioSign';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
```



### Post

Com o controller e rotas criadas, basta utilizarmos o `mongoose` a nosso favor e realizar um `save()`;

* Uma vez que o `model` está declarado com o `mongoose.model`, este se torna uma **entidade!**

`usuarioController.js`

```javascript
const Usuario = require('../model/usuario');

class UsuarioController {
    static routes() {
        return {
            signup: '/signup',
            signin: '/signin',
            usuarios: '/usuarios',
            usuarioId: '/usuario/:id',
        };
    }

    signup() {
        return async (req, res) => {
            const usuario = new Usuario(req.body);
            try {
                await usuario.save();
                res.status(201).json
            } catch (err) {
                res.status(400).json({mensagem: 'mensagem de erro'}))
            }
        };
    }
}

module.exports = UsuarioController;
```

### Get

`getAll:`

```javascript
usuarios() {
    return async (req, res) => {
        try {
            const usuarios = await Usuario.find({});
            res.status(200).json(usuarios);
        } catch (err) {
            res.status(500).json({ mensagem: 'mensagem de erro' });
        }
    };
}
```

`getOne`:

```javascript
usuario() {
    return async (req, res) => {
        const _id = req.params.id;
        try {
            const usuario = await Usuario.findOne(_id);
            if (!usuario) {
                res.status(500).send({ mensagem: 'usuário não encontrado' });
            }
            res.status(200).json({ usuario });
        } catch (err) {
            res.status(500).json({ mensagem: 'mensagem de erro' });
        }
    };
}
```

## BCryptJS - Criptografando senha

De forma que a senha armazenada não seja exibida no BD sem criptografia, iremos implementar o **bcrypt**.

```bash
npm i bcryptjs@2.4.3
```

Basta darmos um `require` no bycrpt, passar a senha e a quantidade de `salt` (padrão por 8):

```javascript
const bcryptjs = require('bcryptjs');

const testandoBcrypt = async () => {
	const password = 'igor123';
	const hashPassword = await bcryptjs.hash(password, 8);

	console.log('senha: ' + password + ' senhaBcrypt: ' + hashPassword);
    // senha: igor123 
    // Bcrypt: 2a$08$0k4gKD7JVijcNn/OrZADkuzcZtTeJfA7qvduk/bt8hecT7JyESN.O
}

testandoBcrypt();
```

### validar senha criptografada

E se quisermos validar um login, como faremos se não é possível descriptografar? O Bcrypt disponibiliza o **método `compare`** que recebe um a senha sem criptografia e verifica a com criptografia!

```javascript
const testandoBcrypt = async () => {
	const password = 'igor123';
	const hashPassword = await bcryptjs.hash(password, 8);

	const isMatch = await bcryptjs.compare(password, hashPassword);
	console.log(isMatch);
    //true
}
```

### Middleware

Para que ao salvar a senha, seja feito a criptografia, utilizaremos um **middleware do mongoose**, chamado `Schema`!

1. Iremos alterar o model `User`, incluindo todo código dentro de um `schema`:

   ```javascript
   const mongoose = require('mongoose');
   const validator = require('validator');
   
   const usuarioSchema = new mongoose.Schema({
     nome: {
       type: String,
       required: [true, 'Necessário informar um nome'],
       trim: true,
       lowercase: true,
     },
     email: {
       type: String,
       required: [true, 'Necessário informar um email'],
       trim: true,
       lowercase: true,
       validate(value) {
         if (!validator.isEmail(value)) {
           throw new Error('Email invalido');
         }
       },
     },
     senha: {
       type: String,
       required: [true, 'Necessário informar uma senha'],
       validate(value) {
         if (value < 0) {
           throw new Error('senha invalida');
         }
       },
     },
   });
   
   const Usuario = mongoose.model('Usuario', usuarioSchema);
   
   module.exports = Usuario;
   ```

O `Schema` nos possibilita a executar métodos **antes** da ação, com o método `pre`, ou **depois** da ação, com o método `post`;

1. Dentro do modelo `User`, iremos utilizar o método `pre`, que recebe o **tipo de evento** e uma `async function (next)` (sem arrowFunction) ;

2. Dentro da `function` iremos referenciar uma constante `user` para o `this`, que aponta para o objeto;

   ```javascript
   usuarioSchema.pre('save', async function(next) { 
     const user = this;
   })
   ```

3. Com o `user`, temos acesso ao `user.senha` e portanto conseguimos criptografa-la;

   ```javascript
   usuarioSchema.pre('save', async function (next) {
     const user = this;
   
     user.senha = await bcryptjs.hash(user.senha, 8);
     console.log(user.senha);
   
     next();
   });
   ```

## JWT

O JWT (Json Web Token) é utilizado para tokenização!

```bash
npm i jsonwebtoken@8.4.0
```

Podemos gerar o token através do método `sign` do `jsonwebtoken`, passando 2 parâmetros (o primeiro será o parâmetro que deve ser único, como o id, e o segundo será o parâmetro com a chave de segurança):

1. Dentro do método `signin` do controller, iremos solicitar o token, que será um método do modelo `usuario`:

   ```javascript
    signin() {
       return async (req, res) => {
         try {
           const usuario = await Usuario.findByCredentials(req.body.email, req.body.senha);
           const token = await usuario.generateAuthToken();
           res.status(200).json({ usuario, token});
         } catch (err) {
           res.status(400).json(err);
         }
       }
     }
   ```

2. Com o `usuarioSchema` do modelo `Usuario`, iremos criar o método `generateAuthToken()`:

   ```javascript
   usuarioSchema.methods.generateAuthToken = async function () {
     const user = this;
     const token = jwt.sign({ _id: user._id.toString() }, 'accenture');
     return token;
   };
   ```

### Bloqueando rotas sem Token

Para que seja verificado se possui um `Authorization`, teremos de criar um **Middleware**;

1. Criaremos a pasta **middleware** e dentro o arquivo `auth.js`

2. Na rota, iremos dar um `require` no `Auth` e nós métodos que queremos bloquear, passaremos na chamada este `Auth`;

   ```javascript
   const auth = require('../middleware/auth');
   
   module.exports = (app) => {
   	app.post(usuarioRoutes.signup, usuarioController.signup());
   	app.post(usuarioRoutes.signin, usuarioController.signin());
     	app.get(usuarioRoutes.usuarios, auth, usuarioController.usuarios());
     	app.get(usuarioRoutes.usuario, auth, usuarioController.usuario());
   };
   ```

3. No Middleware `auth` iremos implementar o middleware:

   ```javascript
   const auth = async (req, res, next) => {
   	console.log('entrou no auth');
   	next();
   }
   
   module.exports = auth;
   ```

4. Iremos verificar se o `jwt` e o `usuario` estão corretos e também se o `header` possui o `Authorization`:

   ```javascript
   const jwt = require('jsonwebtoken');
   const Usuario = require('../model/usuario');
   
   const auth = async (req, res, next) => {
       try {
           const token = req.header('Authorization').replace('Bearer ', '');
           const decoded = jwt.verify(token, 'accenture');
           const user = await Usuario.findOne({ _id: decoded._id });
           req.user = user;
           if (!user) {
               res.status(400).json({ mensagem: 'Não autorizado' });
           }
   
           next();
       } catch (error) {
           res.status(400).json({ mensagem: 'Não autorizado' });
       }
   };
   
   module.exports = auth;
   ```

   

## Escondendo informações - DTO

Para esconder valores do json, basta:

1. Quando devolvermos o json, passarmos uma função do modelo `user`, como `user.dto()`

   ```javascript
   signin() {
       return async (req, res) => {
         try {
           const usuario = await Usuario.findByCredentials(req.body.email, req.body.senha);
           const token = await usuario.generateAuthToken();
             // passar o usuario.dto()
           res.status(200).json({ usuario: usuario.dto(), token });
         } catch (err) {
           res.status(400).json({ mensagem: 'Usuário e/ou senha inválidos' });
         }
       };
     }
   ```

2. Então basta criarmos o `dto()` no modelo Usuario:

   ```javascript
   usuarioSchema.methods.dto = function () {
     const user = this;
     const userObject = user.toObject();
   
     delete userObject.__v;
   
     return userObject;
   }
   ```

   

## Swagger

Para utilizar o swagger:

```bash
npm i swagger-ui-express@4.0.7
```

