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



### Object

#### Object.keys

As vezes iremos precisar extrair as `keys` de um objeto e para isso o `Object.keys(yourObject)` recebe seu objeto e o extrai para um array

```react
const ingredientsState = useState({
  salad: 1,
  bacon: 1,
  cheese: 2,
  meat: 2
})

let transformedIngredients = Object.keys(props.ingredients);

/*
 transformedIngredients = ["salad", "bacon", "cheese", "meat"]
*/
```

#### Object values → Array

Considerando o exemplo acima, dado um objeto:

```react
const ingredientsState = useState({
  salad: 1,
  bacon: 1,
  cheese: 2,
  meat: 2
})
```

Queremos exibir um array como:

```json
[
  [salad],
  [bacon],
  [cheese, cheese]
  [meat, meat]
]
```

Para isso fazemos uma combinação de `Object.array` com `map`:

```react
const transformedObject = Object.keys(props.ingredientes)
	.map( ingredientKey => {
    return [...props.ingredientes(ingredientKey)].map( (_,i) => {
      return <p key={ingredientKey+i}>
      	{ingredientKey}
      </p>
    })
  })
```

### Array

#### Reduce → Initial value

Em alguns cenários, vamos querer que o Array tenha um valor inicial caso nenhum dado seja passado, para isso podemos usar o método `reduce`, que recebe 2 parâmetros:

* 1º parâmetro recebe o `previousValue` e o `currentValue`;
* 2º parâmetro recebe o valor default caso não exista nada.

```react
const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  }).reduce((previousVal, currentVal) => {
    return previousVal.concat(currentVal)
  }, []);
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

### Props

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

#### Children component

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

#### Prop-types

É possível validar o tipo de `props` que está sendo passado através do pacote `prop-types`:

```bash
npm i prop-types
yarn add prop-types
```

Para isso, no final da class/function iremos pegar o `nome.PropTypes` e como um objeto, iremos fazer as validações, como:

* `PropType.string`
* `PropType.isRequired`
* `PropTypes.func`
* `PropTypes.number` 

```react
import React from 'react';
import './Person.css'
import PropTypes from 'prop-types';

const person = (props) => {
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

person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  change: PropTypes.func,
  age: PropTypes.number
}

export default person;
```

Caso a propriedade seja passada incorretamente, no console irá mostrar o erro

### State

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

####  Class - setState - alterando State

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

O `prevState` é útil por boa prática, para quando queremos fazer um `counter` por exemplo, sem precisar alterar o `state` atual!

```react
state = {
  changeCounter: 0
};

