# Vue

O `Vue.js` assim como o Angular e React, **é um framework** para criação de **componentes reutilizáveis** e também para criação de **SPAs**. Uma das vantagens desse framework é ter um **_core minimalista de 17kb_**.<br>

Uma das **diferenças em relação ao Angular**, será em como o código é distribuido dentro de cada componente! No Angular, o CSS, HTML e Typescript ficam em arquivos separados, no Vue.js, **todo conteúdo fica em um único file `.vue`** !

## Conceitos Vue

Dentro do bloco `script` teremos algumas parâmetros, que dirão como **o componente irá funcionar!**;

### Methods - objeto

* O objeto `methods` irão ficar todos os métodos `void` do componente.
* Funções neste objeto **permitem que seja feita comunicação com outro componente!**

```vue
<button class="botao botao-perigo" :type="tipo" @click="disparaAcao()">

methods: {
  disparaAcao() {
    if (confirm("Confirma operacao?")) {
      this.$emit("botaoAtivado");
    }
  }
}
  
<botao-customizado descricao="REMOVER" tipo="button"@botaoAtivado="remove(foto)"></botao-customizado>
methods: {
  remove(foto) {
    alert(foto.titulo + " removida!");
  }
},
```

### Computed - objeto

* Geralmente ficam funções que **`return`** algo;
* As funções não precisam ser utilizadas no `template` com o uso do `()`;

```javascript
data() {
  return {
    titulo: "IgorGram",
    fotos: [],
    filtro: ""
  };
},

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let expRegular = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter(fotoFiltrada =>
                                 expRegular.test(fotoFiltrada.titulo)
                                );
      } else {
        return this.fotos;
      }
    }
  },
```

```vue
<li
    class="lista-fotos-item"
    v-for="foto of fotosComFiltro" <!-- aqui foi utilizada a função -->
    :key="foto._id"
    >
```



### Props - array

* Ficam os parâmetros que compõem o componente;
* São dados para usar no componente, que não podem ser mudados diretamente;

```vue
<template>
  <button :type="tipo" @click="disparaAcao()"> {{ descricao }} </button>
</template>

<script>
export default {
  props: ["tipo", "descricao"],
```



### Data() - função

* Guardamos no `data()` os primitivos, como **string, arrays, objetos**;
* Que poderá ser manipulado por um `computed`;

```javascript
data() {
  return {
    titulo: "IgorGram",
    fotos: [],
    filtro: ""
  };
},
```





## Getting Started

