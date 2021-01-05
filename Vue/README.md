# Vue

O `Vue.js` assim como o Angular e React, **é um framework** para criação de **componentes reutilizáveis** e também para criação de **SPAs**. Uma das vantagens desse framework é ter um **_core minimalista de 17kb_**.<br>

Uma das **diferenças em relação ao Angular**, será em como o código é distribuido dentro de cada componente! No Angular, o CSS, HTML e Typescript ficam em arquivos separados, no Vue.js, **todo conteúdo fica em um único file `.vue`** !

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



### v-bind - Binding atributos HTML

Utilizamos o `v-bind` quando queremos fazer a interpolação **de um objeto ou de atributos HTML**<br>

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



## Consumindo API

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

   