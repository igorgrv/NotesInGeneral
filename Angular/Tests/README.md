# Testes em Nodejs

Para realizar testes, devemos seguir um padrão de especificações:

* Testar funções individuais;
* Um teste deve ser escrito para cada teste de caso para uma função;
* Grupo de testes podem ser combinados para test suites para melhor organização;
* Testes devem ser automatizados;



## Simples Exemplo de Teste

Código em produção:

```javascript
function str_length(theString){
    return theString.length;
}
```

Teste do código:

```javascript
it('returns the size of the string',
  function(){
   testString = '1';					//Setup -> onde se coloca a variavel
   result = str_length(testString);		//Action -> onde se chama a função q sera testada
   expect(result).to.equal(1);			//Assert -> onde se valida as funções
});
```

## Mocha & Chai

Mocha é um dos **frameworks de teste unitário** para javascript que tem como utilidade **testar scripts**;

Chai é uma biblioteca de **Assert** que funciona bem com o Mocha.

* Para utilizar Mocha & Chai é necessário ter o Nodejs instalado;

### Criando projeto Nodejs com Mocha & Chai

Para **criar um projeto** `Nodejs`, iremos criar uma pasta e instanciar o projeto com:

​	* **A PASTA** DEVE SER CRIADA COM O **NOME ‘TEST’**;

```
npm init -y
```

Iremos ter um json como resposta:

```json
{
  "name": "Tests",
  "version": "1.0.0",
  "description": "Para realizar testes, devemos seguir um padrão de especificações:",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Instalar `mocha` e `chai`:

```
npm i --save-dev mocha chai
```

Criar um arquivo `.js` e começar a fazer testes!

1. Para instanciar o `chai` utilizamos um `require('chai')`;
2. Depois basta declarar como `it('nome do teste', function() {})`  para cada função a ser testada

```javascript
var expect = require('chai').expect;

it('testando se é verdadeiro', function(){
    expect(true).to.equals(true);
})
```

### Executando Mocha - VSCode

Para ajudar na execução de testes com Mocha, é utilizado o **suplemento `Mocha Teste Explorer `**. Após ser feita a instalação devemos ir em `View > Open View > Test`, será automaticamente adicionado os testes criados!<br>

Dentro do projeto, devemos alterar o `package.json`, adicionando o `mocha` em `test`:

```json
{
  "name": "mocha_tests",
  "version": "1.0.0",
  "description": "Para realizar testes, devemos seguir um padrão de especificações:",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
```



### Executando Mocha - Terminal

Com o Mocha e Chai instalado, podemos executar o comando indo direto no diretório do Mocha, com `./node_mudules/mocha/bin/mocha` e será executado todos os testes.<br>

Caso queira executar **um teste específico**:

```
./node_modules/mocha/bin/mocha pastaTeste/*1.js

./node_modules/mocha/bin/mocha test/*1.js
```

## Describe - Test Suit

O `Describe` é utilizado para agrupar testes, sendo muito utilizado para separar blocos de testes!

```javascript
describe('suite de testes 1', function(){
	it('espera que o resultado seja true', function(){
		expect(true).to.be.equal(true);
	});
});

describe('suite de testes 2', function(){
	it('espera que o resultado seja true2', function(){
		expect(true).to.be.equal(true);
	});
});
```

### Before/After & BeforeEach/AfterEach

Em conjunto com o `Describe` temos:

* O `before` e `after`, que como o nome diz é executado **uma vez** dentro do bloco describe;
* O `beforeEach` e `afterEach` é executado a cada `it`, ou seja, a cada teste;

```javascript
describe('suite de testes 1', function(){
	before('codigo executado uma vez antes dos testes', function(){
		console.log('executando before');
	});
	after('code executado por último uma vez', function(){
		console.log('executando after');
	});
	it('espera que o resultado seja true', function(){
		expect(true).to.be.equal(true);
	});
    it('segundo teste', function () {
		expect(true).to.be.equal(true);
	});
});

describe('suite de testes 2', function () {
	it('espera que o resultado seja true', function () {
		expect(true).to.be.equal(true);
	});
});


//resultado
suite de testes 1
executando before
    √ espera que o resultado seja true
	√ segundo teste
executando after

suite de testes 2
	√ espera que o resultado seja true
```

Exemplo com `beforeEach`:

```javascript
var expect = require('chai').expect;

describe('suite de testes 1', function(){
	before('codigo executado uma vez antes dos testes', function(){
		console.log('executando before');
	});
	after('code executado por último uma vez', function(){
		console.log('executando after');
	});
	beforeEach('beforeEach', function (){
		console.log('beforeEach function');
	});
	it('espera que o resultado seja true', function(){
		expect(true).to.be.equal(true);
	});
	it('segundo teste', function () {
		expect(true).to.be.equal(true);
	});
});

describe('suite de testes 2', function () {
	it('espera que o resultado seja true', function () {
		expect(true).to.be.equal(true);
	});
});


//RESULTADO
suite de testes 1
    executando before
    beforeEach function
        √ espera que o resultado seja true
    beforeEach function
        √ segundo teste
    executando after

suite de testes 2
    √ espera que o resultado seja true
```

## CHAI - Entendimentos

A biblioteca Chai, possui métodos bem parecidos com os utilizados pelo Junit, como o `assert`:

```javascript
describe('suite de testes 1', function(){
	it('testando assert', function(){
		assert(false,'assert que falha');
	});
	it('testando assert.isTrue', function () {
		assert.isTrue(true, 'assert é verdadeiro');
	});
	it('testando assert.isTrue', function () {
		const array = [];
		assert.isArray(array, 'elemento é um Array');
	});
	it('testando assert.equal', function () {
		const number1 = 1;
		assert.equal(number1, 1);
	});
});
```

outros asserts que podem ser combinados são:

```javascript
to, be, been, is, that, which, has, have, with, at, of, same, but, does

//exemplo
expect(result).to.be.that.which.is.equal(true);
```

Podemos até mesmo lançar exceções:

```javascript
expect(toThrow).to.throw();
```

## Done & Await

Quando temos requisições que são **assíncronas**, precisamos utilizar de outros métodos para que não tenhamos problemas com o tempo de execução. <br>

Um parâmetro muito utilizado é o **`done()`**. Quando o Mocha recebe um `done`, ele sabe que o teste não pode ser completado até ter o done ser chamado de volta;

```javascript
//Função
function myAsyncFunction(callback){
	setTimeout(function(){
		callback("hello");
	},5000);
}

module.exports = {
	myAsyncFunction
}

//Testando a função
var expect = require('chai').expect;
const functions = require('../functions/mocha_functions');

describe('Suit de testes', function(){
	it('testando função assincrona', function(done){
		functions.myAsyncFunction(function(str){
			expect(str).to.equal("hello");
            done();
		});
	});
});
```

