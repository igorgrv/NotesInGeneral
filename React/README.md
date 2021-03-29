# React

## Conceito

React é uma biblioteca javascript para construção de interfaces, que roda no browser (não precisa esperar o servidor)

### Como React atualiza o DOM?

Através de comparação entre o **Antigo virtual Dom** vs **Re-rendered virtual Dom** <img src="/Users/igorromero/NotesInGeneral/React/images/reactUpdateDom.png" alt="reactUpdateDom" style="zoom:50%;" />

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

#### PrevState

Quando utilizamos do `setState` , é disponibilizado 2 parâmetros:

1. `prevState` → que irá conter o valor antes da alteração;
2. `props` → irá conter todas as props da classe;

O `prevState` é útil quando queremos fazer um `counter` por exemplo!

```react

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

### Style

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

#### Inline Style

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

## 1º Assignment

```
TO DO

* Create TWO new components: UserInput and UserOutput
* UserInput should hold an input element, UserOutput two paragraphs
* Output multiple UserOutput components in the App component (any paragraph texts of your choice)
* Pass a username (of your choice) to UserOutput via props and display it there
* Add state to the App component (=> the username) and pass the username to the UserOutput component
* Add a method to manipulate the state (=> an event-handler method)
* Pass the event-handler method reference to the UserInput component and bind it to the input-change event
* Ensure that the new input entered by the user overwrites the old username passed to UserOutput
* Add two-way-binding to your input (in UserInput) to also display the starting username
* Add styling of your choice to your components/ elements in the components - both with inline styles and stylesheets
```

```react
// UserInput.js

import React from 'react';

const UserInput = (props) => {
  return (
    <input type="text" onChange={props.chagingName} value={props.userName}/>
  )
}

export default UserInput;
```

```react
// UserOutput.js

import React from 'react'
import './UserOutput.css';

const UserOutput = (props) => {
  return (
    <div>
      <p>Username: {props.userName}</p>
      <p>Another text</p>
      <p>{props.children}</p>
    </div>
  )
}

export default UserOutput;
```

```css
/* UserOutput.css */

.UserOutput {
  box-shadow: 7px 5px 12px 1px #262626;
  margin: 2rem auto;
  padding: 1rem;
  width: 60%;
}
```



```react
// App.js

import React, { useState } from 'react';

import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

const App = () => {
  const [userName, setUserName] = useState('IgorState');
  const [age, setAge] = useState('24');
  const changeName = (event) => { setUserName(event.target.value) };

  const switchValue = (age) => {
    setUserName('switchNameCalled');
    setAge('25');
  };

  return (
    <div className="App">
      <button onClick={switchValue.bind(this, '25')}>SwitchName</button>
      <UserInput chagingName={changeName} userName={userName} />
      <UserOutput userName={userName} />
      <UserOutput userName={userName}>{age} test</UserOutput>
    </div>
  );
};

export default App;

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

## For

Dado um array:

```react
state = {
  persons: [
    { id: 1, name: 'Igor', age: 25 },
    { id: 2, name: 'Igor2', age: 26 },
    { id:3, name: 'Igor3', age: 27 },
  ],
  showPerson: false,
};
```

Invés de exibirmos dessa forma (chamando cada elemento do array)

```react
showPerson = (
  <div>
    <Person
      name={this.state.persons[0].name}
      age={this.state.persons[0].age}
      click={this.switchingName.bind(this, 'IgorzinhoChildren')}
      change={this.changeNameHandler}
      >
      Testing child elemenet
    </Person>
    <Person name={this.state.persons[1].name} age={this.state.persons[1].age} />
    <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
  </div>
);
```

Podemos utilizar do `map` e reduzir nosso código

* Dentro dos `{ }` iremos acrescentar o `map` onde no map iremos `return` o elemento JSX
  * Temos que adicionar o `key` como uma chave única:

```react
<div>
  {
    this.state.persons.map(person => {
      return (
        <Person 
          name={person.name}
          age={person.age}
          change={this.changeNameHandler}
          key={person.id}
          />
      )
    })
  }
</div>
```

### Event - Array way to change

#### Array

Como exemplo, iremos deletar um elemento que foi gerado pelo  `for` , e a melhor prática é:

* Passar o `index` para a função;
* Como iremos **alterar o array**, a boa prática é:
  * Criar um **array novo** com os dados do array antigo;
  * Alterar o array novo;
  * Igualar o array novo alterado, com o antigo;

```react
deletePerson = (index) => {
  const persons = [...this.state.persons]
  persons.splice(index, 1)
  this.setState({ persons: persons })
}
```

#### Object

Dado o array:

