# Redux + Toolkit

```bash
yarn add react-redux @reduxjs/toolkit
```

<img src="./README.images/reduxgif.gif" style="zoom: 33%;" />

* **`Action`** -> é um objeto, que **obrigatoriamente** contém um `type` com o nome da action e opcionalmente um `payload`;

  * Essa action é algo que irá acontecer no **`reducer`**;

    ```json
    {
      type: ‘incrementar’,
      payload: {
        id: ‘123’ // id que quero incrementar
        quantidade: 2 // quantidade que quero incrementar
      }
    }
    ```

* **`Dispatch`** -> É uma função que **irá disparar uma action**;

  ```react
  const dispatch = useDispatch();
  dispatch(incrementar(2));
  ```

* **`Immer`** -> É uma biblioteca usada para lidar com a imutabilidade, sem q a gente precise se preocupar em mutar um estado ou não;

* **`Imutabilidade`** -> É o ato de nunca mudar um dado, oq faz que a tool seja mais performática. No redux nunca retornamos um estado mudado, e sim um novo estado ;

* **`InitialState`** -> É um objeto/array com o estado inicial que o `slice` irá precisar ;

  * ```javascript
    const initialState = []
    const categoriesSlice = createSlice({
      name: "categoriesSlice",
      initialState,
    });
    ```

* **`Provider`** -> É um componente da lib redux que permite que todos componentes acessem um `store`;

  * Usado diretamente no `index.js` da root do projeto

  * ```react
    import { Provider } from "react-redux";
    import store from "./store";
    
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <Router />
        </Provider>
      </React.StrictMode>
    );
    ```

* **`Reducer`** -> É uma função q recebe as `actions` e os `initialStates`, e sempre retornam um novo estados;

  * ```react
    function contadorReducer(state = 0, action) {
      if(action.type === ‘incrementar’) {
        return state += action.payload;
      }
      return state;
    }
    ```

* **`Redux Toolkit`** -> É uma lib que facilita o uso do Redux, como facilitar o uso de `Reducers` com `slicers`;

* **`Redux`** -> É uma lib do javascript;

* **`Slice`** -> É uma função do redux toolkit que nos facilita usar `reducers` ;

  * ```react
    import { createSlice } from '@reduxjs/toolkit';
    
    const contadorSlice = createSlice({
      name: ‘contador’ // nome do reducer
      initialState: 0 // estado inicial do reducer
      reducers: {
        incrementar: (state) => { // esta função é uma action, ele automaticamente gera um type ‘contador/incrementar’
          state++ // esta linha parece simples, mas ela utilizará o Immer por debaixo dos panos para incrementar o contador com imutabilidade!
        }
      }
    })
    
    const { incrementar } = contadorSlice.actions; // contadorSlice.actions contém todas as actions criadas.
    const contadorReducer = contadorSlice.reducer; // aqui está o reducer, que deve ser indexado ao Store
    ```

* **`state`** -> É um termo do Redux, que se refere na verdade ao **estado atual do reducer**. Dentro do `useSelector` o state receber todos os o componentes do `Store`;

* **`useSelector`** -> É um hook que permite que seja acessado os estados armezanados no `Store`;

  * ```react
    const contador = useSelector(state => state.contador); // Aqui temos que escrever state.contador pois state é o store inteiro, e contador é o state do reducer de nome contador.
    ```

* **`state`** -> ;

# Sumário

