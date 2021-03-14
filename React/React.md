

# React

## Conceito

React é uma biblioteca javascript para construção de interfaces, que roda no browser (não precisa esperar o servidor)

## Getting started

Sem utilizar diretamente a IDE, podemos importar as bibliotecas:

```
Babel → Preprocessor, permite utilizar novas sintaxes do js

https://unpkg.com/react/umd/react.development.js → fica a lógica do react
https://unpkg.com/react-dom/umd/react-dom.development.js → lib para renderizar no DOM
```

O react utiliza de forma separada o **html, css** e **lógica (js)**:

### Sem react

<img src="/Users/igorromero/Library/Application Support/typora-user-images/Screen Shot 2021-03-11 at 22.13.08.png" alt="Screen Shot 2021-03-11 at 22.13.08" style="zoom:50%;" />

```html
<!-- test.html -->
<div class="person">
  <h2>Name: Igor</h2>
  <p>Age: 25 </p>
</div>

<div class="person">
  <h2>Name: Igor2</h2>
  <p>Age: 25 </p>
</div>
```

 ### Com react

Com react, devemos utilizar do javascript + babel, portanto devemos utilizar de `functions` passando o conteúdo do HTML no `return ()`;

```react
function Person() {
  return (
  	<div class="person">
      <h2>Name: Igor2</h2>
      <p>Age: 25 </p>
    </div>
  );
}
```

Para renderizar no Dom, utilizamos do `ReactDOM.render` passando:

1. Nome do Componente;
2. Identificador da região que será renderizado no html;

```react
ReactDOM.render(<Person />, document.querySelector('#p1'));
```

Portanto o arquivo final:

```react
// test.js
function Person() {
  return (
   	<div class="person">
      <h2>Name: Igor2</h2>
      <p>Age: 25 </p>
    </div>
  );
}

ReactDOM.render(<Person />, document.querySelector('#p1'));
```

```html
<!-- test.html -->
<div id="p1"></div>
```

#### Passando parâmetros

Para que o componente seja dinâmico é necessário passar como parâmetros, chamados `props`;

* O que for incluido no `render` ficará disponível para `function`

```react
function Person(props) {
  return (
   	<div class="person">
      <h2>Name: { props.name }</h2>
      <p>Age: { props.age } </p>
    </div>
  );
}

ReactDOM.render(<Person name="Igor" age="25"/>, document.querySelector("#p1"));
ReactDOM.render(<Person name="Igor2" age="25"/>, document.querySelector("#p2"));
```

ou, melhorando:

```react
function Person(props) {
  return (
   	<div class="person">
      <h2>Name: { props.name }</h2>
      <p>Age: { props.age } </p>
    </div>
  );
}

var app = (
  <div>
     <Person name="Igor" age="25"/>
    <Person name="Igor2" age="25"/>
  </div>
)

ReactDOM.render(app, document.querySelector("#app"));
```



## Javascript ES6

### Var - Const - Let

**Antes:**

`var` → mais comum usado em versões antigas do JS;

**Depois:**

`const` → utilizado em caso de **não alterar** mais a variável;

`let` → nova `var` para o ES6

```javascript
var myName = "Igor"
console.log(myName) //Igor

myName = "Igor2"
console.log(myName) //Igor2

//-------------------------
const myName = "Igor"
console.log(myName)

myName = "Igor2"
console.log(myName) //ERRO, não permite ser alterado
```



### Arrow function

Antes:

```javascript
function myFnc(etc) {
  console.log(etc);
}

myFnc('hello world');
```

Depois:

```javascript
const myFnc = () => {
  console.log(etc);
}

myFnc('hello world');
```

### Import / Export

<img src="/Users/igorromero/NotesInGeneral/React/images/react2.png" alt="react2" style="zoom:50%;" />

Existem dois tipos de **export**:

* `export default` permite que o `import` tenha qualquer nome;
* `export` obriga o uso de `{ }`  no `import`com o nome da `const`;
  * É possível `import { const as myConstName } from './test.js' `



