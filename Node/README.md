# NodeJS

O Node é uma plataforma que foi criada para o **desenvolvimento de aplicações _backend_** utilizando o **JavaScript**! Para iniciar neste mundo, é **necessário baixar o** [NodeJs](https://nodejs.org/en/) e instala-lo, para que seja possível acessarmos via **cmd**. Vamos testar com um `npm -version`.

## Hello World

O Node funciona com arquivos `.js` ou seja, podemos simplesmente:

1. Criar um arquivo, do tipo `.js`;
2. Escrever `console.log('ola mundo');`;
3. Rodar um `node helloworld.js` no terminal e ver o resultado!

Mas e se no nosso código incluíssimos um `alert('oi')`? No Terminal **não iria funcionar!** Pois estamos rodando o código pelo lado do servidor e não pelo do navegador!

## Criando Servidor c/ JavaScript

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

## Iniciando projeto c/ Node

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

## Criando servidor c/ Node

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

   