1. [Projeto](#projeto)
2. [Gerenciamento de Estados Globais](#gerenciamento)
3. [Tópicos Adicionais](#adicionais)

# Projeto<a href="projeto" />

* Curso: https://cursos.alura.com.br/course/react-gerenciamento-estados-globais-redux/
* Projeto: https://github.com/alura-cursos/trato-tech/tree/aula1.2

<img src="./README.images/project.gif" style="zoom: 33%;" />

# Gerenciamento de Estado Globais <a href="gerenciamento" />



## Why Redux?

<img src="./README.images/whyRedux.png"/>

React por motivos de performance foi desenvolvido para ser **one-way data binding**, ou seja, **informações vão do pai para o filho** via props, caso a gente queira **trocar informações entre components primos**, usamos do **prop drilling**

```react
function Pai() {
  const [prop, setProp] = useState(‘’);
  return (
    <Filho1 prop={prop} />
    <Filho2 prop={prop} />
  )
}
```



## Implementando Redux

### Store

O `Store` precisa de `reducers`, que serão os responsáveis por conter `slices` /pedaçoes do store...

* Criar o `/store/index`;
  * Para configurar um `store` precisamos do `configureStore`, que recebe um objeto com `reducers`

```react
// /store/index.js
const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {} //aqui dentro irá os reducers
})
```



### Reducer

O `reducer` é onde ficará os dados em si (aquilo que antes seria um `useState` , ficará global, através do reducer)

* `reducer` é criado através de um `createSlice`, que irá receber:
  * `name` (nome que será usado globalmente)
  * `initialState` (estado atual dos objetos/fields)

```javascript
// store/reducers/categories.js

const initialState = [
  {
    id: 1,
    name: 'xyz'
  }
]

const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState
})

export default categoriesSlice.reducer;
```



Juntando com o `store`:

```javascript
// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import categoriaSlice from "./reducers/categories";

const store = configureStore({
  reducer: {
    categories: categoriaSlice,
  },
});

export default store;
```



### Provider

Para que todos componentes possam acessar os componentes globais, precisamos alterar o `index.js`, atribuindo um **`Provider`** a todos componentes:

* `Provider` espera um `store`, que é o arquivo criado acima

```react
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
```



### Consumindo State

Com o Provider aplicado, podemos fazer uso do **`useSelector`**, para acessar todos os `states` criados pelo `store`

```react
export default function Home() {
  const categories = useSelector(state => state.categories)
  // categorias = [{id: 1, name: 'xyz'}] -> declarado no categoriesSlice
}
```

### Actions + Dispatch

Actions são responsáveis por **alterar o state**, mas para isso precisamos de `dispatch`!

* Com redux/toolkit, temos um hook chamado `useDispatch` que nos ajuda com isso!

Exemplo:

* Crie uma action `changeFavorite` que irá alterar a prop `favorite`
  * No Reducer, criado pelo `createSlice`inclua o objeto **`reducers`**, que irá receber as actions
  * Cada action irá receber `state, { payload }` -> onde:
    * `state`: é valor do `initialState`
    * `payload`: é o valor recebido pela função em si (`changeFavorite('oi')` => `payload = oi`)

```react
// store/reducers/items.js

const initialState = ...;

const itemSlice = createSlice({
  name: 'itemSlice',
  initialState,
  reducers: {
    // State aqui se refere ao Item e não ao Store!
    changeFavorite(state, { payload }) {
      state.map((item) => {
        if (item.id === payload) item.favorite = !item.favorite;
        return item;
      });
    }
  }
})
```

* ​	Exporte a função

```react
export const { changeFavorite } = itemSlice.actions;
```



Para utilizar a action, **utilizaremos do useDispatch**

```react
export default function ItemComponent(props) {
  const { id } = props;

  // disparando a change
  const dispatch = useDispatch();
  function handleFavorite() {
    dispatch(changeFavorite(id))
  }
  
  return <div onClick={handleFavorite} />
}
```



#### Push/Filter state

```bash
[Immer] An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.
```

**CUIDADO**, ao tentar fazer um `push` ou `filter` de um state!

* Para evitar **problemas de imutabilidade** o Immer **não permite** que seja **incluído** no **state atual** um novo valor, **É NECESSÁRIO RETORNAR UM NOVO STATE**

Exemplo **errado** :x:

```react
const initialState = []

const seuSlice = createSlice({
  name: 'seuSlice',
  initialState,
  reducers: {
    
    myAction(state, {payload}) {
      // NÃO IRÁ FUNCIONAR, pois estamos dando um return do state atual
      return state.push({id:payload, quantity:1})
    }
  }
})
```

Exemplo **correto** :white_check_mark:

```react
const initialState = []

const seuSlice = createSlice({
  name: 'seuSlice',
  initialState,
  reducers: {
    
    myAction(state, {payload}) {
      // IRÁ FUNCIONAR - toolkit irá usar o immer para nós 
      state.push({id:payload, quantity:1})
    }
  }
})
```

Exemplo **correto** :white_check_mark:

```react
const initialState = []

const seuSlice = createSlice({
  name: 'seuSlice',
  initialState,
  reducers: {
    
    myAction(state, {payload}) {
      // IRÁ FUNCIONAR - retornamos um NEW state
      return [...state, {id:payload, quantity:1} ]
    }
  }
})
```



### CRUD (actions)

Dado o `initialState` abaixo:

```javascript
const initialState = [
  {
    {
    title: "XBOX",
    description: 'Description',
    id: uuid(),
  },
  {
    {
    title: "Playstation",
    description: 'Description 2',
    id: uuid(),
  }
]
```

* **Add**

```react
const mySlicer = createSlice({
  name: 'mySlice',
  reducers: {
    // adicionamos ao state atual um objeto novo
    addAction: (state, { payload }) => {
      state.push( {...payload, id: uuid() })
    }
  }
})
```

* **Update**

```react
const mySlicer = createSlice({
  name: 'mySlice',
  reducers: {
    
    // payload = { id: 123, title: 'newTitle', description: 'newDesc' }
    updateAction: (state, { payload }) => {
      // Encontramos o index do objeto a ser atualizado
			const index = state.findIndex(item => item.id === payload.id)
      
      // Com o uso do Object.assign, atualizamos o valor desejado
      Object.assign(state[index], {...payload} )
    }
  }
})
```

* **Delete**

```react
const mySlicer = createSlice({
  name: 'mySlice',
  reducers: {
    
    // payload = "123"
    updateAction: (state, { payload }) => {
			const index = state.findIndex(item => item.id === payload)
      
      // Com o uso do Splice, iremos remover o elemento do array
			state.splice(index, 1);
    }
  }
})
```





# Middlewares - Chamando APIs

<img src="https://redux.js.org/assets/images/ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif" style="zoom:30%;" />

* O Middleware fica **depois da execução da action**!
* Middleware **escuta** que a **action foi executado** e faz o que deve ser feito
* `configureStore` possui por padrão um middleware, chamado **`Thunk`** (mas existem outros como o **`Saga`**)



## Redux Thunk

Thunk **é um middleware** nos ajuda com as chamadas assíncronas no backend!

### Axios

```bash
yarn add axios
```

Para configurar uma rota default no axios:

```javascript
// src/common/config
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001'
});

export default api;
```



### GET ALL

* Criar `src/services/seuService.js`

```javascript
// src/services/itemService.js
import api from '/common/config/api'

const itemService = {
  buscar: await () => {
    const response = api.get('/items');
    return response;
  }
}

export default itemService;
```

* No Reducer `src/store/reducers/items.js`:

  * Exportar uma constante que será utilizada pela `view` usando **`createAsyncThunk`**

    ```react
    const initialState = []
    
    export const searchItems = createAsyncThunk(
      "items/search",
      itemsService.search
    );
    ```

  * Com o **`extraReducers`**, iremos usar o `builder` para definir os status que o Thunk devolve:

    * `pending` -> carregando
    * `fulfilled` -> then
    * `rejected` -> catch

    ```react
    const itemSlice = createSlice({
      name: 'itemSlice',
      initialState,
      
      // criar o builder
     extraReducers: builder => {
        builder
        .addCase(
          buscarItens.fulfilled,
          (state, { payload }) => {
            console.log('itens carregados!');
            return payload;
          }
        )
        .addCase(
          buscarItens.pending,
          (state, { payload }) => {
            console.log('carregando itens');
          }
        )
        .addCase(
          buscarItens.rejected,
          (state, { payload }) => {
            console.log('busca de itens rejeitada!');
          }
        )
      }
    })
    ```



## Listener

* Listener é um middleware também já instalado do **react-toolkit**;
* Como nome diz, podemos **escutar uma action** e então fazer algo!
* Podemos usar **Listener + Thunk**;

Para **criar um Listener** precisamos:

1. Criar uma folder que irá ficar o listener `src/store/middlewares/` -> `items.js`

2. Criar um `createListenerMiddleware` e exporta-lo

   1. ```react
      // src/store/middlewares/items.js
      export const categoriaListener = createListenerMiddleware();
      ```

3. Importa-lo no `configureStore` (`/src/store/index.js`)

   1. ```react
      const store = configureStore({
        reducer: {
          categories: categoriesSlice,
          items: itemSlicer,
          cart: cartSlicer,
          search: searchSlicer,
        },
        
        // aqui adicionamos todos os liteners
       middleware:
          getDefaultMiddleware =>
            getDefaultMiddleware().prepend(
              categoriasListener.middleware,
              itensListener.middleware
            ),
      });
      ```



Voltando ao `categoriaListener`, temos a opção:

* ***clearListeners\***, que limpa os *listeners* já existentes;
* ***middleware\***, que precisamos adicionar no `configureStore`, e faremos isso ainda nesse vídeo;
* ***startListening\***, para começarmos a escutar algo;
* ***stopListening\***, para parar de escutar algo;



### StartListening & Get All

Esse é o método que iremos escutar quando uma action acontece, e então executar algo.

Exemplo base:

1. Criamos uma `action` para o Listener:

   ```react
   // src/store/reducers/categories
   import { createAction, createSlice } from "@reduxjs/toolkit";
   
   export const searchCategoryListener = createAction('categories/getOne')
   ```

2. Criamos o Listener com o `createListenerMiddleware`

   ```react
   // src/store/middleware/categories
   
   import categoriesService from "services/categories";
   import { loadAllCategories, searchCategoriesListener } from "store/reducers/categories";
   
   export const categoryListener = createListenerMiddleware();
   
   categoryListener.startListening({
     actionCreator: searchCategoriesListener, // quando alguém fizer o disptach dessa action
     // o effect será chamado
     effect: async (action, { dispatch, fork }) => {
   
       const categories = fork(async api => {
         return await categoriesService.search();
       })
   
       const result = await categories.result
       if (result.status === 'ok')
         dispatch(loadAllCategories(result.value))
     }
   })
   ```

   * `fork` 
     * Fork é utilizado para realizar ***mini tarefas no middleware***
     * Trata erros (**try/catch) de forma automática**
     * Podemos **pausar, cancelar, por delay** na chamada
     * Recebemos do fork um `cancel` ou `result`
   * `dispatch` -> funciona igual ao `useDispatch` para chamar uma `action` do reducer

3. Fazemos o `dispatch ` com o `useEffect` no component que irá carregar o `state:

   ```react
   export default function Home() {
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const categories = useSelector((state) => state.categories);
   
     useEffect(() => {
       dispatch(searchCategoriesListener());
     }, [dispatch]);
   ```

   

### Unsubscribe

Vamos dizer que **ao acessar** a página inicial o **Listener carregue algo**, e após acessarmos outra página e voltarmos para inicial **não queiramos carregar novamente** o que já foi carregado pelo Listener...

* `unsubscribe` -> importado do `effect` do `startListening`, nos permite **PARAR O LISTENER**

```react
export const itemListener = createListenerMiddleware();

itemListener.startListening({
  actionCreator: searchItemsListener,
  
  // pegamos o unsubscribe
  effect: async (action, { dispatch, fork, unsubscribe }) => {

    const items = fork(async api => {
      await api.delay(1000)
      return await itemsService.search()
    })

    const result = await items.result;

    // se sucesso, pararmos o Listener de escutar
    if (result.status === 'ok') {
      dispatch(loadItems(result.value))
      unsubscribe()
    }

  }
```



### getState

De dentro de um startListening também podemos recuperar o state!

```react
// src/store/middleware/item.js

export const itemListener = createListenerMiddleware();

itemListener.startListening({
  actionCreator: loadCategory,
  effect: async (action, { dispatch, fork, getState }) => {

    const categoryName = action.payload
    
    // pegamos items do state
    const { items } = getState();

    const hasItemAlreadyLoad = items.some(item => item.category === categoryName);

    if (hasItemAlreadyLoad) return;

    await createTask({
      fork,
      dispatch,
      action: loadAllItems,
      service: () => itemsService.getItemByCategory(categoryName),
      textLoading: `Loading items from ${categoryName}`,
      textSuccess: `Items from ${categoryName} loaded with success!`,
      textError: `Error while trying to load items from ${categoryName}`,
    });
  }
})
```



# Tópicos Adicionais <a href="adicionais"/> :book:

## Classnames

```bash
yarn add classnames
```

O classnames nos ajuda a trabalhar com **classes de css  condicionais**, exemplo:

* Sem classname:

  ```react
  let selecionado = true;
  
  return	<div className={selecionado ? 'myCustomClass' : ''} />
  ```

* Com classname:

  ```react
  let selecionado = true;
  
  return <div className={classNames({ 'myCustomClass': selecionado })} />
  ```

Também é possível **adicionar mais de uma class ao elemento**, basta separarmos por vírgula:

* Exemplo, dado que `href` sempre tem que:
  * receber a class `links`
  * receber a class `selected` condicionamente (se estiver no path dado)

```react
import styles from "./Navbar.module.scss";
// com CSS Modules, é necessário por entre [] o estilo

return 
  <a
    href="/inicio"
    className={classNames(styles.link, {
      [styles.selected]: window.location.pathname === "/inicio",
    })}
  >
    Página Inicial
  </a>
```



PS: Se a classe tiver `-` , é necessário por entre `[]`:

* Exemplo, para class `input-error`:

```react
className={classNames({
    [styles["input-error"]]: errors.description,
})}
```





## CSS Modules

```bash
yarn add sass
```

O Css Modules nos ajuda com:

* Evitar sobreposição de classes;
* Nos retorna um objeto que contém todos os estilos!

Exemplo:

* Sem CSS Module:

  ```react
  import './Navbar.scss';
  
  return <div className='nav' />
  ```

* Com CSS Module:

  ```react
  import styles from './Navbar.module.scss';
  
  // {nomeDaVariavel}.{nomeDaClasse}
  return <div className={styles.nav} />
  ```

  * Na prática, o browser irá criar um id para cada classe: `{nomeDaVariavel}.{nomeDaClasse}.{id}`

    ```html
    <!-- Neste exemplo a class '.nav' recebe id VwSpp-->
    <nav class=”Navbar_nav__VwSpp”> … </nav>
    ```



## JSConfig

```bash
jsconfig.json
```

JSConfig possui diversas propriedades, uma mais comum:

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

* O **baseURL** nos deixa importar coisas de forma absoluta (**sempre começando de src**).

Exemplo considerando a estrutura abaixo, importe do `Navbar.module.scss` o `_breakpoints.scss`:

![Screenshot 2023-06-09 at 13.06.39](./README.images/jsconfig.png)

* Sem JSConfig:

  ```react
  @import '../../styles/breakpoints';
  ```

* Com JSConfig:

  ```react
  @import 'styles/breakpoints';
  ```



## Routes (relembrando)

```bash
yarn add react-router-dom
```

* Crie um arquivo `/src/routes.js`

  * **`BrowserRouter`** -> Criado para indicar que haverá mudança nas rotas;

  * **`Routes`** -> Indica que haverá várias `Route` dentro;

  * **`Route`** -> É onde informamos ao react qual `element` carregar quando o `path` der match;

  * **`Outlet`** -> É onde fica o conteúdo 'específico', ou seja, teremos um Navbar e um footer, o resto é o conteúdo específico;

  * **`Link`** -> Versão do `a href` para SPA;

  * **`useLocation`** -> hook para pegar informações do `pathname`;

    * ```react
      // Renderizar condicionalmente um icone baseado no pathname
      export default function Navbar() {
        const location = useLocation();
       
        return (
        	<div>
            {location.pathname === '/cart' ? (<Icon1 />) : (<Icon2 />)}
           </div>
        )
      }
      ```
  
  * **`useParam`** -> hook para pegar os parâmetros da URL - `/categoria/:nomeCategoria`;

    * ```react
      // routes.js -> Dado a rota com parametro
      // localhost/categoria/eletronic
      <Route path="/categoria/:nomeCategoria" element={<div>home</div>} />
      
      
      
      // index.js -> iremos pegar o nome da categoria
      // nesse caso '/eletronic'
      export default function Category() {
        const { nomeCategoria } = useParams("nomeCategoria");
      ```
  
  * **`useNavigate`** -> hook para navegar em **routes**;
  
    * ```react
      const navigate = useNavigate();
      
      // codigo omitido
      return
      	<div key={index} onClick={() => navigate(`/category/${category.id}`)} />
      ```




  ### Config Base de Route

  ```react
  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import LandingPage from 'components/LandingPage'
  
  export default function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route index element={<div>home</div>} />
            <Route path="/categoria/:nomeCategoria" element={<div>home</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  ```

* No `index.js` importe este arquivo

  ```react
  import React from "react";
  import ReactDOM from "react-dom/client";
  import Router from "routes";
  import "./index.css";
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  );
  
  ```



## Array.reduce

Precisar de alguma das operações abaixo, use o `reduce`!

* Transformar Array em objeto, string e etc
* Concatenar Array



`reduce` espera 2 valores:

1. `(finalValue, currentValue)` 
2. `initialValue`

Exemplo:

```javascript
const cartItems = [
  {
    id: '1',
    quantity: 1
  },
  {
    id: '2',
    quantity: 4
  },
]

const items = [ {id: 1, title: 'X'}, {id: 2, title: 'Y'} ]

// aplicando reduce para incluir informações de 'items' com 'cartItems'
const reduce = cartItems.reduce( (finalValue, cartItem) => {
   const item = items.filter(item => item.id === cartItem.id)
   finalValue.push({
     ...item,
     quantity: cartItem.quantity
   })
  
  return finalValue;
}, [])

console.log(reduce)
/*
[
  {
    id: '1',
    title: 'X',
    quantity: 1
  },
  {
    id: '2',
    title: 'Y',
    quantity: 4
  },
]
*/
```



## React Hook Form

```shell
yarn add react-hook-form
```

O React Hook Form nos ajuda **com formulários,** onde não **precisamos** **declarar um state** para cada **input!**

Como usar:

* `useForm` -> é o hook que irá retornar as funções necessárias como:
  * `register` -> que armazena o state
  * `handleSubmit` -> que recebe os valores de `register`



* **Sem** react-hook-form:

```react
export function default MyForm() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [email, setEmail] = useState('');
  
  function handleSubmit() {
    console.log('Do something with all the forms')
  }
  
  return (
  	<form onSubmit={handleSubmit}>
      <input type="text" placeholder="name" />
      <input type="text" placeholder="lastName" />
      <input type="text" placeholder="phoneNumber" />
      <input type="email" placeholder="email" />
    </form>
  )
}
```

* **Com** react-hook-form:

```react
import { useForm } from 'react-hook-form';

export function default MyForm() {
  
  const { register, handleSubmit } = useForm();
  
  function cadastrar(params) {
    console.log('states', params) // {name, lastName ...}
  }
  
  return (
  	<form onSubmit={handleSubmit(cadastrar)}>
      <input {...register('name')} type="text" placeholder="name" />
      <input {...register('lastName')} type="text" placeholder="lastName" />
      <input {...register('phoneNumber')} type="text" placeholder="phoneNumber" />
      <input {...register('email	')} type="email" placeholder="email" />
    </form>
  )
}
```

### Validando campos

O `react-hook-form` também nos permite marcar o campo com required, ou até mesmo por outras validações!

* Dentro do `register`, coloque `,` e adicione as validações necessárias:

```react
<form onSubmit={handleSubmit(cadastrar)}>
  <input {...register('name', { required: true })} type="text" placeholder="name" />
  <input {...register('lastName', { required: true })} type="text" placeholder="lastName" />
  <input {...register('phone', { required: true })} type="text" placeholder="phone" />
  <input {...register('email	', { required: true })} type="email" placeholder="email" />
</form>
```

* Existem diversas outra validações, com `maxLength`, `minLength` e etc;
* O `required` **automaticamente da onBlur** no elemento faltante!



### Default values

Caso queira que um valor seja pré-selecionado:

* dentro do `useForm`, crie um objeto do tipo `defaultValues` e passe o nome que colocamos no `register`

```react
import { useForm } from 'react-hook-form';

export function default MyForm() {
  
  // defaultValues
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: 'Igor'
    }
  });
  
  return (
  	<form onSubmit={handleSubmit(cadastrar)}>
      <input {...register('name')} type="text" placeholder="name" />
      <input {...register('lastName')} type="text" placeholder="lastName" />
      <input {...register('phoneNumber')} type="text" placeholder="phoneNumber" />
      <input {...register('email	')} type="email" placeholder="email" />
    </form>
  )
}
```



### Capturando errors

O `react-hook-form` também pode capturar os errors do formulário!

* `formState` -> capture do `useForm`
* Extrai para uma constante `errors` o valor retornado de `formState`
* Com o `classNames` faça a validação para exibir outro css caso tenha erro

```react
const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      category: "",
    },
  });

const { errors } = formState;

return (
  	<form onSubmit={handleSubmit(cadastrar)}>
      <input 
         className={classNames({
            [styles["input-error"]]: errors.name,
          })}
        {...register('name')} type="text" placeholder="name" />
    </form>
)
```



## Component genéricos & forwardRef

Quando temos um **componente genérico do HTML** precisamos utilizar o **`forwardRef`**!

```react
import { forwardRef } from 'react';
import styles from './Input.module.scss';

// Aqui passamos a ref como props
function Input({ value, onChange, ...outrosProps }, ref) {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      {...outrosProps}
      className={styles.input}
    />
  )
}

// Exportamos o componente
export default forwardRef(Input);
```



## JSON-Server

```bash
npm install -g json-server
```

```json
// package.json -> adicionar 'server'
 "scripts": {
    "server": "json-server --watch db.json --port 3001"
  },
```

```json
// db.json -> root do projeto
{
  "categorias":[], // -> cada array será uma rota
  "items":[], // -> /items/{id} | /items
}
```



Com o `db.json` acima teríamos:

```  http
  http://localhost:3001/categorias
  http://localhost:3001/itens
```