```react
state = {
  persons: [
    { id: 1, name: 'Igor', age: 25 },
    { id: 2, name: 'Igor2', age: 26 },
    { id:3, name: 'Igor3', age: 27 },
  ],
  showPerson: false,
};
```

Como exemplo, iremos alterar o `name` do array `persons`, para isso precisaremos do `event` e do `index`

```react
<div>
  {this.state.persons.map((person, index) => {
    return (
      <Person
        change={(event) => this.changeNameHandler (event, person.id)}
        key={person.id}
       />
    );
  })}
</div>
```

 Na função `changeNameHandler` iremos aplicar a **boa prática de se alterar um objeto**:

1. Precisamos encontrar o index do objeto (poderiamos ter passado para a função o index diretamente) e para isso podemos usar do `findIndex`

   ```react
   changeNameHandler = (event, id) => {
     const personIndex = this.state.persons.findIndex(person => {
         return person.id = id
     })
   }
   ```

2. Com o index em mãos, iremos fazer um **cópia** do objeto que queremos alterar:

   ```react
   const person = this.state.persons[personIndex];
   ```

3. Com o objeto copiado, iremos alterar o `name` desse objeto ao valor digitado:

   ```react
   person.name = event.target.value;
   ```

4. Com o objeto alterado, iremos fazer uma cópia do array inteiro, para que alteremos a cópia do array e não o array do State diretamente:

   ```react
   const persons = [...this.state.persons];
   persons[personIndex] = person;
   
   this.setState( {persons: persons} )
   ```

Alteração completa:

```react
changeNameHandler = (event, id) => {
  const personIndex = this.state.persons.findIndex((person) => {
    return (person.id = id);
  });

  const person = this.state.persons[personIndex];
  person.name = event.target.value;

  const persons = [...this.state.persons];
  persons[personIndex] = person;

  this.setState({ persons: persons });
};


/* MODO ANTIGO = ERRADO

  changeNameHandler = (event) => {
    this.setState({
      persons: [
        { name: event.target.value, age: 25 },
        { name: 'Igor5', age: 26 },
        { name: 'Igor6', age: 27 },
      ],
    });
  };
  
*/
```



## 2º Assignment

```
TO DO

* Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).
* Create a new component (=> ValidationComponent) which receives the text length as a prop
* Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)
* Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).
* Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.
* When you click a CharComponent, it should be removed from the entered text.
```

```react
 // Validation.js

import React from 'react';

const Validation = (props) => {
  let lengthMessage = 'Text too short'
  if (props.length > 5) {
    lengthMessage = 'Text long enough'
  } 

  return <p>{lengthMessage}</p>
}

export default Validation;
```

```react
// Char.js

import React from 'react';
import './Char.css';

const Char = (props) => {
  return (
    <div className="Char" onClick={props.click}>
      <p>{props.character}</p>
    </div>
  );
};

export default Char;
```

```css
/* char.css */
.Char {
  display: inline-block;
  padding: 16px;
  text-align: center;
  margin: 16px;
  border: 1px solid black;
}
```

```react
// LandingPage
import React, { useState } from 'react';
import Validation from '../Validation/Validation';
import Char from '../Char/Char';

const LandingPage = () => {
  const [textEntered, setTextEntered] = useState('');

  const listenForChanges = (event) => {
    setTextEntered(event.target.value);
  };

  const removeCharacter = (index) => {
    const text = [...textEntered];
    text.splice(index, 1);
    const updatedText = text.join('')
    setTextEntered(updatedText)
  };

  let character = textEntered.split('').map((character, index) => {
    return <Char character={character} key={index} click={() => removeCharacter(index)} />;
  });

  return (
    <>
      <input type="text" onChange={(event) => listenForChanges(event)} value={textEntered}/>
      <p>{textEntered.length}</p>
      <Validation length={textEntered.length} />
      {character}
    </>
  );
};

export default LandingPage;

```

## Debugging

### Chrome DevTools

Através do chrome → Dev Tools → Source → conseguimos colocar break points na aplicação (linha 10)

<img src="/Users/igorromero/NotesInGeneral/React/images/reactChrome1.png" alt="reactChrome1" style="zoom:50%;" />



Another way is to use the `debugger` 

```react
const person = (props) => {
 
  debugger
  
  return (
    <div className="Person">
      <h1 onClick={props.click}>
        I'm {props.name} and I'm {props.age} years old
      </h1>
      <p>{props.children}</p>
      <input type="text" onChange={props.change} value={props.name}/>
    </div>
  )
}
```



### React Developer Tools

O Chrome possui outra extensão chamada [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related) que nos permite ter mais informações do componente, como:

* Props;
* Valor em tempo real;
* State;