### Class

<img src="/Users/igorromero/NotesInGeneral/React/images/reactClass.png" alt="reactClass" style="zoom:50%;" />

```javascript
class Human {
  constructor() {
    this.gender = "Male";
  }
  displayGender() {
    console.log(this.gender)
  }
}

class Person extends Human {
  constructor() {
    super();
    this.name = "Igor";
  }
  displayName() {
    console.log(this.name)
  }
}

const igor = new Person();
igor.displayName();
igor.displayGender();
```

### Class ES7

Com Babel, não é necessário passar o `constructor` nem mesmo `this` !

<img src="/Users/igorromero/NotesInGeneral/React/images/reactClass2.png" alt="reactClass2" style="zoom:50%;" />

```javascript
class Human {
  gender = "Male";
  
  displayGender = () => {
    console.log(this.gender)
  }
}

class Person extends Human {
  name = "Igor";
  
  displayName() {
    console.log(this.name)
  }
}

const igor = new Person();
igor.displayName();
igor.displayGender();
```

### ... 3 dots

<img src="/Users/igorromero/NotesInGeneral/React/images/react3dots.png" alt="react3dots" style="zoom:50%;" />

O operator `...` possui dois tipos de uso:

* `Spread` → faz com que seja **acrescentado** os elementos a um **novo array** ou a um **novo objeto**;

  ```javascript
  oldArray = [1,2,3];
  console.log(oldArray) // [1, 2, 3]
  
  newArray = [...oldArray,4,5]
  console.log(newArray) // [1, 2, 3, 4, 5]
  
  // serve para objetos também
  const person = {
    name: "name"
  };
  
  const newPerson = {
    ...person,
      age: 28
  }
  
  console.log(newPerson);
  /* [object Object] {
    age: 28,
    name: "igor"
  } */
  ```

* `Rest` → utilizado em uma `function` serve para demonstrar que não sabemos quantos parâmetros esta por vir

  ```javascript
  const myFnc = (...args) => {
    return args.sort();
  }
  ```

### Copying or pointing?

Para o modelo abaixo, estamos **apontando** o objeto `Person` para `secondPerson` (não estamos copiando!), portanto casa `person` tenha o atributo trocado, `secondPerson` tbm terá o atributo trocado

```javascript
const person = {
  name: 'Igor'
}

const secondPerson = person
console.log(secondPerson)
/* [object object]: {
			name: "Igor"
	}*/

person.name = "Igor2"
console.log(secondPerson)
/* [object object]: {
			name: "Igor2"
	}*/
```

Agora caso queiramos **COPIAR** o objeto, devemos utilizar do `spread`(3 dots `...`)!

```javascript
const person = {
  name: 'Igor'
}

const secondPerson = {
  ...person
}
```

### Map

A função `map` irá **percorrer cada elemento do Array** e irá então **criar um NOVO array**!

* Devemos utilizar do `return` para ir acrescentando cada elemento no array

```javascript
const numbers = [1, 2, 3];
const doubleNumArray = numbers.map( (num) => {
  return num * 2;
});
```



## 1º Project - create-react-app

Para iniciar um projeto React, utilizaremos do pacote `create-react-app`:

```bash
npm install create-react-app -g

cd yourProjectFolder
create-react-app projectName --scripts-version 1.1.5

yarn start
```

### Folder Scructure

* `index.js` → irá somente declarar um componente, o  `App.js`

* `app.js` → Componente global → irá carregar os demais componentes

  * `extends Component` é uma das formas de declarar um componente;
  * **TODO CMPT** irá precisar importar o `React`, devido ao react interpretar as sintaxes HTML como um **JSX**

  ```'react
  import React, { Component } from 'react';
  import './App.css';
  
  class App extends Component {
    render() {
      return (
        <div className="App">
          <h1>Testing App.js</h1>
        </div>
      );
    }
  }
  
  export default App;
  ```

### 1º Componente Dinâmico

