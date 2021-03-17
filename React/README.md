

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

### Componente Dinâmico - props

Todo componente irá precisar **importar o `React`** para que seja possível retornar um HTML/JSX.

* `props` é o que permite recebermos elementos dinamicamente, para isto utilizamos de `{ }`;
* Se tivermos mais de um elemento HTML, precisamos coloca-lo dentro de `div` ou elementos `root` (`nav, session`)

```react
import React from 'react';

const person = (props) => {
  return (
    <div>
      <h1>I'm {props.name} and I'm {props.age} years old</h1>
			<p>Child element</p>
    </div>
  )
}

export default person;
```

Dentro de `App.js` iremos importar o componente e passar os valores!

```react
import Person from './person';

class App extends Component {
  render() {
    return (
    	<Person name="Igor" age="25" />
    )
  }
}
```

### Children component

E se quisessemos inserir alguma informação no componente filho?

```react
import React, {Component} from 'react';
import Person from './Person'

class App extends Component {
  render() {
    return (
      <Person name="igor" age="25" >
      	Content to the chield
      </Person>
    )
  }
}
```

Para que a mensagem `Content to the chield` seja exibida, precisamos no componente filho `Person` utilizar da **`props.children`**

```react
import React from 'react';

const person = (props) => {
  return(
  	<div>
      <h1>I'm {props.name} and I'm {props.age} years old</h1>
      <p>{props.children}</p>	
    </div>
  )
}
```

### Manipulando props - State

Em alguns cenários iremos querer manipular os valores que passamos para o componente filho.

No React, existe uma propriedade **especial chamada `State`** (para todo componente que `extends Components`), onde nos permite alterar elementos de dentro do componente.

* `State` funciona como um `watch` do Vue, ele irá ficar verificando se houve alguma mudança nas props que foram declaradas, caso houver, irá renderizar o dom novamente!

```react
class App extends Component {
  state = {
    persons: [
      { name: 'Igor', age: 25},
      { name: 'Igor2', age: 26},
      { name: 'Igor3', age: 27}
    ]
  }

}
```

Agora no component `Person` não iremos passar `hardcoded` iremos passar através do state!

```react
import React, { Component } from 'react';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Igor', age: 25},
      { name: 'Igor2', age: 26},
      { name: 'Igor3', age: 27}
    ]
  }

  render() {
    return (
      <div className="App">
        <h1>Testing App.js</h1>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}>
          Testing child elemenet
        </Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} />
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
      </div>
    );
  }
}

export default App;
```

### Events

Lista de eventos → https://reactjs.org/docs/events.html#supported-events

#### onClick

Para atribuir funções e eventos no react, basta utilizarmos do javaScript, mudando apenas de `onclick` → `onClick`

* Não devemos chamar a função passando `()` pois dessa forma irá automaticamente chamar a função quando o react renderizar a página

```react
class App extends Component {   
	switchingName = () => {
    console.log('Event called')
  }

  render() {
    return (
      <button onClick={this.switchingName}>Switch names</button>
    )
  }
}
```

####  setState - alterando State

Se quisermos alterar o `state` precisamos utilizar função `setState()` (proveniente do `Component`). 

* Antes só conseguiriamos alterar o `state` em **Classes que extendem-se Component**, apartir do **`React Hooks`** é possível também manipular as propriedades em classes funcionais.

* `setState` recebe um objeto, exatamente como declarado no `state`:

  ```react
  class App extends Component {
    state = {
      persons: [
        { name: 'Igor', age: 25},
        { name: 'Igor2', age: 26},
        { name: 'Igor3', age: 27}
      ]
    }
    
    switchingName = () => {
      this.setState({
        persons: [
          { name: 'Igor4', age: 25},
          { name: 'Igor5', age: 26},
          { name: 'Igor6', age: 27}
        ]
      })
    }
  
    render() {
      return (
        <button onClick={this.switchingName}>Switch names</button>
  		)
    }
  }
  ```

#### Parâmetros nos eventos

Existem dois modos de passar parâmetros nos eventos:

* Com `bind` 

  ```react
  switchingName = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 25 }
      ],
    });
  };
  
  render() {
    return (
      <button onClick={this.switchingName.bind(this, 'Igorzinho')}>
        Switch names
      </button>
    )
  }
  ```

* Com `arrow function`:

  ```react
  <button onClick={() => this.switchingName('Igorzinho')}>
    Switch names
  </button>
  ```

#### Pai → Filho

Se quisermos fazer com que um evento do pai, seja acionado quando dentro do filho, **precisamos passar o evento como uma `props`** :

```react
// parent element
class App extends Component {
  state = {
    persons: [
      {name:'Igor', age: 25}
    ]
  }

  switchingName = (newName) => {
    this.setState({
      persons: [
        { name:newName, age: 25 }
      ]
    })
  }
  
  render() {
    return (
      <Person 
        name={this.state.persons[0].name} 
        age={this.state.persons[0].age}
        click={this.switchingName.bind(this,'IgorzinhoChildren')}
       >
        Testing child elemenet
      </Person>
    )
  }
}
```



```react
// chield element
import React from 'react';

const person = (props) => {
  return (
      <h1 onClick={props.click}> <!-- Here's the props.click -->
        I'm {props.name} and I'm {props.age} years old
      </h1>
    )
}
```



#### 2 Ways binding