myFunction = () => {
  this.setState((prevState, props) => {
    return { 
      changeCounter: prevState.changeCounter + 1
    }
	});
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

#### PrevStates - boas praticas

Existem alguns modos de se alterar o **estado** de um atributo.

1. Exemplo - declarando valor a valor

   ```react
   const test = () => {
     const [title, setTitle] = useState('');
     const [name, setName] = useState('');
     const [age, setAge] = useState(0);
     
     const titleChangeHandler = (event) => {
       setTitle(event.target.value)
     }
     const nameChangeHandler = (event) => {
       setName(event.target.value)
     }
     const ageChangeHandler = (event) => {
       setAge(event.target.value)
     }
   }
   ```

2. Exemplo - através objeto

   ```react
   const test = () => {
     const [userInfo, setUserInfo] = useState({
       title: '',
       name: '',
       age: 0
     });
     
     const titleChangeHandler = (event) => {
       setUserInfo({
         ...userInfo,
         title: event.target.value
       })
     }
     const nameChangeHandler = (event) => {
       setUserInfo({
         ...userInfo,
         name: event.target.value
       })
     }
     const ageChangeHandler = (event) => {
       setUserInfo({
         ...userInfo,
         age: event.target.value
       })
     }
   }
   ```

3. Exemplo - **PrevState** melhor prática

   ```react
   const test = () => {
     const [userInfo, setUserInfo] = useState({
       title: '',
       name: '',
       age: 0
     });
     
     const ageChangeHandler = (event) => {
       setUserInfo((prevState) => {
         return { ...prevState, age: event.target.value}
       })
     }
   }
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

#### More than 1 class

* Ex.:

  ```react
  <button className="myClass mySecondClass"></button>
  ```

Para que o cenário acima seja possível, podemos fazer através de Arrays!

```react
import classes from './Button.css'

const myFnc = () => {
  return <button className={[classes.myClass, classes.mySecondClass].join(' ')}></button>
}
```

Caso a segunda classe venha de uma `props`:

```react
import classes from './Button.css'

const myFncFromProps = (props) => {
  return <button 
           className={[classes.myClass, classes[props.type]].join(' ')}>
  </button>
}
```

#### Assets

A pasta `assets` deve estar dentro de `src` e todo arquivo a ser importado do `assets` deve ser importado como um arquivo `css`!

```react
import png from '../assets/my-logo.png';

const logo = () => {
  <img src={png} />
}
```

#### Style convencional

Por padrão, o CSS é importado como um componente

```react
import classes from './header.module.css';
```

```css
.header {
  background-color: red;
}

.h1-com-traco {
  background-color: red;
}
```

E então através do `className` é chamado a class:

```react
import classes from './header.module.css';

const header = () => {
  return <header className={classes.header}>
  	<h1 className={classes['h1-com-traco']}>myHeader</h1>
  </header>
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

Utilizado para fazer o `fetch` de dados do servidor:

```react
import axios from 'axios';

class httpRequest extends Components {
  componentDidUpdate () {
    axios.get('minhaUrl')
    	.then(response => {
      	console.log(response)
    })
  }
}
```



## UseEffect

Para funções (hooks), o React disponibiliza o método `useEffect` que recebe 2 parâmetros:

* A ação que deverá ser executada para o LifeCycle;
* Qual o lifeCycle que irá ser utilizado;
  * Se for passado um `[]` irá ser **executado somente uma vez**!

```react
import React, { useState, useEffect } from 'react';

function Exemplo() {
  const [count, setCount] = useState(0);

  // Similar ao componentDidMount e componentDidUpdate:
  useEffect(() => {
    // Atualiza o titulo do documento usando a API do browser
    document.title = `Você clicou ${count} vezes`;
  });

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>
        Clique aqui
      </button>
    </div>
  );
}
```

```react
const Cockpit = (props) => {
  useEffect(() => {
    console.log('Executado UMA vez para todo lifecycle')
  }, []);
  
};
```

### useEffect Behavior

O comportamento do `useEffect` é dado pelo 2º parâmetro, portanto:

* Altere o comportamento caso `persons` seja atualizado:

  ```react
  const Cockpit = (props) => {
    
    useEffect(() => {
      console.log('Executado quando persons for atualizado')
    }, [props.persons]);
    
  };
  ```

### memo - ShouldComponentUpdate for Hooks

Para ter o lifeCycle `shouldComponentUpdate` para function class, temos o `React.memo`! Para implementa-lo, devemos fazer o assign a uma `const` onde iremos checar se a `props` anterior é igual a corrente:

```react
// dada a props.show
// irá atualizar somente se o antes e o depois forem igual
const showIsEqual = (prevModal, nextModal) => prevModal.show === nextModal.show;

const modal = (props) => {
  return <Backdrop show={props.show} clicked={props.modalClosed} />
};

export default React.memo(modal, showIsEqual);
```



### Debounce

Invés de realizar o **validações** de um form através do `onChange` (pq a cada letra digitada irá fazer com que seja verificado), é possível utilizar de `useEffects` + `setTimeout()` para fazermos o famoso **debounce** !

Ex. com `onChange`:

```react
const login = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  
  const emailChangeHandler = (event) => {
		console.log('with OnChange'); //irá ser disparado para cada letra
    setEnteredEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  };

  return {
    <form>
      <input
        type="email"
        id="email"
        value={enteredEmail}
        onChange={emailChangeHandler}
        />
      <Button type="submit" className={classes.btn} disabled={!formIsValid}>
        Login
      </Button>
    </form>

  }
}
```



Ex. com `useEffect`:

* Tudo que for dentro do `return` irá ser executado ANTES do que está fora, ou seja, podemos fazer um `clearTimeout` para impedir de cada letra ficar sendo executada

```react
const login = () => {
  const [enteredEmail, setEnteredEmail] = useEffect('');
  const [isFormValid, setIsFormValid] = useEffect(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('irá rodar a cada vez que for pausado');
      setFormIsValid(enteredEmail.includes('@');
    }, 500);

    return () => {
      clearTimeout(timer);
      console.log('Irá rodar a todo momento');
    };
  }, [enteredEmail]);
}
```



## UseReducer

### Quando usar

Precisa validar um valor e também lidar com o valor digitado?

Ex.:

```react
const [enteredEmail, setEnteredEmail] = useEffect('');
const [isEmailValid, setIsEmailValid] = useEffec(false);

const validateEmailHandler = () => {
  setEmailIsValid(enteredEmail.includes('@'));
};

const emailChangeHandler = (event) => {
  setEnteredEmail(event.target.value);
};
```

Está gerenciando outros `useEffects` em um mesmo `state`?

Ex.:

```react
const [enteredEmail, setEnteredEmail] = useEffect('');
const [isEmailValid, setIsEmailValid] = useEffec(false);
const [validForm, setValidForm] = useEffect(false);

const validateEmailHandler = () => {
  // enteredEmail pode não ter sido inicializado ainda, oq pode dar problema
  setEmailIsValid(enteredEmail.includes('@'));
};

const emailChangeHandler = (event) => {
  setEnteredEmail(event.target.value);
  
  // formIsValid depende de valores dos states enteredEmail && enteredPassword
  setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
};
```



### Como usar

O `useReducer` serve principalmente para os casos acima, onde um state depende de outro, ou com um state está relacionado com o outro!

<img src="/Users/igorromero/NotesInGeneral/React/images/reactUseReducer.png" alt="reactUseReducer" style="zoom: 25%;" />

* `state` → é o nome do state comum;
* `dispatchFn` → funciona como um `setState`, será utilizado para despachar o valor do `state`;
* `reducerFn` → é onde ficará a lógica que irá alterar o `state` , essa function recebe o `prevState` e uma `action`
* `initialState` → geralmente um objeto, onde no ex. acima irá ter o `enteredEmail` e `emailIsValid`;

### Exemplo

Dado o modelo sem reducer:

```react
const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setFormIsValid(enteredEmail.includes('@'));
  };
  
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };
  
}
```



Aplicando o reducer, parte 1 (aplicando o `state`):

*   todo lugar q espera o `enteredEmail`, irá receber `emailState.value`;
*   todo lugar q faz validações do `enteredEmail` (como `.includes(@)`) irá receber `emailState.isValid`;

```react
// emailReducer é uma função q não depende do component function (login)
// irá retornar o valor default declaro no useReducer
const emailReducer = (prevState, action) => {
  return {value: '', isValid: false}
}

const login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false})
  
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    // setFormIsValid(enteredEmail.includes('@'));
    setFormIsValid(emailReducer.isValid);
  };
  
  const validateEmailHandler = () => {
    // setFormIsValid(enteredEmail.includes('@'));
    setEmailIsValid(emailReducer.isValid);
  };
  
  const submitHandler = (event) => {
    event.preventDefault();
		// props.onLogin(enteredEmail, enteredPassword);
    props.onLogin(emailReducer.value, enteredPassword);
  };
}
```



Aplicando o `dispatchFn` e `reducerFn`:

* Todo lugar que utilizava do `setEnteredEmail` irá utilizar do `dispatchEmail` que por sua vez normalmente é declaro como um objeto, que irá passar:
  * um `type`, como um identificador para o `emailReducer`;
  * um `val`, para o `emailReducer` fazer a lógica;

```react
dispatchEmail({type: 'USER_INPUT', val: event.target.value});
```

* O `dispatchFn` aciona o `reducerFn` toda vez q é utilizado

```react
const emailReducer = (prevState, action) => {
  if(action.type === 'USER_INPUT')
    return {value: action.val, isValid: action.val.includes('@')};
  return {value: '', isValid: false};
}

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false})
  
  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(emailReducer.isValid && enteredPassword.trim().length > 6);
  };

}
```

Aplicando o `prevState`:

* Em alguns cenários, será necessário utilizar o valor antigo (valor sem ter sido alterado), como no caso do `onBlur`

```react
const emailReducer = (prevState, action) => {
  // codigo omitido
  
  if(action.type === 'INPUT_BLUR')
    	return {value: prevState.value, isValid: prevState.value.includes('@')}
  return {value: '', isValid: false}
}

const login = (props) => {
  
  //codigo omitido
  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR', val: emailReducer.isValid });
  };
}
```



### Melhor debounce

Uma vez que o form está com os campos validados, podemos fazer um melhor uso do `debounce` e executar somente quando o status `isValid` é alterado!

1. Usaremos do ES8 e capturar o objeto `isValid` do `emailState`, passando um `alias` para diferenciar o email do password

   ```react
   const { isValid: emailIsValid} = emailState;
   const { isValid: passwordIsValid} = passwordState;
   
   useEffect( () => {
     const timer = setTimeout(() => {
       setFormIsValid(emailIsValid && passwordIsValid)
     }, 500);
     
     return () => {
       clearTimeOut(timer)
     }
   }, [emailIsValid, passwordIsValid])
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

### Portals

Geralmente quando criamos um `modal` queremos q o mesmo esteja no início do HTML (para nível de organização), para que seja feito isso, é utilizado **Portals** !

1. No `index.html` crie uma `div` que irá representar onde ficará o conteúdo;

   ```html
     <body>
       <noscript>You need to enable JavaScript to run this app.</noscript>
       <div id="overlays"></div> <!-- nova Div -->
       <div id="root"></div>
   ```

2. Com a `div` criada, no componente `Modal`, precisaremos importar `ReactDOM`

   ```react
   import ReactDOM from 'react-dom';
   ```

3. Utilizar da função `ReactDOM.createPortal`, que recebe dois parâmetros:

   1.  Componente;
   2. Onde irá ser renderizado

   ```react
   const portalElement = document.getElementById('overlays');
   
   const Modal = (props) => {
     return <Fragment>
     	{ReactDOM.createPortal(<Backdrop />, portalElement)}
       {ReactDOM.createPortal(<ModalOverlay >{props.children}</ModalOverlay>, portalElement)}
     </Fragment>
   }
   
   export default Modal;
   ```

   

## Refs

### Class component

`refs` é como um `document.querySelector` que onde for aplicado, poderá manipular o elemento HTML.

* Quero que o último input seja tenha um `focus`!

  * 1º modo seria através da variável `ref`:

    ```react
    // componentDidMount irá pegar o último elemento
    componentDidMount() {
      this.inputElement.focus();
    }
    
    render() {
      return (
        <input
        type="text"
        onChange={props.change}
        value={props.name}
        ref={(inputEl) => this.inputElement = inputEl}
        />
      )
    }
    ```

  * 2º modo através do `constructor` e do `React.createRef()`:

    ```react
    class Person extends Component {
      constructor(props) {
        super(props)
        this.inputRef = React.createRef()
      }
      
      componentDidMount() {
        this.inputRef.current.focus();
      }
      
      render() {
        return (
          <input
          type="text"
          onChange={props.change}
          value={props.name}
          ref={this.inputRef}
          />
        )
      }
    }
    ```

### Functional component - useRef

Para `consts` o `React.createRef()` não existe, porém temos o `useRef()` que irá fazer exatamente o mesmo papel!

* Além do `focus` quero que o botão seja clicado assim que iniciar!
  * Devemos lembrar de utilizar do `useEffect` para que não haja **problemas do template não ter sido carregado antes do clique!**

```react
// Cockpit.js → para o click automático
const cockpit = (props) => {
  const toggleButton = useRef(null)
  
  useEffect( () => {
    toggleButton.current.click()
  }, [])
  
  return (
  	<button ref={toggleButton} />
  )
}
```

```react
// Person.js → para o focus
const Person = (props) => {
  const focusInput = useRef(null)
  
  // irá selecionar o último input
  useEffect( () => {
    focusInput.current.focus()
  }, [])
  
  return (
  	<input ref={focusInput} type="text" />
  )
}
```

### Ref p/ forms

Como uma boa prática, invés do uso do `onChange` de um input, é uma boa prática utilizar do `useRef` de uma forma que não seja criado `states` 'atoa':

* Capture o valor dado um form!

  ```react
  const myForm = () => {
    const nameRef = useRef();
    
    const addValueHandler = () => {
      const name = nameRef.current.value;
    }
    
    <form onSubmit="addValueHandler">
      <input type="text" ref={nameRef} />
    	<button type="submit" />
    </form>
  }
  ```




### Forward Refs - Componentes customizados

Quando queremos acessar o `value` de um componente customizado (componente criado), não temos como passar diretamente o `ref` , like:

```react
const ParentComponent = () => {
  const amountInputRef = useRef();
  
  const getting
  return <form onSubmit={submitHandler}>
    <!-- ref no MyCustomComponent NÃO IRÁ FUNCIONAR, pq React não tem como saber a qual input/componente irá utilizar Ref-->
    <MyCustomComponent ref={amountInputRef} />
  </form>
}
```



Nesse caso, devemos utilizar `Forward Refs`!

1. No `MyCustomComponent` iremos chamar `React.forwardRef` e então, como **segundo parâmetro** iremos chamar a `ref` que ficará disponível para quem utilizar o componente!

   ```react
   const MyCustomComponent = React.forwardRef((props, ref)) => {
     return <div>
     	<label>Test</label>
       <input ref={ref} />
     </div>
   }
   ```

2. No `ParentComponent` então poderemos utilizar do `useRef` e pegar o valor do input!

   ```react
   const ParentComponent = () => {
     const amountInputRef = useRef();
     
     const submitHandler = () => {
     	const enteredAmount = amountInputRef.current.value;
     }
     
     return <form onSubmit={submitHandler}>
       <MyCustomComponent ref={amountInputRef} />
     </form>
   }
   ```

   

## Prop Chain - Comunicação entre múltiplos componentes

<img src="/Users/igorromero/NotesInGeneral/React/images/reactPropChain.png" alt="reactPropChain" style="zoom:48%;" />

App.js importa:

* Cockipit
* Persons

Persons importa:

* Person

Considerando o cenário onde queremos que ao clicar em um botão **do `Cockpit.js`** seja manipulado um valor de `Person` como fariamos?

* Poderiamos ir passando as `props` de um componente para outro → Cockpit p/ App → App p/ Persons → Persons p/ Person!

  ```react
  // Cockpit.js
  const Cockpit = (props) => {
    return <button onClick={props.login}>Log in</button>
  }
  ```

  ```react
  // App.js
  class App extends Component {
    state = {
      authenticated: false
    };
  
    toggleLogin = () => {
      this.setState({authenticated: true})
    }
    
    render() {
      return (
        <div className="App">
          <Cockpit login={this.toggleLogin} />
          
          <!-- teremos que passar para Persons -->
          <Persons isAuthenticated={this.state.authenticated} />
        </div>
      );
    }
  }
  ```

  ```react
  // Persons.js
  const Persons = (props) => {
    return <Person isAuth={props.isAuthenticated} />
  }
  ```

  ```react
  // Person.js
  const Persons = (props) => {
    return
    	{ 
        props.isAuth ?
        <p>Authenticated</p> : <p>Please Log in</p>
      }
  }
  ```

Trabalhoso! Componentes tendo responsabilidades demais, sem ter necessidade!

### Context API

O React possui um meio de **prover e consumir** objetos, funções, atributos através do método  `React.createContext()`, que irá disponibilizar globalmente os valores declarados dentro do método!

* Os valores declarados dentro de `createContext` podem e devem ser modificados por outros componentes, portanto devemos deixar como valores `default` para quem não passar nenhum dado

```react
import React from 'react';

const authContext = React.createContext({ myValue: '123'}) // não precisa ser um objeto!

export default authContext;
```

#### Provider

Através do `createContext` podemos declarar valores default, como:

```react
import React from 'react';

const authContext = React.createContext({
  authenticated: false, // boolean
  login: () => {}	// function
})

export default authContext;
```

* **!importante** é necessário importar a função `authContext` para todo componente que precisar utilizar do objeto global, bem como também deixar os componentes que irão utilizar do objeto global dentro do componente `<AuthContext.Provider />`!

  ```react
  import AuthContext from '../context/auth-context';
  
  class App extends Component {
    render () {
      return (
      	<AuthContext.Provider>
          <Cockpit
            title={this.props.appTitlte}
            switchingName={this.switchingName}
            togglePerson={this.togglePerson}
            inlineStyle={inlineStyle}
            login={this.toggleLogin}
            />
          {showPerson}
      	</AuthContext.Provider>
      )
    }
  }
  ```

* Através do `Provider` podemos atribuir os valores ao objeto global

  ```react
  <AuthContext.Provider 
    	value={{ authenticated: this.state.authenticated, login: this.toggleLogin }}>
  ```



#### Consumer

O `Consumer` deixa entre a tag uma função com **todo objeto global** declaro pelo `Provider`

Relembrando que temos um botão em `Cockpit` que irá alterar um valor de `Person`, portanto:

* Cockpit → irá receber a função `login`;
* Person → irá receber a variável `authenticated`;

Em `Person.js`:

```react
import AuthContext from '../../../context/auth-context'

const person = (props) => {
  return (
    		<!-- Antes { props.isAuth ? <p>Authenticated</p> : <p>Please Log in</p> } -->
      <AuthContext.Consumer>
        {(context) => context.authenticated ? <p>Authenticated</p> : <p>Please Log in</p> }
      </AuthContext.Consumer>
    )
}
```

Para o Cockpit:

```react
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
  <AuthContext.Consumer>
    {(context) => <button style={props.inlineStyle} onClick={context.login}>Log in</button> }
  </AuthContext.Consumer>
}
```

### Class - contextType

Para `class` → É se quisessemos utilizar em outros métodos o valor proveniente pelo `Provider`? 

* É possível utilizar o método `static contextType` que irá receber a própria functional `auth-context`, permitindo que seja possível acessar os objetos com `this.context.yourObject`:

  ```react
  import AuthContext from '../context/auth-context';
  
  class App extends Component {  
    
    static contextType = AuthContext;
  
    componentDidMount() {
      console.log('componentDidMount called');
      console.log(this.context.authenticated)
    }
  }
  ```

### Functional - useContext

Para `consts` → utilizamos do `useContext` :

```react
import React, { useContext, useEffect, useRef } from 'react';
import AuthContext from '../../../context/auth-context';

const person = (props) => {
  const authContext = useContext(AuthContext);
}
```

Também podemos melhorar o código no template:

```react
<!-- ANTES -->
<AuthContext.Consumer>
  {(context) => context.authenticated ? <p>Authenticated</p> : <p>Please Log in</p> }
</AuthContext.Consumer>

<!-- com useContext -->
{ authContext.authenticated ? <p>Authenticated</p> : <p>Please Log in</p> }
```



### useContext p/ Log-in

Geralmente as informações de login, ficam disponível em diversos componentes e nada melhor do que utilizar do **Context Api + useContext** !

* Invés de gerenciarmos diretamente o login no `App` podemos criar uma função que irá importar o `Provider` e já passar os valores `pré-definidos`

Sem o Provider na classe Context API:

```react
// auth-context.js
import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {}
});