<img src="/Users/igorromero/NotesInGeneral/React/images/reactDevTool1.png" alt="reactDevTool1" style="zoom:50%;" />

<img src="/Users/igorromero/NotesInGeneral/React/images/reactDevTools2.png" alt="reactDevTools2" style="zoom:50%;" />

## Ex. Refatorando

Dado a estrutura

```
- src
-	-	Person
-	-	-	Person.js
-	-	App.js
-	-	Index.js
```

```react
// App.js
import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Igor', age: 25 },
      { id: 2, name: 'Igor2', age: 26 },
      { id: 3, name: 'Igor3', age: 27 },
    ],
    showPerson: false,
  };

  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((person) => {
      return (person.id = id);
    });

    const person = this.state.persons[personIndex];
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  switchingName = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 25 },
        { name: 'Igor5', age: 26 },
        { name: 'Igor6', age: 27 },
      ],
    });
  };

  deletePerson = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons: persons });
  };

  togglePerson = () => {
    const doesShow = this.state.showPerson;
    this.setState({
      showPerson: !doesShow,
    });
  };

  render() {
    const inlineStyle = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
    };

    let showPerson = null;

    if (this.state.showPerson) {
      showPerson = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                name={person.name}
                age={person.age}
                change={(event) => this.changeNameHandler(event, person.id)}
                key={person.id}
                click={() => this.deletePerson(index)}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Testing App.js</h1>
        <button style={inlineStyle} onClick={this.togglePerson}>
          Toggle Person
        </button>
        <button style={inlineStyle} onClick={this.switchingName.bind(this, 'Igorzinho')}>
          Switch names
        </button>

        {showPerson}
      </div>
    );
  }
}

export default App;
```

Podemos perceber que o `App.js` tem muita responsabilidade, o q significa q precisa ser componetizado!

### Folder structure

```
- src
-	-	Components
-	-	-	Persons
-	-	-	-	Persons.js		→→ Irá conter a lista de pessoas
- - -	-	Person
- - -	-	-	Person.js
-	-	-	Cockpit
-	-	-	-	Cockipit.js		→→ Irá encapsular os dados para o App
-	-	Container
- -	-	App.js
-	- -	Index.js
```

### Start Refactoring

Basicamente, tudo do `App.js` que utilizar o `this.` no novo componente, irá ficar `props`!

```react
// App.js

/*
showPerson = (
  <div>
    {this.state.persons.map((person, index) => {
      return (
        <Person
          name={person.name}
          age={person.age}
          change={(event) => this.changeNameHandler(event, person.id)}
          key={person.id}
          click={() => this.deletePerson(index)}
          />
      );
    })}
  </div>
);
*/

//Refatorando

showPerson = 
  <Persons 
    persons={this.state.persons}
    clicked={this.deletePerson}
    changed={this.changeNameHandler}
    />
```

```react
// Persons.js
import React from 'react'
import Person from './Person/person'

const Persons = (props) => 
  props.persons.map((person, index) => {
    return (
      <Person
        name={person.name}
        age={person.age}
        change={(event) => props.changed(event, person.id)}
        key={person.id}
        click={() => props.clicked(index)}
      />
    );
  });

export default Persons;
```

```react
// App.js
<div className="App">
  <Cockpit 
    switchingName={this.switchingName}
    togglePerson={this.togglePerson}
    inlineStyle={inlineStyle}
    />
  {showPerson}
</div>
```

```react
// Cockpit.js
import React from 'react';

const Cockpit = (props) => (
  <div>
    <h1>Testing App.js</h1>
    <button style={props.inlineStyle} onClick={() => props.togglePerson()}>
      Toggle Person
    </button>
    <button style={props.inlineStyle} onClick={() => props.switchingName('Igorzinho')}>
      Switch names
    </button>
  </div>
);

export default Cockpit;s
```



## Class vs Functional (Hooks)

Classes que extendem Component ou React Hooks?

<img src="/Users/igorromero/NotesInGeneral/React/images/reactClassBasedvsFunct.png" alt="reactClassBasedvsFunct" style="zoom:50%;" />

### this.props - Class

Assim como temos `props` para functional (hooks):

```react
const functional = (props) => {
  // ...
}
```

As class também possuem! Caso seja adicionado no `index.js`  dentro do component `App`  uma propriedade `appTitle`, essa propriedade poderá ser acessada com o `this.props.propName`:

```javascript
// index.js

ReactDOM.render(<App appTitlte="Person Manager" />, document.getElementById('root'));
```

```react
// App.js
<Cockpit
  title={this.props.appTitlte}
  />

// Cockpit.js
const Cockpit = (props) => (
  <div>
    <h3>{props.title}</h3>
    <!-- someOtherComponents -->
  </div>
);
```