Assim como no Angular, o Vue.js necessita do [Node.js](https://nodejs.org/en/) instalado e do [VSCode](https://code.visualstudio.com/download)!

1. Em um terminal, execute → `npm i -g vue-cli`;
   1. Este comando fará com que seja possível utilizar o Vue.js de **forma global**;
2. Cheque com → `vue --version`;

Com o **Vue-cli** instalado, para criar um projeto:

```bash
 vue init webpack-simple nomeDoProjeto
```

Para rodar o projeto:

```bash
cd igorgram
npm install
npm run dev
```

* O comando `npm run dev` basicamente executa o que esta no `package.json`:

  ```json
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  },
  ```

Será aberto automaticamente o navegador em `http://localhost:8080/` !

<br>

## Entendendo Vue

Assim como no Angular, o Vue.js vai ter um `index.html`. O que precisamo se atentar é a `div id="app"`!

```html
<!-- igorgram/index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>alurapic</title>
  </head>
  <body>
    <div id="app"></div>	<!-- aqui a mágica acontece -->
    <script src="/dist/build.js"></script>
  </body>
</html>
```

Se abrirmos o arquivo `igorgram/src/App.vue` encontraremos o conteúdo que é exibido no `localhost`!

```vue
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
```

### Entendendo App.vue

Todo arquivo `.vue` se chamará **Single File Template**, que equivale a um **módulo que declara o componente**, onde o componente será **dividido em 3 blocos**:

* Template (apresentação);

* Script (comportamento e dados);

* Style (estilo da apresentação);

  ```vue
  <!-- default.vue -->
  
  <template>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style>
  </style>
  ```

  

Entendendo o `script`:

```javascript
<script>
  export default {
    name: 'app',
      data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
```

* `export default` → indica que o componente pode ser importado por **outros módulos**;
* `data()` → é onde disponibilizamos **dados para o template**; → essa função sempre `return` um **objeto** que poderá ser utilizado com **_data binding_**;

<br>

### Entendendo main.js

Como a `<div id="app">` carrega o `App.vue`? A tarefa de fazer essa substituição é do `main.js`:

```javascript
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
```

* Como fizemos o `export default` do `App.vue` é possível importa-lo com o `import from`;

* O `import Vue from 'vue'` se trata de um **Global View Objetct**, que estará dentro de `node_modules`;

  * Com o auxílio do global view, conseguimos criar uma **view instance**

    ```javascript
    new Vue ({
      el: '#app',
      render: h => h(App)
    })
    ```

  * `el` → recebe o seletor do elemento;

  * `render` → passamos o componente que será renderizado no lugar da TAG declarada no `el`;

### Entendendo o Template

No Vue.js, tudo dentro do `template` que for ter +1 elemento HTML, **PRECISA ESTAR EM DENTRO DE UMA `<div>`**!<br>



## Data binding

No Angular, tinhamos a **interpolação** `{{ nomeSeletor }}` e no Vue, teremos o mesmo modo!<br>

Checando o `App.vue` padrão, temos:

```vue
<h1>{{ msg }}</h1>
<!-- codigo omitido -->

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
```

* Através do `data()` retornamos o objeto `msg` com o a frase que será **interpolada** quando o template chamar `{{ msg }}`;

### v-text - Binding texto

Um outro modo de fazer a interpolação é utilizar a tag `v-text` em tags html:

```vue
<template>
    <h1 v-text="titulo"></h1>
</template>

<script>
export default {
  data () {
    return {
      titulo: "IgorGram"
    }
  }
}
</script>
```



### v-bind(:) - Binding atributos HTML

Utilizamos o `v-bind` quando queremos fazer a interpolação **de um objeto ou de atributos HTML**.

* `v-bind` ou `:` → realiza um data binding unidirecional da fonte de dados para a view.

Vamos supor, que queremos acessar o objeto foto

```vue
<script>
export default {
  data() {
    return {
      foto: {
        src:
          "https://assets.codepen.io/t-1003/internal/avatars/teams/default.png?fit=crop&format=auto&height=256&version=1513627136&width=256",
        description: "Vue"
      }
    };
  }
};
</script>
```

No template, teriamos que:

* Adicionar a tag `v-bind` antes das tags html:

  ```vue
  <template>
    <img v-bind:src="foto.src" v-bind:alt="foto.description" />
  </template>
  ```

* Ou, simplemesnte com `:` 

  ```vue
  <template>
    <img :src="foto.src" :alt="foto.description" />
  </template>
  ```



### v-for - Binding array

Com o `v-for` podemos passar o **array** de fotos:

```vue
<script>
export default {
  data() {
    return {
      fotos:[
        {
          src: "https://assets.codepen.io/t-1003/internal/avatars/teams/default.png?fit=crop&format=auto&height=256&version=1513627136&width=256",
          description: "Vue"
        },
        {
          src: "https://1.bp.blogspot.com/-CpOVQnk_nE0/WDbFz6J2JfI/AAAAAAAAGZk/SZKGIqr1TZgNZiMBoHKnh--r9xDV5RMkACLcB/s1600/angularjs-development-services.png",
          description: "Angular"
        }
      ]
    }
  }
}
</script>
```

E adicionar na TAG `li` o `v-for` com o nome do array e o atributo `:key` que o Vue pede para ser **uma chave única**, que como não temos passaremos somente o nome

```vue
<template>
  <div>
    <h1 v-text="titulo"></h1>
    
    <ul>
      <li v-for="foto of fotos" :key="foto">
        <img :src="foto.src" :alt="foto.description" />
      </li>
    </ul>
    
  </div>
</template>
```



## Consumindo API - VueResource

1. Baixaremos o projeto [api.zip](https://s3.amazonaws.com/caelum-online-public/vue/api.zip);

2. Descompactaremos e então:

   ```bash
   cd api
   npm install
   npm start
   
   API escutando na porta: 3000
   ```

3. Dentro do projeto Vue, iremos instalar o `vue-resource` → este recurso permite-nos usar o `$http` (métodos HTTP);

   ```bash
   cd igorgram
   npm i vue-resource
   npm run dev
   ```

4. Com o `vue-resource` instalado, precisamos importa-lo em nosso `main.js` e então **registra-lo** através do Global View

   ```javascript
   import Vue from 'vue';
   import App from './App.vue';
   import VueResource from 'vue-resource';
   
   Vue.use(VueResource);
   ```

5. No `App.vue` iremos utilizar do **_[Lifecycle Hooks](https://vuejs.org/v2/api/#Options-Lifecycle-Hooks)_** (gancho de ciclo de vida), para que seja feito a requisição **somente quando App tiver sido criado** → `created`;

   ```vue
   <script>
   export default {
     data() {
       return {
         titulo: "IgorGram",
         fotos:[]
       };
     },
   
     created() {
       alert("teste");
     }
   };
   </script>
   ```

6. Dentro de `created`, já que 'ativamos' o módulo do **VueResource**, iremos através do objeto `$http` fazer o consumo da API, onde o objeto `$http` retorna uma **`promise`**, que podemos manipular, transformando em `json()`;

   ```vue
   <template>
     <div>
       <h1 v-text="titulo"></h1>
       <ul>
         <li v-for="foto of fotos" :key="foto._id">
           <img :src="foto.url" :alt="foto.titulo" />
         </li>
       </ul>
     </div>
   </template>
   
   <script>
   export default {
     data() {
       return {
         titulo: "IgorGram",
         fotos: []
       };
     },
   
     created() {
       this.$http
         .get("http://localhost:3000/v1/fotos")
         .then(res => res.json())
         .then(
           fotos => (this.fotos = fotos),
           err => console.log(err)
         );
     }
   };
   </script>
   ```




## Componentizando

O `App.vue` não deve conter todo conteúdo da página! Deve ser utilizado somente para **itens globais**, ou seja, **que irão aparecer em todas telas**.

* TUDO QUE FOR PRECISAR **COPIAR E COLAR** DEVE SE TORNAR UM COMPONENTE!

<br>

Atualmente, a estrutura `<template>` da nossa aplicação possui diversos elementos que podem ser componetizados:

```vue
<template>
  <div class="corpo">
    <h1 class="centralizado">{{ titulo }}</h1>

    <!-- lista de fotos --> 
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotos" :key="foto._id">
        <!-- painel de fotos --> 
        <div class="painel">
          <h2 class="painel-titulo">{{ foto.titulo }}</h2>
          <div class="painel-corpo">
            <!-- fotos --> 
            <img class="imagem-responsiva" :src="foto.url" :alt="foto.titulo" />
            <!-- FIM fotos -->
          </div>
        </div>
        <!-- FIM painel de fotos --> 
      </li>
    </ul>
    <!-- FIM lista de fotos --> 
    
  </div>
</template>
```

* Podemos ter os componentes:
  * `Painel`
  * `ImagemResponsiva`

<br>

### Componente Painel

1. Criaremos a estrutura `/src/components/shared/painel/Painel.vue`;

2. Moveremos todo conteúdo do painel de `App.vue` → `Painel.vue`;

   ```vue
   <template>
     <div class="painel">
       <h2 class="painel-titulo"><!-- TÍTULO DA IMAGEM --></h2>
       <div class="painel-corpo">
         <!-- LOCAL DA IMAGEM -->
       </div>
     </div>
   </template>
   
   <script>
   export default {};
   </script>
   
   <style>
   /* CODIGO OMITIDO */
   </style>
   
   ```

Mas e o **título da imagem** e a **imagem?**

3. Em `App.vue`  iremos ter algo como:

   ```vue
   <ul class="lista-fotos">
     <li class="lista-fotos-item" v-for="foto of fotos" :key="foto._id">
       
       <painel>
         <imgagem-responsiva/>
       </painel>
       
     </li>
   </ul>
   ```



### Conversa entre componentes

Considerando:

* Componente pai → `App.vue`
* Componente filho  → `Painel.vue`

A comunicação entre eles deve ocorrer, para que o filho receba informações do pai e vice-versa!<br>

#### Comp. Filho

Quando queremos **RECEBER um valor do pai** utilizando o **_data binding_**, precisamos declarar o array **`props: []`** dentro do nosso script!

```vue
<script>
export default {
  props: ['titulo']
};
</script>
```

Desta forma no template estamos informando que **queremos** a variável `titulo`

```vue
<!-- Painel.vue -->
<template>
  <div class="painel">
    <h2 class="painel-titulo">{{ titulo }}</h2>
    <div class="painel-corpo">
      <!-- LOCAL DA IMAGEM -->
    </div>
  </div>
</template>
```



#### Comp. Pai

Quando queremos **PASSAR um valor para o filho**, iremos precisar **importar e declarar** o componente, com o objeto **`components`**!

```vue
<script>
import Painel from "./components/shared/painel/Painel";

export default {
  components: {
    "painel": Painel
  },
  // data e created omitidos
</script>
```

E no template utilizamos o nome dado ao componente, nesse caso `painel`, passando através do `v-bind` o que o componente espera receber, no caso o `titulo`

```vue
<painel :titulo="foto.titulo">
  <!-- <imagem-responsiva />
</painel>
```

#### Slot

Quando queremos que **parte** do conteúdo do pai esteja **dentro** do componente filho, utilizamos do **`<slot>`**. Desta forma o Vue irá entender que aquele é um espaço que pode ficar entre as tags do componente, neste caso `<painel> conteúdo aqui </painel>`

```vue
<!-- Painel.vue -->

<template>
  <div class="painel">
    <h2 class="painel-titulo">{{ titulo }}</h2>
    <div class="painel-corpo">
      <slot></slot> <!-- Vue irá entender que conteúdo entrará aqui -->
    </div>
  </div>
</template>
```

E se quisermos que dentro do componente tenham **mais slots?** Utilizamos do **named slot**, ou seja, damos um `name` para cada slot:

```vue
<!-- ComponenteQualquer.vue -->
<template>
    <div>
        <slot name="cabecalho" class="header" ></slot>
        <hr>
        <slot class="body"></slot>
        <hr>
        <slot name="rodape" class="footer"></slot>
    </div>
</template>

<!-- App.vue -->
<componente-qualquer>
    <div slot="cabecalho">
        <h1>Bem-vindo!</h1>
    </div>
    <p>Seja bem-vindo à Alura!</p>
    <div slot="rodape">
        <p>copyright 2017</p>
    </div>
</componente-qualquer>
```



### Componente ImagemResponsiva

Para reforçar o uso da comunicação entre pai e filho, iremos mover a tag `img` para um componente!

```vue
<!-- ImagemResponsiva -->
<template>
	<img :src="url" :alt="titulo"/> 
	<!-- url e titulos serao obrigatorios para quem quiser usar o componente-->
</template>
```

No componente pai:

```vue
<!-- App.vue -->
<template>
	<painel :titulo="foto.titulo">
    <imagem-responsiva :url="foto.url" :titulo="foto.titulo" />
  </painel>
</template>

<script>
import Painel from "./components/shared/painel/Painel";
import ImagemResponsiva from './components/shared/imagem-responsiva/ImagemResponsiva' 
  
export default {
  
  components: {
    "painel": Painel,
    "imagem-responsiva": ImagemResponsiva
  },
}
</script>
```



## Estilos globais - Scoped

Se adicionarmos o CSS abaixo, no componente `Painel.vue` iremos ver que TODA a aplicação recebeu este mesmo estilo:

```vue
<!-- Painel.vue -->
<style>
* {
  box-shadow: 5px 5px 5px;
}
</style>
```

Porquê?<br>

O Vue só entende que o **estilo pertence ao componente** quando declaramos na tag `<style>` o atributo **`scoped`**

```vue
<!-- Painel.vue -->
<style scoped>
* {
  box-shadow: 5px 5px 5px;
}
  
</style>
```



## v-on(@) - Eventos

O `v-on` ou o shortcut `@` é utilizado quando temos actions (`dblclick(), click(), input()`), como em um `<input>`. Também podemos criar **nossa própria action** e declara-la com o `@minhaAction`!.

* `v-on` ou `@` → `@click="suaFuncao()` realiza um data binding unidirecional da view para a fonte de dados, que pode ou não modificá-lo.

### Filtro reativo

Usaremos do `v-on` para criar um filtro reativo, onde **conforme digitamos aparecerá a imagem**!

1. Dentro do `App.vue` , adicionaremos o `<input type="search"` com a action `input` , para que capturemos tudo que foi escrito:

   ```vue
   <input type="search" @input="">
   ```

2. Para fazermos a relação entre **digitado vs título da imagem**, iremos criar o objeto `filtro` dentro do `data()`

   ```vue
   data() {
     return {
       titulo: "IgorGram",
       fotos: [],
       filtro: ""
     };
   },
   ```

3. Na action do input, iremos referenciar o objeto `filtro` com o `$event.target.value` para pegarmos o valor digitado

   ````vue
   <input type="search" @input="filtro = $event.target.value">
   ````

4. E agora para filtrar a iterar no array  `fotos`?

#### Computed Property - manipulando o data()

Quando queremos manipular um dado que esta em `data()` utilizamos do objeto `computed`, onde cada propriedade desse objeto é **obrigatoriamente uma função**;

```javascript
data() {
  return {
    titulo: "IgorGram",
    fotos: [],
    filtro: ""
  };
},

computed: {
  fotosComFiltro() {
   // a função de filtrar 'fotos' irá aqui
  } 
},
```

Desta forma, podemos invés de passar o array `fotos` no `ng-for`, passar a função `fotosComFiltro` que também é uma diretiva!

```vue
<li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id">
```

Agora, para manipular o que foi digitado efetivamente, iremos utilizar do `RegExp` (`'i'` para ignorar CamelCase) e `filter`;

* A função `test` verifica duas strings;

```javascript
computed: {
  fotosComFiltro() {
    if (this.filtro) {
      let tituloFoto = new RegExp(this.filtro.trim(), "i");
      return this.fotos.filter(fotoFiltrada =>
                               tituloFoto.test(fotoFiltrada.titulo)
                              );
    } else {
      return this.fotos;
    }
  }
},
```



## v-show - manipulando display

Ainda utilizando actions, queremos que ao dar `dblclick` em título a imagem seja ocultada!

1. No `Painel.vue` , antes da tag `<slot/>` iremos adicionar uma div, que irá ter o atributo `v-show="false"`;

   ```vue
   <div v-show="true">
   	<slot></slot>
   </div>
   ```

   * Se alternamos `true` → `false` iremos ver que as imagens irão sumir;

2. Agora para que isso seja alternado ao dar 2 cliques no título, iremos atribuir o `@dblclick` na tag `<h2/>` e vincular uma propriedade chamada `visivel`, que irá inverter o proprio valor ao ser acionada.

   1. Toda vez que precisarmos declarar um parâmetro que será manipulado, devemos fazer dentro da função  `data()`

   ```vue
   <h2 class="painel-titulo" @dblclick="visivel = !visivel">
     {{ titulo }}
   </h2>
   <div class="painel-corpo">
     <div v-show="visivel">
       <slot></slot>
     </div>
   </div>
   
   <script>
     export default {
       props: ["titulo"],
       data() {
         return{
           visivel: true
         }
       }
     };
   </script>
   ```

   

## Transition - ajudando CSS

`<transition />` é um elemento do Vue, que automaticamente nos habilita 3 novos estilos!<br>

Para o `transition` abaixo:

```vue
<transition name="painel-fade">
      <div class="painel-conteudo" v-show="visivel">
        <slot></slot>
      </div>
</transition>
```

O Vue irá adicionar automaticamente 3 elementos para o `name` dado do `transition`

```
...-enter 			 // antes do elemento ser incluído ou removido, o estado atual
...-enter-active // quando o elemento esta sendo incluído
...-leave-active // quando o elemento esta sendo removido
```

Portanto, se quisermos criar um `fade` :

```vue
<style>
.painel-fade-enter, .painel-fade-leave-active {
  opacity: 0
}

.painel-fade-enter-active, .painel-fade-leave-active {
  transition: opacity .4s
}
</style>
```



## Rotas

Para utilizar rotas, precisamos **instalar o `VueRouter`**:

```javascript
npm install vue-router

// <!-- main.js -->
import VueResource from 'vue-resource';
import VueRouter from 'vue-router'

Vue.use(VueResource);
Vue.use(VueRouter)
```

Para declarar as rotas da aplicação:

1. Criaremos o `src/routes.js`, 

2. Importaremos o Componente

3. Passaremos o `path` e o nome do `component`;

   ```javascript
   import Home from './components/view/home/Home';
   import Cadastro from './components/view/cadastro/Cadastro';
   
   export const routes = [
     { path:'', component: Home },
     { path:'/cadastro' , component: Cadastro}
   ]
   ```

Com as rotas mapeadas, precisamos passar a `const routes` para o `VueRouter` que esta no main

1. Dentro do `main.js`, iremos importar o arquivo `routes.js` ;

2. Instanciaremos o `VueRouter` através da `const router` para ser utilizada dps pela **view instance**;
   
   1. `const router` ira receber o arquivo `routes.js` e iremos declarar o `mode:history` para remover `/#/`
   
   ```javascript
   // main.js
   import { routes } from './routes';
   
   Vue.use(VueResource);
   Vue.use(VueRouter)
   
   const router = new VueRouter ({
     routes,
     mode: 'history'
   })
   ```
   
3. Instanciaremos `router` na `view instance`

   ```javascript
   new Vue({
     el: '#app',
     'router': router,
     render: h => h(App)
   })
   ```

   * Como o nome será igual, o ES6 nos permite deixar somente o nome do parametro:

     ```javascript
     new Vue({
       el: '#app',
     	router,
       render: h => h(App)
     })
     ```

4. Basta adicionarmos no `App.vue` a tag `<router-view/>`

   * `router-view` → Serve para indicar para o template da página principal da aplicação o local no qual os demais componentes carregados através de rotas devem ser renderizados.

   ```vue
   <template>
     <div class="corpo">
       <router-view></router-view>
     </div>
   </template>
   ```



### router-link

Para que a aplicação funcione como uma SPA, devemos utilizar no lugar do `href` o `router-link`.

1. Criaremos o componente `Menu` → `src/componentes/shared/menu/Menu.vue`;

2. Utilizaremos da to `router-link to=""`

   ```vue
   <!-- Menu.vue -->
   <template>
     <nav>
       <ul>
         <li>
           <router-link to="/">Home</router-link>
         </li>
         <li>
           <router-link to="/cadastro">Cadastro</router-link>
         </li>
       </ul>
     </nav>
   </template>
   ```

3. Importaremos no `App.vue` e utilizaremos a tag `<menu-menu/>`:

   ```vue
   <template>
     <div class="corpo">
       <meu-menu></meu-menu>
       <router-view></router-view>
     </div>
   </template>
   
   <script>
   import Menu from './components/shared/menu/Menu'
   
   export default {
   
     components: {
       'meu-menu': Menu
     }
   };
   </script>
   ```

   

### Melhorando o Menu

O `routes.js` ja possui as informações abaixo, so faltaria o `titulo`

```vue
<ul>
  <li>
    <router-link to="/">Home</router-link>
  </li>
  <li>
    <router-link to="/cadastro">Cadastro</router-link>
  </li>
</ul>
```

1. No `routes.js` adicionaremos o título como um parâmetro

   ```javascript
   export const routes = [
     { path:'', component: Home, titulo:'home' },
     { path:'/cadastro' , component: Cadastro, titulo:'cadastro'}
   ]
   ```

2. No `Menu.vue` iremos importar o `routes.js` e iterar sobre ele com o `v-for`

   ```vue
   <template>
     <nav>
       <ul>
         <li v-for="route of routes" :key="route.path">
           <router-link :to="route.path">{{ route.titulo }}</router-link>
         </li>
       </ul>
     </nav>
   </template>
   
   <script>
   import {routes} from '../../../routes'
   
   export default {
   
     data() {
       return {
         routes
       }
     }
   }
   </script>
   ```

   * Faremos apenas um pequeno ajuste ao `to: route.path` , pq o path de `Home` é uma string vazia (`''`);

     ```vue
     <router-link :to="route.path? route.path : '/'">{{ route.titulo }}</router-link>
     ```

## Eventos Customizados

### Filho chamando o Pai

A idéia é de que o filho (componente que esta sendo implementado, podendo ser um button personalizado), chame a função do elemento pai (componente que possui diversos filhos, podendo ser uma view).<br>

1. Criaremos o componente `Botao` → `src/components/shared/botao/Botao.vue`

   ```vue
   <template>
     <button class="botao botao-perigo" :type="tipo">{{ descricao }}</button>
   </template>
   
   <script>
   export default {
     props: ["tipo", "descricao"]
   };
   </script>
   ```

2. No componente pai (`Home`) iremos importar e adicionar uma `descricao` e `tipo`

   ```vue
   <painel :titulo="foto.titulo">
     <imagem-responsiva :url="foto.url" :titulo="foto.titulo" />
     <botao-customizado descricao="REMOVER" tipo="button"></botao-customizado>
   </painel>
   
   <script>
   import Painel from "../../../components/shared/painel/Painel";
   import ImagemResponsiva from "../../../components/shared/imagem-responsiva/ImagemResponsiva";
   import Botao from '../../shared/botao/Botao.vue';
   
   export default {
     components: {
       painel: Painel,
       "imagem-responsiva": ImagemResponsiva,
       "botao-customizado": Botao
     },
     // omitido
   }
   </script>
   ```

<br>

A idéia é de que o componente `Botao` após o `click` , faça uma confirmação para qualquer componente pai que clique nele. **Caso confirmado**, deve **disparar um método do componente pai!**.<br>

Ex.: Queremos clicar no botão, estando na tela Home, e apareça uma confirmação da exclusão, que caso confirmado deve remover a foto!<br>

1. No componente filho, vamos associar o `@click` a uma função customizada, que irá pedir uma `confirm`

   ```vue
   <!-- Botao.vue -->
   <template>
     <button class="botao botao-perigo" :type="tipo" @click="disparaAcao()">
       {{ descricao }}
     </button>
   </template>
   ```

   * A declaração da função `disparaAcao()`  por ser um componente que chamará o **Método** de outro, devemos atribui-la no objeto `methods:`!

   ```vue
   <script>
   export default {
     props: ["tipo", "descricao"],
   
     methods: {
       disparaAcao() {
         if (confirm("Confirma operacao?")) {
           this.$emit("botaoAtivado");
         }
       }
     }
   };
   </script>
   ```

2. Agora no componente pai, devemos utilizar o mesmo nome que usamos no `$emit` 

   ```vue
   <!-- Home.vue -->
   <painel :titulo="foto.titulo">
     <imagem-responsiva :url="foto.url" :titulo="foto.titulo" />
     <botao-customizado
                        descricao="REMOVER"
                        tipo="button"
                        @botaoAtivado="remove(foto)"
                        ></botao-customizado>
   </painel>
   
   <script>
     methods: {
       remove(foto) {
         alert(foto.titulo + " removida!");
       }
     },
   </script>
   ```



## Estilos customizados

E se o botão também pudesse ser customizado? Alterando as classes?

1. No `Button.vue` iremos criar os estilos para o botão:

   ```css
   .botao {
   display: inline-block;
   padding: 10px;
   border-radius: 3px;
   margin: 10px;
   font-size: 1.2em;
   }
   
   .botao-perigo {
   background: firebrick;
   color: white;
   }
   
   .botao-padrao {
   background: darkcyan;
   color: white;
   }
   ```

2. Adicionaremos uma nova `props`, chamada `estilo`

   ```vue
   <script>
   export default {
   	props: ["tipo", "descricao", "estilo"]
   }
   </script>
   ```

3. Alteraremos o `class` do `button` para uma **computed property**, chamado `estiloDoBotao()`

   ```vue
   <script>
   export default {
   	props: ["tipo", "descricao", "estilo"]
     
     computed: {
     	  estiloDoBotao() {
           if(this.estilo == 'perigo') return botao botao-perigo
           if(this.estilo == 'default') return botao botao-padrao
      }
     }
   }
   </script>
   ```
   
4. No `home.vue` iremos utilizar a `props` `estilo`:

   ```vue
   <!-- Home.vue -->
   <botao-customizado
                      descricao="REMOVER"
                      tipo="button"
                      @botaoAtivado="remove(foto)"
                      estilo="perigo"
                      >
   </botao-customizado>
   ```

   

## Validando props

Para **obrigar** que uma `props` seja utilizada, ou até mesmo, deixar um **default** caso não seja informado o padrão, podemos utilizar do **objeto `props`**!

1. No `button.vue` iremos trocar o array de `props` por um objeto;

2. Adicionaremos `required` para os parâmetros que queremos obrigatórios

3. `default` para o valor padrão

4. `type` se `String, boolean, Number`:

   ```javascript
   props: {
       tipo: {
         type: String,
         required: true
       },
       descricao: {
         type: String,
         required: true
       },
       estilo: {
         type: String,
         required: false,
         default: "default"
       }
   },
   ```

   

# Vue parte II

## Diretivas

As diretivas são **comportamentos que podem ser implemetados em componentes**.<br>

Se quisermos implementar um comportamento, como _ao dar dois cliques quero que o **elemento** rotacione_;

1. Criaremos um `Transform.js` → `/src/directives/Transform.js`;

2. Importaremos o módulo `Vue` , que irá conter o método `vue.directive`, que recebe:

   1. Nome do parâmetro;
   2. Objeto javascript, com as configs da diretiva;

   ```javascript
   import Vue from 'vue';
   
   Vue.directive('rotacao-diretiva', {
     
   })
   ```

   1. Para utilizar essa diretiva **Devemos usar a tag `v-`**, portanto `v-rotacao-diretiva`;

3. Dentro do método, utilizaremos do `bind`que recebe 3 parâmetros

   * `el` → Elemento do DOM (img, h1, button);
   * `binding` → Parâmetro que pode ser passado a diretiva;
   * `vnode` →

4. Como iremos **manipular o DOM**, podemos fazer uso do `addEventListener(action, function)` e do `elemento.style.transform` para manipular o parâmetro `transform` do css.

   ```javascript
   import Vue from 'vue';
   
   Vue.directive('rotacao-diretiva', {
     bind(el, binding, vnode) {
       let current = 0;
       el.addEventListener('dblclick', () => {
         current+=90;
         el.style.transform=`rotate(${current}deg)`;
       })
     }
   })
   
   ```

Para utilizar a diretiva em um componente **precisamos importar no `main.js`**!

```javascript
// demais imports
import { routes } from './routes';
import './directive/Transform'
```

Entao no elemento:

```vue
<!-- Home.vue -->
<imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-rotacao-diretiva/>
```



### Parâmetro na diretiva

Para passar o parâmetro, fazemos uso do `binding`;

1. Se passarmos no componente q esta usando a diretiva, um objeto, como:

   ```vue
   <imagem-responsiva v-rotacao-diretiva="{incremento:15, animate:true}"/>
   ```

2. Poderemos recuperar os valores na diretiva com o `binding.value`

   ```javascript
   Vue.directive("rotacao-diretiva", {
     bind(el, binding, vnode) {
       let current = 0;
       el.addEventListener("dblclick", () => {
         let incremento = 90;
         let animate = false;
   
         if (binding.value) {
           incremento = binding.value.incremento;
           animate = binding.value.animate;
         }
         current += incremento;
         el.style.transform = `rotate(${current}deg)`;
   
         if (animate) el.style.transition = `transform 0.5s`;
       });
     }
   });
   ```

   

## Formulário

Dado um formulário simples, utlizando componentes:

* `imagem-responsiva`
* `meu-button`

```vue
<!-- igorgram/src/components/cadastro/Cadastro.vue -->

<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado"></h2>

    <form>
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" autocomplete="off">
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off">
        <imagem-responsiva/>
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link to="/"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';

export default {

  components: {

    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  }
}

</script>
<style scoped>
	// omitido
</style>
```



## Ca#pturando dados

Para capturar dados do formulário, usaremos do `$event.target.value`;

1. Para cada `<input />` adicionaremos o `@input` atribuindo ao objeto `fotos`:

   ```vue
   <label for="titulo">TÍTULO</label>
   <input id="titulo" autocomplete="off" @input="foto.titulo = $event.target.value">
   
   <label for="url">URL</label>
   <input id="url" autocomplete="off" @input="foto.url = $event.target.value">
   
   <label for="descricao">DESCRIÇÃO</label>
   <textarea id="descricao" autocomplete="off" @input="foto.descricao = $event.target.value"></textarea>
   
   <script>
   data() {
       return{
         filtro: {
           titulo: '',
           url: '',
           descricao: ''
         }
       }
     }
   </script>
   ```

2. Para capturar os valores, devemos usar do. `@submit.prevent="suaFuncao()"` 

   ```vue
   <form @submit.prevent="gravar()">
     
     <!-- codigo omitido -->
   
    methods: {
       gravar() {
       	console.log(this.foto.titulo);
       }
     }
   ```

3. Para limpar o formulário, iremos ter que fazer com que **do script envie para o template**, para isso, podemos utilizar do `v-bind` - para cada `input` iremos fazer um bind do objeto `fotos`

   ```vue
   <!-- :value="foto.algo" -->
   <input
          id="titulo"
          autocomplete="off"
          @input="foto.titulo = $event.target.value"
          :value="foto.titulo"
          />
   
   <script>
     methods: {
       gravar() {
         this.foto = {}
       }
     }
   </script>
   ```

   