De pai → filho e filho → pai é algo comum entre components, uma vez que um conversa com o outro.

* Através do evento `onChange` iremos escuta-lo através de uma `props`

```react
// chield component
const person = (props) => {
  return (
  	<div>
    	<h1>I'm {props.name}</h1>
      <input type="text" onChange={props.change} value={props.name} />
    </div>
  )
}
```

* No `parent Component` iremos ter criar uma nova `function` que por default receber um `(event)`

```react
changeNameHandler = (event) => {
  this.setState({
    persons: [
      { name: event.target.value, age: 25 },
    ],
  });
}

render() {
  return (
    <Person 
      name={this.state.persons[0].name} 
      age={this.state.persons[0].age}
      click={this.switchingName.bind(this,'IgorzinhoChildren')}
      change={this.changeNameHandler}
      >
      Testing child elemenet
    </Person>
  )
}
```



### React Hooks - useState

A função `setState` fica disponível para componentes que extendem `Components` mas e se quisermos usar em `functional components` ?

* React Hooks se trata de várias funções que foram adicionadas, onde uma delas é o próprio **`useState`**

```react
// import React, { Component } from 'react'
import React, { useState } from 'react'
```

Para `functional components` não iremos declarar um `State` com todos os objetos, mas sim iremos declarar **para cada objeto** um `useState`, que devolve 2 arrays:

* 1º array → Devolve o objeto que foi passado dentro do `useState`;
* 2º array → Deixa disponível o objeto a ser **alterado**;

```react
import React, { useState } from 'react'

const app = () => {
  const [personState, setPersonState] = useState({
    persons: [
      { name: 'Igor', age: 25},
      { name: 'Igor2', age: 26},
      { name: 'Igor3', age: 27}
    ]
  });
}
```

Deste modo, não iremos referenciar mais com o `this` os valores de `persons` mas sim com `personState`:

```react
  return (
    <div className="App">
      <!--
			<Person name={this.state.persons[1].name} age={personState.persons[1].age} />
			-->
      <Person name={personState.persons[2].name} age={personState.persons[2].age} />
    </div>
  );
```

O mesmo vale para as funções, não iremos utilizar do `setState` mas sim do 2º array do `useState`, neste caso é `setPersonState`

```react
const app = () => {
  const [personState, setPersonState] = useState({...})
  /* 
  switchingName = () => {
    this.setState({
      persons: []
    })
  } 
  */
  const switchingName = () => {
      setPersonState({
        persons: [ ... ]
      })
  }

  return (
		<button onClick={switchingName}>Switch names</button>
  )
}
```

Sendo assim, um `functional component` com `useState` ficará:

```react
import React, { useState } from 'react';

const app = () => {
  const [personState, setPersonState] = useState({
    persons: [
      { name: 'Igor', age: 25},
      { name: 'Igor2', age: 26},
      { name: 'Igor3', age: 27}
    ]
  });
  
  // function to change the personState object
  const switchingName = () => {
    setPersonState({
      persons: [
        { name: 'Igor4', age: 25},
        { name: 'Igor5', age: 26},
        { name: 'Igor6', age: 27}
      ]
    })
  }
  
  return (
  	<div>
    	<button onClick={switchingName}> Switch names </button>
      <Person name={personState.persons[1].name} age={personState.persons[1].age} />
    </div>
  )
}

export default app;
```



### Stateless vs Stateful components

**Stateless** components → Components que não utilizam do `setState/useState` , components como o `Person`, que não altera os valores (componentes visuais);

* O ideal é ter + components **stateless** !

**Stateful** components → Componentes containers, que irão utiizar do `setState/useState` (não é ideal ter muitos componentes desse modelo, pois pode afetar a aplicação)

## Style

O React nos permite criar um arquivo `css` apartado do arquivo `js` para que seja simplesmente importado!

```css
.Person {
  width: 60%;
  margin: 1rem auto;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 16px;
  text-align: center;
}
```

Devemos ter atenção ao utilizar `class` , no react **DEVEMOS UTIIZAR `className`**!

```react
import './Person.css'
const person = (props) => {
  return (
    <div className="Person">
      <h1 onClick={props.click}>
        I'm {props.name} and I'm {props.age} years old
      </h1>
    </div>
  )
}
```

### Inline Style

React permite que os estilos sejam passados através de funções, diretamente no `js`:

```react
render() {
  const inlineStyle = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
  };

  return (
    <button style={inlineStyle}>
      Switch names
    </button>
  )
}
```



## Condicionais

### If

#### Função ternária

Através do javascript, podemos usar uma **função ternaria**:

```react
class App extends component {
  state = {
    showPerson: false
  }

	togglePerson = () => {
    const showPerson = this.state.showPerson;
    this.setState({
      showPerson: !showPerson
    })
  }
  
  render() {
    return (
    	{ 
        this.state.showPerson ?
       		<div>
        		<h1>if true shows persons list</h1>
        	</div>
        : null
      }
    )
  }
}
```

#### Elegant way

O modo mais elegante é através de uma função interna no `render()` que irá conter todo o elemento que será exibido ou não;

```react
render() {
  let showPerson = null;

  if (this.state.showPerson) {
    showPerson = (
      <div>
        <h1>componente to be displayed</h1>
      </div>
    );
  }
  
  return (
  	{showPerson}
  )
}
```