## LifeCycle Hooks - for Class

O LifeCycle Hooks é utilizado para o tipo `class` , não exitindo para `functional (hooks)`, portanto os métodos abaixo não funcionaram em `const functional = () => {}`...

### LifeCycle - creation

<img src="/Users/igorromero/NotesInGeneral/React/images/reactLifecycle.png" alt="reactLifecycle" style="zoom:50%;" />

#### constructor

O `constructor(props)` obrigatoriamente, precisa passar o `super(props)`;

* Antigamente era no `constructor` que se setava o `state`

```react
class App extends Components {
  constructor(props) {
    super(props)
    // this.state = {}
  }
}
```

#### getDerivedStateFromProps

O lifeCycle `getDerivedStateFromProps` precisa ser inicializado com o método `static`

```react
static getDerivedStateFromProps(props, state) {
  return state
}
```

#### render

É onde irá renderizar o JSX

#### componentDidMount

```react
componentDidMount() {
  console.log('componentDidMount')
}
```

### LifeCycle - update

<img src="/Users/igorromero/NotesInGeneral/React/images/reactLifeCycleUpdate.png" alt="reactLifeCycleUpdate" style="zoom:50%;" />

#### shouldComponentUpdate

Espera receber um `true` ou `false` , para saber se pode prosseguir com o componente ou não!

* Se retornar false o componente não será exibido, pois irá ser barrado a troca do `state`;

```react
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate called')
    console.log('shouldComponentUpdate nextProps: ' + JSON.stringify(nextProps))
    console.log('shouldComponentUpdate nextState: ' + JSON.stringify(nextState))
    return true;
  }
```

#### componentDidUpdate

Utilizado para fazer o `fetch` de dados do servidor

## LifeCycle - for Functional

### useEffect

Para funções (hooks), o React disponibiliza o método `useEffect` que recebe 2 parâmetros:

* A ação que deverá ser executada para o LifeCycle;
* Qual o lifeCycle que irá ser utilizado;
  * Se for passado um `[]` irá ser **executado somente uma vez**!

```react
const Cockpit = (props) => {
  useEffect(() => {
    console.log('Executado para todo lifeCycle')
  }, []);
  
};
```

#### useEffect Behavior

O comportamento do `useEffect` é dado pelo 2º parâmetro, portanto:

* Altere o comportamento caso `persons` seja atualizado:

  ```react
  const Cockpit = (props) => {
    
    useEffect(() => {
      console.log('Executado quando persons for atualizado')
    }, [props.persons]);
    
  };
  ```

  

## HOC (High Order Component)

O React exige que tenhamo JSX dentro root tags ( `divs, headers, sessions` ) mas e se não quisermos colocar nossos elementos dentro de `divs` ?<br>

Através da criação de **HOC** podemos ajustar esse cenário!

```react
// src/HOC/aux.js
const aux = (props) => props.children;

export default aux;
```

Agora invés de utilizarmos de `divs` importamos o componente **auxiliar**:

```react
// Cockpit.js -- with div
<div>
  <div>
    <h1>Testing App.js</h1>
    <h3>{props.title}</h3>
  </div>
  <div>
    <button style={props.inlineStyle} onClick={() => props.togglePerson()}>
      Toggle Person
    </button>
    <button style={props.inlineStyle} onClick={() => props.switchingName('Igorzinho')}>
      Switch names
    </button>
  </div>
</div>

// Cockpit.js -- with Aux
import Aux from '../../HOC/Aux';

const Cockpit = (props) => {
  return (
    <Aux>
      <h1>Testing App.js</h1>
      <h3>{props.title}</h3>
      <button style={props.inlineStyle} onClick={() => props.togglePerson()}>
        Toggle Person
      </button>
      <button style={props.inlineStyle} onClick={() => props.switchingName('Igorzinho')}>
        Switch names
      </button>
    </Aux>
  );
};
```

Também é possível atribuir mais propriedades a classes HOC, como por exemplo a `classe`:

```react
/*
	<div className="App">
		<h1>Meu Componente</h1>
	</div>
*/

<Aux classes={"App"}>
	<h1>Meu Componente</h1>
</Aux>


// Aux.js
const aux = (props) => {
 <div className={props.classes}>
   {props.children}
 </div>
};
```



### Fragment

Outra maneira sem precisar criar uma nova functional, como `Aux`, seria usar da classe `Fragment`:

```react
import React, { useEffect, Fragment } from 'react';
// import Aux from '../../HOC/Aux';

const Cockpit = (props) => {

  return (
    <Fragment>
      <h1>Testing App.js</h1>
      <h3>{props.title}</h3>
    </Fragment>
  );
};
```