export default AuthContext;


// App.js
import React from 'react';
import AuthContext from './auth-context'

const app = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const loginInHandler = () => {
    setIsLoggedIn(true)
  }
  
  const loginOutHandler = () => {
    setIsLoggedIn(false)
  }
  
  return <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: loginInHandler,
      onLogin: loginOutHandler
    }}>

  </AuthContext.Provider>
}
```



Com Provider no Context API (não precisa adicionar o `Provider` nos outros componentes):

```react
// auth-context.js with Provider
import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {}
});

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const loginInHandler = () => {
    setIsLoggedIn(true)
  }
  
  const loginOutHandler = () => {
    setIsLoggedIn(false)
  }
  
  return <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: loginInHandler,
      onLogin: loginOutHandler
    }}>

  </AuthContext.Provider>
}

export default AuthContext;


// index.js
ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById('root')
);



// app.js
function App() {

  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
```





# HTTP / axios

Para realizar requisições HTTP, a biblioteca `axios` é muito simples de ser implementada:

```bash
npm install axios
```

Como exemplo, iremos utilizar API publica → `https://jsonplaceholder.typicode.com/posts`

## GET

Realizando um GET

```react
import React, { useEffect } from 'react';
import axios from 'axios';


const blog = () => {
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(post => {
        console.log(post) // irá retornar todos os dados
      })
  })
  
}
```

Renderizando valores de um GET:

```react
const blog = () => {
  const [postState, setPostState] = useState([]);
  
  useEffect(() => {
    axios.get('')
    	.then(post => {
      	setPostState(post.data)
    })
  })
  
  const posts = postState.map(post => {
    return <Post title={post.title} />
  })
  
  return {posts} // irá exibir todos os dados da URL
}
```

### Transformando value

#### Adicionando outra key

Vamos falar que queremos adicionar outra `key` dentro de cada objeto do array proveniente da API:

```react
const blog = () => {
  const[postState, setPostState] = useState([]);
  
  useEffect(() => {
    axios.get('myUrl').then(response => {
      const limitedPost = response.data.slice(0,4); // [post1, post2, post3, post4]
      const postWithAuthor = limitedPost.map(post => {
        return {
          ...post,
          author: "Igor"
        }
      });
    })
  })
  
  const posts = postState.map(post => {
    return <Post title={post.title} author={post.author}/>
  })
  
  return {posts};
}
```



#### Manipulando o retorno

Pode ocorrer um cenário onde as `keys` da API não são as `keys` que queremos utilizar.

Exemplo - JSON retornado da api:

```json
{
  "episode_id": 1,
 	"film_description": "Film description" 
}
```

Exemplo que queremos:

```json
{
  "id": 1,
 	"description": "Film description" 
}
```



Para transformar o `episode_id` em `id` iremos precisar manipular o retorno no `then`

```react
function App() {
  const [movie, setMovie] = useState([]);

  axios.get('https://swapi.dev/api/films/').then((res) => {
    const transformedMovie = res.data.results.map((movie) => {
      // manipulando o retorno para o JSON desejado
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawlm,
        releaseDate: movie.release_date,
      };
    });
    setMovie(transformedMovie);
  });
```



## POST

Recuperando os valores do input, se torna fácil fazer o post:

1. Pegar os valores do input através do `useState`

   ```react
   const newPost = () => {
     const[post, setPost] = useState({
       title: '',
       content: '',
       author: 'max'
     });
     
     return (
     	<input type="text" onChange={e => setPost({...post, title: event.target.value})}/>
       <input type="text" onChange={e => setPost({...post, content: event.target.value})}/>
       <input type="text" onChange={e => setPost({...post, author: event.target.value})}/>
       <button type="submit">Register</button>
     )
   }
   ```

2. no `onClick` do botão fazer o send:

   ```react
   const newPost = () => {
     const[post, setPost] = useState({
       title: '',
       content: '',
       author: 'max'
     });
     
     const postHandler = () => {
       axios.post('https://jsonplaceholder.typicode.com/posts', post)
         .then(response => {
           console.log(response.data)
         })
     }
     
     return (
     	<input type="text" onChange={e => setPost({...post, title: event.target.value})}/>
       <input type="text" onChange={e => setPost({...post, content: event.target.value})}/>
       <input type="text" onChange={e => setPost({...post, author: event.target.value})}/>
       <button type="submit">Register</button>
     )
   }
   ```

### Post from State

Em geral, todo `post` deveremos:

1. Criar uma `const` e dentro dessa const declarar todos os `states` que iremos fazer o `POST`;

   ```react
   const burgerBuilder = () => {
     const [ingredients, setIngredient] = useState({
       salad: 0,
       bacon: 0,
       cheese: 0,
       meat: 0,
     });
   
     const [totalPrice, setTotalPrice] = useState(4);  
   
     const orderNowHandler = () => {
       const order = {
         ingredients: ingredients,
         price: totalPrice,
         customer: {
           name: 'Igor',
           address: {
             street: 'Teststreet 1',
             zipCode: '32131',
             country: 'Brazil',
           },
           email: 'igorgrv@hotmail.com',
         },
         deliveryMethod: 'fastest',
       };
   
       axios
         .post('/orders.json', order)
         .then((response) => console.log(response))
         .catch((error) => console.log(error));
     };
   
   }
   ```

   

## Handling error localy

O famoso `catch` é disponível para o `axios`, desta forma podemos exibir um texto caso aconteça algum erro:

```react
const blog = () => {
  const [postState, setPostState] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      setPostState(response.data);
    }).catch(error => {
      console.log(error)
      setHasError(true);
    });
  }, []);

  let posts = <p>Something went wrong</p>
  if (!hasError) {
    posts = <p>everthing went good</p>
  }

  return  {posts}

}
```



## Interceptors

Os `interceptors` servem para **lidar com requests & response de forma global** e também muito **util para headers**!

* Os interceptors devem ir no `index.js` da aplicação!
* Se não tiver um `return` irá ficar bloqueado;
* 2º parâmetro é responsável **pelos erros**;

```react
import axios from 'axios';

axios.interceptors.request.use(
  (request) => {
   	// para todo request, irá passar por aqui primeiro
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // para todo request, irá passar por aqui primeiro
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```



## Default

### URL

Se todas suas URLs são iguais, o `axios` provê algo chamado `baseURL` que pode ser utilizada global!

```react
// Url base: https://jsonplaceholder.typicode.com
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
```

### Header

```react
axios.defaults.headers.common['Authorization'] = 'seu token'; // para todo tipo de request
axios.defaults.headers.post['Content-Type'] = 'application/json';
```

## Modal - Displaying error

Um modo comum em toda aplicação é ter um meio de fazer um handler global, neste exemplo **será com um modal**:

1. Criaremos o componente HOC, chamado `withErrorHandling.js`

2. Será uma function que irá receber como parâmetro o Componente que irá ser feito o wrap;

   1. Este componente irá receber as próprias `props` disponíveis

   ```react
   import React from 'react';
   import Modal from '../../components/UI/Modal/Modal';
   import Aux from '../Aux';
   
   const withErrorHandling = (WrappedComponent) => {
     return (props) => {
       return <Aux>
         <Modal show>
           Something went wrong
         </Modal>
         <WrappedComponent {...props} />
       </Aux>
     };
   }
    
   export default withErrorHandling;
   ```

3. Como a idéia é fazer um handling dos erros do `axios` iremos receber o `axios` e utilizar do `interceptor` 

```react
import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandling = (WrappedComponent, axios) => {
  return (props) => {
    const [response, setResponse] = useState(null);

    useEffect(() => {
      axios.interceptors.request.use(null, (error) => {
        setResponse(null);
      });
      axios.interceptors.response.use(null, (error) => {
        setResponse(error);
      });
    });

    const errorHandling = () => {
      setResponse(null);
    };

    return (
      <Aux>
        <Modal show={response} modalClosed={errorHandling}>
          {response ? response.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandling;
```

### Using the modal

Basta importar a function e no `export` passar os argumentos

```react
import withErrorHandling from '../../HOC/withErrorHandling/withErrorHandling';

...

export default withErrorHandling(burgerBuilder, axios);
```

## Spinner

Enquanto a página carrega, ou enquanto uma requisição é enviada, podemos criar um `spinner`, como exemplo, o CSS:

```css
.Loader,
.Loader:before,
.Loader:after {
  border-radius: 50%;
}
.Loader {
  color: #521751;
  font-size: 11px;
  text-indent: -99999em;
  margin: 55px auto;
  position: relative;
  width: 10em;
  height: 10em;
  box-shadow: inset 0 0 0 1em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.Loader:before,
.Loader:after {
  position: absolute;
  content: '';
}
.Loader:before {
  width: 5.2em;
  height: 10.2em;
  background: #fff;
  border-radius: 10.2em 0 0 10.2em;
  top: -0.1em;
  left: -0.1em;
  -webkit-transform-origin: 5.2em 5.1em;
  transform-origin: 5.2em 5.1em;
  -webkit-animation: load2 2s infinite ease 1.5s;
  animation: load2 2s infinite ease 1.5s;
}
.Loader:after {
  width: 5.2em;
  height: 10.2em;
  background: #fff;
  border-radius: 0 10.2em 10.2em 0;
  top: -0.1em;
  left: 5.1em;
  -webkit-transform-origin: 0px 5.1em;
  transform-origin: 0px 5.1em;
  -webkit-animation: load2 2s infinite ease;
  animation: load2 2s infinite ease;
}
@-webkit-keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
```

Functional class:

```react
import React from 'react';
import classes from './Spinner.css';

const spinner = () => {
  return <div className={classes.Loader}>Loading...</div>;
};

export default spinner;
```

### Using the Spinner

O Spinner deve estar atrelado a uma variável que chega se esta `loading=true` ou `false`, portanto iremos criar uma variável no `state` que irá fazer esse check e quando o `axios` for chamado irá ser `true`:

```react
const [loading, setLoading] = useState(false);

...

const orderNowHandler = () => {
  setLoading(true);
  axios
    .post('/orders', order)
    .then((response) => {
    setLoading(false); // terminou de carregar
  })
    .catch((error) => {
    setLoading(false); // terminou de carregar
  });
};

// iremos trocar o valor da variável orderSummary conforme seja true/false
let orderSummary = (
  <OrderSummary
    ingredients={ingredients}
    totalPrice={totalPrice}
    modalClosed={cancelPurchaseHandler}
    orderNow={orderNowHandler}
    />
);
if (loading) {
  orderSummary = <Spinner />;
}

return <Modal>{orderSummary}</Modal>
```
