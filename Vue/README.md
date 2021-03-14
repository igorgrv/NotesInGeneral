# Vue

O `Vue.js` assim como o Angular e React, **é um framework** para criação de **componentes reutilizáveis** e também para criação de **SPAs**. Uma das vantagens desse framework é ter um **_core minimalista de 17kb_**.<br>

Uma das **diferenças em relação ao Angular**, será em como o código é distribuido dentro de cada componente! No Angular, o CSS, HTML e Typescript ficam em arquivos separados, no Vue.js, **todo conteúdo fica em um único file `.vue`** !

## Conceitos Vue

Dentro do bloco `script` teremos algumas parâmetros, que dirão como **o componente irá funcionar!**;

## VueLifeCycle

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue10.png" alt="vue10" style="zoom:30%;" />

### Methods - objeto

* O objeto `methods` irão ficar todos os métodos `void` do componente.
* Funções neste objeto **permitem que seja feita comunicação com outro componente!**;
* Não devemos utilizar a função feita `methods` dentro do template com interpolação! O Vue verifica cada função do methods procurando se há alguma alteração!

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



## Vue Style Guide

O Vue disponibiliza **sugestões** para estrutura de pastas e nome dos arquivos, através do [style-guide](https://vuejs.org/v2/style-guide/)!

Alguns exemplos de nome de componentes:

* **The**Component.vue → `the` é utilizado para informar que o componente é utilizado **uma vez** (geralmente dentro do `App`)
* MeuComponente.vue → no HTML deveremos utilizar com `-` →  `<meu-componente>`  ;

Para props:

```javascript
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```



## Getting Started

Assim como no Angular, o Vue.js necessita do [Node.js](https://nodejs.org/en/) instalado e do [VSCode](https://code.visualstudio.com/download)!

1. Em um terminal, execute → `npm i -g @vue/cli`;
   1. Este comando fará com que seja possível utilizar o Vue.js de **forma global**;
2. Cheque com → `vue --version`;

Com o **Vue-cli** instalado, para criar um projeto:

```bash
@vue create nomeDoProjeto
 
 --selectDefaultVue2
 --yarn
 
 @yarn run serve
```

* O comando `npm run dev` basicamente executa o que esta no `package.json`:ou com Yarn

  ```javascript
  "scripts": {
    "serve": "vue-cli-service serve",
      "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
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



## Data binding - Interpolação

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

### ![vue1](/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue1.png)

#### v-text - Binding texto

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

### Methods

Através do `methods` é possível acessarmos os valores do `data()` com o `this` . Desta forma é possível manipular dinâmica mente o `template`:

```javascript
data() {
  return {
    courseGoalA: 'courseGoalA',
    courseGoalB: 'courseGoalB'
  }
}

methods: {
  const randomNumber = Math.random();
  if(randomNumber < 0.5) {
    return this.courseGoalA;
  } else {
    return this.courseGoalB;
  }
}
```

![vue2](/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue2.png)



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

<br>

Podemos acessar a `prop` de um componente **sem** o `:`, porém o Vue irá entender **como uma String!** - útil em casos que tratamos a String do lado do componente filho!

#### Componente ImagemResponsiva

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



### <component .>

A tag `component` possibilita menos repetição de código, para componentes **iguais**!

```vue
<!-- MeuComponentH2 -->
<template>
	<h2>
    Meu template 1
  </h2>
</template>

<!-- MeuComponentH3 -->
<template>
	<h2>
    Meu template 2
  </h2>
</template>
```

Se criarmos dois botoes que ficam hora exibindo um componente, hora o outro, com `props` e `methods` teriamos:

```vue
<!-- App.vue -->
<template>
	<button @click="toggleComponent('h2')">Component H2</button>
	<button @click="toggleComponent('h3')">Component H3</button>
	
	<MeuComponentH2 v-if="selectedComponent === 'MeuComponentH2'"></MeuComponentH2>
	<MeuComponentH2 v-if="selectedComponent === 'MeuComponentH3'"></MeuComponentH2>
</template>

<script>
import MeuComponentH2 from './MeuComponentH2';
import MeuComponentH3 from './MeuComponentH3';

export default {
	  components: {MeuComponentH2,MeuComponentH3},
  	props: { selectedComponent: 'MeuComponentH2' }
  	methods: {
      toggleComponent(componentName) {
        if (componentName === 'h2') 
          this.selectedComponent = 'MeuComponentH2';
        else 
          this.selectedComponent = 'MeuComponentH3';
      }
    }
 }
</script>
```

Com o uso de `<components>`:

```vue
<!-- App.vue -->
<template>
	<button @click="toggleComponent('h2')">Component H2</button>
	<button @click="toggleComponent('h3')">Component H3</button>
	
	<component :is="selectedComponent"></component>
</template>

<script>
import MeuComponentH2 from './MeuComponentH2';
import MeuComponentH3 from './MeuComponentH3';

export default {
	  components: {MeuComponentH2,MeuComponentH3},
  	props: { selectedComponent: 'MeuComponentH2' }
  	methods: {
      toggleComponent(componentName) {
        if (componentName === 'h2') 
          this.selectedComponent = 'MeuComponentH2';
        else 
          this.selectedComponent = 'MeuComponentH3';
      }
    }
 }
</script>
```

#### keep-alive

O `<keep-alive>` é utilizado em conjunto quando queremos manter o dado de um componente!

* Sem o `keep-alive`:

  * Quando digitarmos em um input e fazer o switch com a tag `<component />` o conteúdo **irá sumir** 

  ```vue
  <!-- MeuComponentH2 -->
  <template>
  	<h2>Meu template 1</h2>
  	<input type="text">
  </template>
  
  <!-- MeuComponentH3 -->
  <template>
  	<h2>Meu template 2</h2>
  	<input type="text">
  </template>
  
  <!-- App -->
  <template>
  	<component :is="selectedComponent"></component>
  </template>
  ```

* Com o `keep-alive`:

  ```vue
  <!-- App -->
  <template>
  	<keep-alive>
  		<component :is="selectedComponent"></component>
    </keep-alive>
  </template>
  ```

  

## Slot

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

### Named Slot (#)

Named slot é utilizado quando temos mais de um `slot` dentro de um componente, para indicar ao Vue, onde irá tais partes do componente!

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue14.png" alt="vue14" style="zoom:33%;" />

O `card` (borda com sombra) pode ter dois `slots`, um:

* Para o `header` ;
* Para o `badge` (admin / author);

Quando temos +1 utilizamos o **`<slot name="">`**

```vue
<!-- card.vue -->
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <slot></slot>
  </div>
</template>

<!-- Badge -->
<template>
  <section>
    <BadgeCard>
      <template v-slot:header>
        <h3>{{ fullName }}</h3>
        <base-badge :type="role" :caption="role.toUpperCase()"></base-badge>
      </template>
    <p>{{ infoText }}</p>
    </BadgeCard>
  </section>
</template>
```

* `v-slot:` pode ser abreviado para `#`	

  ```vue
  <!--
  <template v-slot:header></template>
  -->
  <template #header></template>
  ```

### $slots

O Vue disponibiliza a propriedade global `$slots` para caso a gente queira checar se a **named slot** esta sendo usada:

```vue
<!-- card.vue -->
<template>
  <div>
    <header v-if="$slots.header">
      <slot name="header"></slot>
    </header>
    <slot></slot>
  </div>
</template>

```

* Neste exemplo, o componente que **não implementar** o `<template #header>`  terá a formatação do componente `<header>`!


### teleport

A tag `<teleport to="someWhere">` é utilizada para quando queremos mover um componente para uma região do projeto!

* com o uso do `to` podemos selecionar o elemento `html` que queremos que o componente vá! 

```vue
<teleport to="body">
	<meu-componente></meu-componente>
</teleport>
```

* Neste exemplo, ao mandar para o `body` iremos mandar para o final do html! para uma semantica melhor!

### Cmpt reutilizável + slot + teleport

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue15.png" alt="vue15" style="zoom:50%;" />

Queremos criar o componente `error-alert` que irá variar a mensagem de erro ao usuário!

```vue
<!-- error-alert -->
<template>
  <dialog open>
    <slot></slot>
    <button @click="this.$emit('close-error');">Okay</button>
  </dialog>
</template>
```

Ou seja, quem implementar o component `error-alert` irá poder colocarr um conteúdo dentro!

```vue
<!-- ManageGoals.vue -->
<template>
	<teleport to="body">
    <error-alert v-if="inputIsInvalid" @CloseError="confirmError">
      <h2>Input is invalid</h2>
      <p>Please enter at least a fwa characters</p>
    </error-alert>
  </teleport>
</template>

<script>
import ErrorAlert from './ErrorAlert.vue';

export default {
  components: { ErrorAlert },
  methods: {
    confirmError() {
      this.inputIsInvalid = false;
    }
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

### Exemplo Simples

Caso queiramos criar um contador com o Vue utilizando dois botões, como fariamos?

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue3.png" alt="vue3" style="zoom:67%;" />

Utilizariamos do `v-on:click` para que a cada clique um `counter` fosse acrescentado ou removido!

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue4.png" alt="vue4" style="zoom:50%;" />

Porém sabemos que o ideal é não deixar o código explicito no `<template>` e sim dentro de `methods`!

* Com o uso do `methods` podemos passar parâmetros!

```javascript
Vue.createApp({
  data(){
    return {
      counter: 0;
    }
  },
  methods: {
    add(num){
      return this.counter = this.counter + num;
    },
    reduce(num){
      return this.counter = this.counter - num;
    }
  }
}).mount("#div");
```

```html
<div id="div">
  <h2> Events in action</h2>
  <button v-on:click="add(5)">Add + 5</button>
  <button v-on:click="rediuce(5)">Add + 5</button>
  <p>
    resulce {{ counter }}
  </p>
</div>
```

### $event - Evento nativo

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue5.png" alt="vue5" style="zoom:70%;" />

E se quisermos capturar o valor digitado? O JavaScript disponibiliza o objeto **`$event`** por padrão nas funções e através do `$event` podemos pegar o `value`!

* Se formos passar um parâmetro na função, preciso deixar explícito o `$event`

```vue
<template>
	<input type="text" @input="getValue($event, 'Romero')" />
	<p>
   Seu nome: {{ nome }}
  </p>
</template>

<script>
	data() {
    return {
      nome: ''
    }
  }
  
  methods: {
    getValue(e, sobrenome) {
      this.nome = e.target.value + ' ' + sobrenome;
    }
  }
</script>
```

### Events Modifiers

Os eventos da diretiva `v-on` possuem modificadores como o `prevent` do evento `submit` que faz com que a página não seja carregada!

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue6.png" alt="vue6" style="zoom:70%;" />

E se quisessemos exibir o nome **somente se apertassemos o ENTER** ? Temos o modificador do `keyup` chamado `enter`!

```vue
<template>
	<button @click="addCounter($event, 10)">Add 10</button>
  <!-- irá ter que clicar com o botão direito -->	
	<button @click.right="removeCounter($event, 5)">Subctract 5</button> 
	
	<p>result: {{counter}}</p>

	<!-- aqui vem o enter -->
	<input type="text" @input="getName" @keyup.enter="getConfirmedName"/> 
	<p>Your name: {{confirmedName}}</p>

	<form @submit.prevent> <!-- essa ação irá prever de atualizar o formulário -->
    <button>Sign Up</button>
  </form>
</template>
```

```javascript
export default {
  data() {
    return {
      name: '',
      confirmedName: '',
      sobrenome: 'sobrenome',
      counter: 0
    }
  },
  methods: {
    getName(e){
      this.name = e.target.value + ' ' + sobrenome;
    },
    getConfirmedName() {
      this.confirmedName = this.name
    }
  }
}
```

## v-once

O `v-once` é utilizado quando não queremos que o elemento seja alterado!

1. Se criarmos outra variável para o `counter` queremos que ela não seja modificada ao clicar no botão!

   ```vue
   <template>
   	<button @click="addCounter($event, 10)">Add 10</button>
   	<button @click.right="removeCounter($event, 5)">Subctract 5</button> 
   	
   	<p>result: {{counter}}</p>
   
   	<!-- aqui implementamos o v-once-->
   	<p v-once>result not modified: {{counter}}</p>
   </template>
   ```

## v-model - two-way binding

O `v-model` substitui → `v-bind:value + v-on:input` <br>

Reset o valor do input

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue7.png" alt="vue7" style="zoom:50%;" />

1. Sem o `v-model`:

   ```vue
   <template>
   	<input type="text" :value="name" @input="getName"/>
   	<button @click="resetValue">Reset Input</button>
   	<p>YourName: {{ name }}</p>
   </template>
   ```

2. Com o `v-model`:

   ````vue
   <template>
   	<input type="text" v-model="name"/>
   	<button @click="resetValue">Reset Input</button>
   	<p>YourName: {{ name }}</p>
   </template>
   ````

Para ambos o script não muda:

```javascript
const app = Vue.createApp({
  data() {
    return {
      name:"",
    }
  },
  methods: {
    resetValue() {
      this.name = ''
    }
  }
});

app.mount("#seuId");
```

## $refs

O Vue possui um elemento chamado `ref` que pode ser utilizado no html, funcionando de forma parecida com o v-model, porém com o `ref` é possível pegar todo elemento do DOM;

Se quisermos pegar a mensagem de um input:

```vue
<input type="text" ref="refText">
<button @click="setValue">Set value</button>
{{ message }}
```

No javascript, acessamos com o `$refs`:

```javascript
methods: {
  setValue() {
    this.message = this.$refs.refText.value;
  }
}
```

* O `$ref.refText.` iria devolver o `<input type="text" ...` ou seja, com o `$ref` poderiamos acessar **todas propriedades do `input`**!
* O `$ref.refText.value` irá **sempre** devolver uma String! 

## Computed Property - manipulando o data()

A `computedProperty` ou `computed:` é utilizada como `output` para o `template`, ou seja, invés de utilizarmos `methods` que irá ser executado toda vez que algum elemento do `data` alterar, utilizamos a `computed` para ser mais performático!

* Quando queremos manipular um dado que esta em `data()` utilizamos do objeto `computed`, onde cada propriedade desse objeto é **obrigatoriamente uma função**;

### Exemplo Simples

Queremos exibir o sobrenome somente se o `name` for digitado no `input`!

```vue
<template>
	<input type="text" v-model="name"/>
	<button @click="resetValue">Reset Input</button>
	<p>YourName: {{ minhaComputedFunction }}</p>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    }
  },
  
  computed: {
	  minhaComputedFunction() {
      if(this.name === "") {
      	return this.name = "";
      }
      return this.name + ' ' + 'Romero'; 
    }
  }
}
</script>
```

* Funcionaria com o `methods`  porém, teriamos um problema de performance, pois outros methods iriam ficar sendo executados em conjunto com esse!

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

Com a computed Property manipularemos o `data()`

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



## Watch

O elemento `watch` permite que seja um `data` quanto um `computed` , basta que seja utilizado o **nome da função** com o mesmo **nome do `data/computed`**!

Dentro da função do `watch` será disponibilizado o `value` que é como o `this`

1. Zere o `counter` após chegar em 50!

   ```vue
   <template>
   	<button @click="addCounter($event, 10)">Add 10</button>
   	<button @click.right="removeCounter($event, 5)">Subctract 5</button> 
   	
   	<p>result: {{counter}}</p>
   </template>
   
   <script>
   export default {
     data() {
       return {
         counter: 0
       }
     },
     
     watch: {
       counter(value) { //mesmo nome da propriedade do data
         if( value > 50 ) { //o value = é igual o this
           value = 0;
         }
       }
     }
   }
   </script>
   ```

   Ou vendo uma **Computed Property**:

   ```javascript
   computed: {
     result() {
       if (this.counter < 37) {
         return "Not there yet!";
       } else if (this.counter > 37) {
         return "Too much!";
       } else {
         return this.counter;
       }
     },
   },
     watch: {
       result() {
         console.log("Executing the watch");
         const that = this;
         setTimeout(() => {
           that.counter = 0;
         }, 2000);
       },
     },
   ```

   

## Manipulando CSS

### Inline Style

O Vue nos permite fazer o `v-bind` do atributo `style` e desta forma, podemos passar uma `computed` property através do style!

* O `:style` recebe um objeto com os valores do CSS!

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue8.png" alt="vue8" style="zoom:50%;" />

Ao clicar o pontilhado do **quadrado fica vermelho**:

```vue
<template>
  <div class="demo" @click="selectBox('A')" :style="makeRedA"></div>
  <div class="demo" @click="selectBox('B')" :style="makeRedB"></div>
</template>

<script>
export default {
 data() {
    return {
      selectedBoxA: false,
      selectedBoxB: false,
    };
  },
  methods: {
    selectBox(value) {
      if (value === "A") {
        this.selectedBoxA = true;
      } else if (value === "B") {
        this.selectedBoxB = true;
      }
    },
  },
  computed: {
    makeRedA() {
      return { borderColor: this.selectedBoxA ? "red" : "#ccc" };
    },
    makeRedB() {
      return { borderColor: this.selectedBoxB ? "red" : "#ccc" };
    },
  },
}
</script>
```

É possível fazer diretamente no HTML também!

```vue
<input type="text" v-model="colorInput"/>
<p :style="{'background-color': colorInput}">Style me inline!</p>
```

O mesmo é possível para o atributo `class`! É possível fazer um `v-bind:class` ;

```vue
<template>
  <div class="demo" :class="{active: selectedBoxA}" @click="selectBox('A')" :style="makeRedA"></div>
  <div class="demo" :class="{active: selectedBoxB}" @click="selectBox('B')" :style="makeRedB"></div>
</template>
```

Ou podemos passar como um **Array**!

```vue
<template>
  <div :class="['demo', {active: selectedBoxA}]" @click="selectBox('A')" :style="makeRedA"></div>
  <div :class="['demo', {active: selectedBoxB}]"@click="selectBox('B')" :style="makeRedB"></div>
</template>
```



### v-show - manipulando display

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

   

### transition - ajudando CSS

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

## Condicionais

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue9.png" alt="vue9" style="zoom:50%;" />

Vue disponibiliza condicionais para podermos **exibir ou não** um componente por exemplo!

Dado o exemplo da imagem:

```vue
<body>
  <header>
    <h1>Vue Course Goals</h1>
  </header>
  <section id="user-goals">
    <h2>My course goals</h2>
    <input type="text" />
    <button>Add Goal</button>
    <p>No goals have been added yet - please start adding some!</p>
    <ul>
      <li>Goal</li>
    </ul>
  </section>
</body>

const app = Vue.createApp({
  data() {
    return { goals: [] };
  },
});

app.mount('#user-goals');
```

### if - else if - else

Exiba a frase `No goals have been added yet - please start adding some!` caso não exista nenhum componente `<li>` e caso exista, exiba-o dentro do card `goal`

1. Usaremos o `if` na tag `p` para verificar se o Array `Goals` possui algo:

   ```vue
   <p v-if="goals.length === 0">
     No goals have been added yet - please start adding some!
   </p>
   ```

2. E `v-else` para indicar caso o array possua algo, é para exibir:

   ```vue
   <ul v-else>
     <li>Goal</li>
   </ul>
   ```

   * O `v-else-if` pode ser utilizado logo após o `v-if` onde será necessário passar uma fórmula!

### v-for

Para exibirmos os valores que foram adicionados no array `goals`  usamos o `v-for`!<br>

Como boa prática, devemos tambem passar o `:key` para que a tag tenha um **identificador único**!

```vue
<ul v-else>
  <li v-for="goal in goals" :key="goal">{{ goal}}</li>
</ul>
```

* O `v-for` disponibiliza o `index` do array, que pode ser útil para caso queiramos remover o elemento!

  ```vue
  <ul v-else>
    <li v-for="(goal, index) in goals" :key="goal">{{ goal}} - {{ index }}</li>
  </ul>
  
  <!-- ira exibir 'goal - 0' para o 1º elemento-->
  ```

* Para remover, podemos utilizar do index e fazer um `splice` do array!

  ```vue
  <ul v-else>
    <li v-for="(goal, index) in goals" :key="goal" @click="remove(index)">
      {{ goal}} - {{ index }}
    </li>
  </ul>
  
  remove(value) {
  	this.goals.splice(value, 1);
  },
  ```

  

#### iterando array de fotos

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

## VueRouter - rotas

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

3. Passaremos o `path` , um `name` para rota e o  nome do `component`;

   1. A Rota `*` indica que caso nao seja localizado o path, irá abrir o component X;
   
   ```javascript
   import Home from './components/view/home/Home';
   import Cadastro from './components/view/cadastro/Cadastro';
   
   export const routes = [
     { path:'', name: 'home', component: Home },
     { path:'/cadastro', name: 'cadastro', component: Cadastro},
     { path:*, component: Home}
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

1. No `routes.js` adicionaremos o `titulo` como um parâmetro e também um boolean `menu` que irá checar se será exibido ou não no menu!

   ```javascript
   export const routes = [
     { path: "", name: "home", component: Home, titulo:"Home", menu:true},
     { path: "/cadastro", name: "cadastro", component: Cadastro, titulo:"Cadastro", menu:true},
     { path: '*', component: Home, menu:false }
   ];
   ```

2. No `Menu.vue` iremos importar o `routes.js` e filtraremos somente aquilo que o `menu=true` para que entao iteraremos sobre ele com o `v-for`;

   1. Faremos apenas um pequeno ajuste ao `to: route.path` , pq o path de `Home` é uma string vazia (`''`);

   ```vue
   <template>
     <nav>
       <ul>
         <li v-for="route of routes" :key="route.path">
           <router-link :to="route.path? route.path : '/'">{{ route.titulo }}</router-link>
         </li>
       </ul>
     </nav>
   </template>
   
   <script>
   import {routes} from '../../../routes'
   
   export default {
   
     data() {
       return {
         routes: routes.filter(rota => rota.menu)
       }
     }
   }
   </script>
   ```

## VueRouter - Vue3

Para o Vue3 é necessário instalar a última versão do `vue-router` ;

```
npm install vue-router@next --save
```

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue17.png" alt="vue17" style="zoom:25%;" />

Há diversas maneiras de criar rota, outra através do Vue-router é com o `createRouter`, que recebe dois parâmetros:

* 1º parâmetro: `history` (createWebHistory) → irá permitir fazer um handler do histórico
* 2º parâmetro: `routes` (array);
  * `routes`: irá receber o `path` e o `component`

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/teams',
      component: () => import('./components/teams/TeamsList.vue')
    },
    {
      path: '/users',
      component: () => import('./components/users/UsersList.vue')
    },
  ]
});

const app = createApp(App);
app.mount('#app');

app.use(router);
```

### router-view

Para que os elementos apareçam pelas rotas, se faz necessário o uso do `router-view` dentro do `App.vue`

```vue
<template>
	<router-view></router-view>
</template>
```

### router-link

Para que não seja realizado uma requisição ao servidor toda vez que for trocado de rota, se é utilizado o `router-link` junto do `to` com a rota:

```vue
<ul>
  <li>
    <!-- <button @click="setActivePage('teams-list')">Teams</button> -->
    <router-link to="/teams">Teams</router-link>
  </li>
  <li>
   <!-- <button @click="setActivePage('users-list')">Users</button> -->
    <router-link to="/users">Users</router-link>
  </li>
</ul>
```

* Por baixo dos panos o Vue renderiza como um `<a href="" />`

#### router-link estilo

O `router-link` tem como padrão uma classe para identificar quando ativo, o `router-link-active`

```css
a.router-link-active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
```

### $router - redirecionando

O `vue-router` habilita métodos globais, como o:

* `$router.push` que nos permite direcionar para outra página;
* `$router.forward()` avança a página;
* `$router.back()` volta a página;

```vue
<template>
	<button @click="redirect">Confirm</button>
</template>

<script>
  methods: {
    redirect () {
      this.$router.push('/teams');
    }
  }
</script>
```

### $route - params

O `vue-router` também deixa disponível o:

* `$route.path` → irá exibir o path da URL;
* `$route.params.nameParam` → irá recuperar o parâmetro passado na URL (precisa coincidir com o parâmetro passado no `routes`);

```javascript
// main.js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path:'/teams/:teamId',
      component: () => import('./components/teams/TeamMembers.vue')
    }
  ]
});
```

Acessando a rota `/teams/1` podemos acessa-la e carregar determinado componente:

```vue
<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: [ 'teams', 'users' ],
  components: { UserItem },
  data() {
    return {
      teamName: '',
      members: []
    }
  },
  created () {
    console.log(this.$route.path) // retorna /teams/1
    const id = this.$route.params.teamId;
    const selectedTeam = this.teams.find(team => team.id === id);
    const members = selectedTeam.members;
    const selectedMembers = [];
    for (const member of members) {
      const selectedUser = this.users.find(user => user.id === member);
      selectedMembers.push(selectedUser);
    }
    this.members = selectedMembers;
    this.teamName = selectedTeam.name;
  }
};
</script>
```

#### router-link + id

Dado os itens, queremos que ao clicar sermos redirecionado para a rota em específico. A rota para `teams/:id` já existe, portanto a lógica ficaria no `router-link`.

```vue
<!-- TeamList -->
<template>
  <ul>
    <teams-item
      v-for="team in teams"
      :key="team.id"
      :id="team.id"
      :name="team.name"
      :member-count="team.members.length"
    ></teams-item>
  </ul>
</template>

<!-- TeamItem -->
<template>
    <router-link :to="'/teams/' + id">View Members</router-link>
</template>

<script>
export default {
  props: ['id'],
};
</script>
```

### $route + watch

Pode existir cenários onde de uma rota (de um `param`) é necessário ir para outra rota, por exemplo:

* `/teams/1` → `/teams/2`

E o Vue **não irá carregar** a página novamente :thinking:

Para corrigir este tipo de problema, devemos utilizar do **watch + `route`** para que escutemos a rota caso ela seja alterada!

```vue
<script>
  methods: {
    loadData(newRoute) {
      const id = newRoute.params.teamId;
      const selectedTeam = this.teams.find(team => team.id === id);
      const members = selectedTeam.members;
      const selectedMembers = [];
      for (const member of members) {
        const selectedUser = this.users.find(user => user.id === member);
        selectedMembers.push(selectedUser);
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    }
  },
  created () {
   this.loadData(this.$route);
  },
  watch: {
    $route(newRoute) {
      this.loadData(newRoute)
    }
  }
</script>
```

### route + props

Invés de utilizarmos do `$route` podemos habilitar a rota para passar como uma `props`, basta setarmos como `props:true` a rota:

```javascript
{
  path:'/teams/:teamId',
  component: () => import('./components/teams/TeamMembers.vue'),
  props: true
}
```

E no componente que quiser utilizar esse `param:` `teamId` basta declarar a `prop` com o mesmo nome do `param`:

```vue
<!-- TeamMember.vue -->
<script>
  props: [ 'teamId' ],
  created () {
   this.loadData(this.teamId);
  },
  watch: {
    teamId(newId) {
      this.loadData(newId)
    }
  },
  methods: {
    loadData(id) {
      const selectedTeam = this.teams.find(team => team.id === id);
      const members = selectedTeam.members;
      const selectedMembers = [];
      for (const member of members) {
        const selectedUser = this.users.find(user => user.id === member);
        selectedMembers.push(selectedUser);
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    }
  }
</script>
```

### redirect / alias

É possível realizar um redirecionamento com o `redirect` quando acessamos uma rota:

```javascript
{ path: '/', redirect: '/teams' }
```

* Quando acessaar `localhost:8080/` irá ser redirecionado para `teams`

Um outro modo caso queiramos manter a rota `localhost:8080` exibindo o `teams` é o uso do **`alias`**:

```javascript
{
  path: '/teams',
  component: () => import('./components/teams/TeamsList.vue'),
  alias: '/'
},
```

* Quando acessaar `localhost:8080/` irá ser exibir o conteúdo do component  `teamsList`

### rota 404

Para rotas que não existem, podemos fazer com que seja exibido um componente:

```javascript
{ path: '/:notFound(.*)', component: () => import('./components/nav/NotFound.vue') }
```

```vue
<template>
  <div>
    <h2>Page not found, try to come back to the 
      <router-link to="/teams"> Teams</router-link>
  	</h2>
  </div>
</template>
```

### Rota Filha - nested route



![vue18](/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue18.png)



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

### Custom event + parameter

Quando trabalhamos com banco de dados, usualmente precisamos fazer uso do ID para que seja X alteração e através de um **eventos customizado** é possível passar parâmetros tbm!

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue11.png" alt="vue11" style="zoom:50%;" />

Dado o componente `FriendList.vue` que recebe os valores do `App.vue` (onde possui o banco de dados). Como faremos para que ao clique do `Toggle Favorite` (`FriendList`) seja alterado o status no BD (`App.vue`)?

```vue
<template>
  <li>
    <h2>{{ friend.name }}</h2>
    <button>Toggle Favorite</button>
    <button @click="toggleDetails">Show Details</button>
    <ul v-if="detailsAreVisible">
      <li>
        <strong>Phone:</strong>
        {{ friend.phone }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ friend.email }}
      </li>
    </ul>
  </li>
</template>
```

Utilizamos dos eventos customizados + passando um parâmetro (`id`)!

1. No Click do button em `FriendList` iremos utilizar do `this.$emit` para que o `App.vue` escute e altere no BD:

   ```vue
   <button @click="toggleFavorite">Toggle Favorite</button>
   
   <script>
     props: {
       id: {
         type: Number,
         required: true
       }
     }
   	methods: {
       toggleFavorite() {
         this.$emit('toggle-favorite', this.id)
       }
     }
   </script>
   ```

2. No `App.vue` iremos escutar o `toggle-favorite` ;

3. Procurar no Array, com o `find` e alterar o status!

   ```vue
   <!-- App.vue -->
   <template>
   	<FriendList @toggle-favorite="changeFavorite"></FriendList>
   </template>
   <script>
   	import FriendList from './FriendList.vue';
     
     components: { FriendList },
     data() {
       return {
         friend = [
         	{
         		isFavorite = true;
       		}
         ]
       }
     }
     methods: {
       changeFavorite(numberId){
         const friend = this.friendsData.find(friend => this.id === numberId);
         friend.isFavorite = !friend.isFavorite
       }
     }
   </script>
   ```

### Emits

Temos uma outra propriedade do Vue, que serve para **validarmos o evento customizado**, chamada `emits`:

```vue
<script>
	emits: ['nome-evento-customizado']
</script>
```

Onde é possível serem feitas validações para os eventos customizado (usual quando trabalhado com times):

```vue
<script>
	methods: {
    toggleFavorite() {
      this.$emit('toggle-favorite', this.id)
    }
  },
    
  emits: {
    toggle-favorite: function(id) {
      if(id) return true;
      else {
        console.warn('faltou enviar o ID');
        return false;
      }
    }
  }
</script>
```

### Simples formulario

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue12.png" alt="vue12" style="zoom:50%;" />

O evento customizado pode ser utilizado para comunicar dados de um formulario para o componente pai!

1. Criar o `NewFriend.vue` com o template:

   ```vue
   <template>
   	<form @submit.prevent="addFriend">
   		<label>Name</label>
   		<input type="text" v-model="friendName"/>
     </form>
   </template>
   
   <script>
   	data() {
       return {
         friendName: ''
       }
     },
   </script>
   ```

2. Com o uso do `this.$emit` iremos ao `submit` do formulario, emitir um `add-new-friend`, passando como parâmetro o `friendName`:

   ```vue
   <template>
   	<form @submit.prevent="addFriend"/>
   	<!-- omitido -->
   </template>
   <script>
   	data() {
       return {
         friendName: ''
       }
     },
     emits: ['add-new-friend'],
   	methods: {
       addFriend() {
         this.$emit('add-new-friend', this.friendName);
       }
     }
   </script>
   ```

3. Agora no `App.vue` iremos importar esse componente e então escutar o evento `add-new-friend`:

   ```vue
   <!-- App.vue -->
   <template>
   	<NewFriend @add-new-friend="addFriend" />
   </template>
   
   <script>
   	methods: {
       addFriend(nameFromForm) {
         const newFriend = { name: nameFromForm };
         this.friend.push(newFriend);
       }
     }
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

   

## + sobre props

### Validando Props

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


### Binding all props

Dado um componente filho, `UserData`:

```vue
<template>
  <h2>{{ firstname }} {{ lastname }}</h2>
</template>
 
<script>
  export default {
    props: ['firstname', 'lastname']
  }
</script>
```

Podemos fazer com que no `template` do Componente pai, seja carregado um objeto com todas as props do objeto filho!

```vue
<template>
  <user-data v-bind="person"></user-data>
</template>
 
<script>
  export default {
    data() {
      return {
        person: { firstname: 'Max', lastname: 'Schwarz' }
      };
    }
  }
</script>
```

## Provide + Inject

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue13.png" alt="vue13" style="zoom:48%;" />

No cenário acima, o componente `App` possui os dados (os `topics`) e o componente `KnowledgeGrid` precisa desses `topics` para preencher o `knowledgeElement`

```vue
<!-- knowledgeElement -->
<template>
  <li>
    <h3>{{ topicName }}</h3>
    <p>{{ description }}</p>
    <button @click="$emit('select-topic', id)">Learn More</button>
  </li>
</template>

<!-- knowledgeGrid -->
<template>
  <ul>
    <knowledge-element
      v-for="topic in topics"
      :key="topic.id"
      :id="topic.id"
      :topic-name="topic.title"
      :description="topic.description"
      @select-topic="$emit('select-topic', $event)"
    ></knowledge-element>
  </ul>
</template>

<!-- KnowledgeBase -->
<template>
  <section>
    <h2>Select a Topic</h2>
    <knowledge-grid :topics="topics" @select-topic="$emit('select-topic', $event)" />
  </section>
</template>

<!-- App -->
<template>
  <div>
    <knowledge-base :topics="topics" @select-topic="activateTopic" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      topics: [
        {
          id: 'basics',
          title: 'The Basics',
          description: 'Core Vue basics you have to know',
          fullText:
            'Vue is a great framework and it has a couple of key concepts: Data binding, events, components and reactivity - that should tell you something!',
        },
      ]
   }
}
</script>
```

**PORÉM**, existe o `knowledgeBase` entre o `App` e `knowledgeGrid`, então como fazer para passar o `topics` de `App` para o `knowledgeGrid` ? podiamos ir passando através das `props` , mas encheremos o componente com valores desnecessário :thinking:;<br>

O Vue possui dois elementos cruciais para comunicação de componentes! O `provide()` e o `inject`!<br>

* O `provide()` é utilizado no **componente pai**;
* O `inject: []` é utilizado no **componente filho**, ou seja, o `provide` sempre tem que vir de um componente acima do componente a ser utilizado!

### Utilizando Provide + Inject p/ Props

1. Dentro de `App.vue` iremos colocar declarar o `provide` (parecido com o `data()`):

   ```javascript
   provide() {
     return {
   	  topics: this.topics //iremos devolver o que vem do data()
     }
   },
   ```

2. Dessa forma, no `knowledgeGrid` podemos remover o `props` e utilizar o `inject`;

   1. O `inject` precisa receber o mesmo valor do `provide`

   ```javascript
   export default {
     inject: ['topics'],
   }
   ```

### Provide + inject p/ custom Events

É possível também fazer o `provide` e `inject` para eventos customizados! evitando que eventos sejam passados de componente para componente sem necessidade!

1. Remova `@select-topic` de todos os componentes;

2. Em `KnowledgeElement` utilizaremos do `inject` no lugar do `emits` , pois ali estaremos esperando receber do `provide`:

   ```javascript
   // knowledgeElement
   export default {
     props: ['id', 'topicName', 'description'],
     inject: ['selectTopic'],
   };
   ```

3. Em `App.vue`:

   ```javascript
   provide() {
     return {
       topics: this.topics,
       selectTopic: this.activateTopic
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
        <router-link :to="{ name: 'home'}"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
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



### Capturando dados

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

2. Para capturar os valores, devemos usar do. `@submit.prevent="suaFuncao()"`  irá previnir que a página recarregue

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

   

### v-model - na pratica

O `v-model` serve para fazer a comunicação do `template` para o `script` e vice-versa, ou seja, o que tinhamos:

```vue
<input @input="foto.titulo = $event.target.value" :value="foto.titulo"/>
```

Agora pode se tornar:

```vue
<input v-model="foto.titulo"/>
```

**PORÉM,** se percebemos o que acontece no `input v-model="foto.url"` iremos ter um problema...<br>

Devemos utilizar o `.lazy` para que seja inserido o valor **após sairmos do input!** Se não iremos ficar mandando ao servidor cada letra!

```vue
<input v-model.lazy="foto.titulo"/>
```

#### v-model - diferentes inputs

<img src="/Users/igorromero/NotesInGeneral/Vue/imagesReadme/vue16.png" alt="vue16" style="zoom:50%;" />

Dado diferente tipos de input, como funcionaria o `v-model` ?

#### text

O `v-model` irá interpretar como `String` devido o `input type="text"`

```vue
<form @submit.prevent="submitData">
    <input type="text" v-model="inputText"/>
</form>

<script>
export default {
  data() {
    return {
      inputText: ''
    }
  },
  methods: {
    submitData() {
      console.log('inputText: ' + this.inputText)
      // IRÁ RETORNAR O QUE FOI DIGITADO
      inputText: ''
      // IRÁ RETORNAR AO ESTADO ORIGINAL
    }
  }
}
</script>
```



#### number

O `v-model` irá interpretar como `Number` devido o `input type="number"`

* Na declaração do `data() ` devemos deixa como `null` para que o `typeOf` continue como `number`

```vue
<form @submit.prevent="submitData">
    <input type="number" v-model="inputNumber"/>
</form>

<script>
export default {
  data() {
    return {
      inputNumber: null
    }
  },
  methods: {
    submitData() {
      console.log('inputNumber: ' + this.inputNumber + ' - typeof: ' + typeof(this.inputNumber))
      // IRÁ RETORNAR "inputNumber: 0 - typeof: number"
      inputNumber: null
      // IRÁ RETORNAR AO ESTADO ORIGINAL
    }
  }
}
</script>
```



#### select

Todo `select` irá ter `option` que consequentemente exige um `value`. Quando utilizamos `v-model` no `select` , o Vue irá procurar pelo `value` do `option` ! Dessa forma, podemos iniciar o `select` passando um dos `value`

```vue
<form @submit.prevent="submitData">      
  <select name="referrer" v-model="selectType">
    <option value="google">Google</option>
    <option value="wom">Word of mouth</option>
    <option value="newspaper">Newspaper</option>
  </select>
</form>

<script>
export default {
  data() {
    return {
       selectType: 'google'
    }
  },
  methods: {
    submitData() {
      console.log('selectType: ' + this.selectType)
      // IRÁ RETORNAR O QUE SELECIONADO
      selectType: 'google'
      // IRÁ RETORNAR AO ESTADO ORIGINAL
    }
  }
}
</script>
```



#### checkbox

Os `checkbox` funcionam de forma parecida ao  `select`, para:

* agrupa-los utilizamos do `name`;
* ter um valor único, utilizamos do `value`;
* utilizar do memso  `v-model` em todos `checkbox`;
* no `data` devemos declarar um como `array` pois o Vue quem irá popular e remover do array:

```vue
<form @submit.prevent="submitData">      
	<div>
    <input name="interest" type="checkbox" value="news" v-model="interested"/>
    <label>News</label>
  </div>
  <div>
    <input name="interest" type="checkbox" value="tutorials" v-model="interested"/>
    <label>Tutorials</label>
  </div>
  <div>
    <input name="interest" type="checkbox" value="nothing" v-model="interested"/>
    <label>Nothing</label>
  </div>
</form>

<script>
export default {
  data() {
    return {
       interested: []
    }
  },
  methods: {
    submitData() {
      console.log('interested: ' + this.interested)
      // IRÁ RETORNAR O QUE SELECIONADO
      this.interested = []
      // IRÁ RETORNAR AO ESTADO ORIGINAL
    }
  }
}
</script>
```



#### radio

Radio funciona da mesma maneira que funciona o checkbox, precisamos:

* Dar um `value` para cada  `input`;
* `v-model` com o mesmo valor;

```vue
<form @submit.prevent="submitData">      
  <h2>How do you learn?</h2>
  <div>
    <input id="how-video" name="how" type="radio" value="video" v-model="how"/>
    <label for="how-video">Video Courses</label>
  </div>
  <div>
    <input id="how-blogs" name="how" type="radio" value="blog" v-model="how"/>
    <label for="how-blogs">Blogs</label>
  </div>
  <div>
    <input id="how-other" name="how" type="radio" value="other" v-model="how"/>
    <label for="how-other">Other</label>
  </div>
</form>

<script>
export default {
  data() {
    return {
       how: null
    }
  },
  methods: {
    submitData() {
      console.log('how they learn: ' + this.how)
      // IRÁ RETORNAR O QUE SELECIONADO
      this.how = null
      // IRÁ RETORNAR AO ESTADO ORIGINAL
    }
  }
}
</script>
```



#### *component

E se quisermos capturar o valor de outro componente? Podemos usar o `v-model` no componente?

Para utilizarmos o `v-model` em um componente customizado, teremos que:

* Utilizar de `props`;

* Utilizar do `this.$emit` passando **obrigatoriamente** o nome da `props` junto com `update`

  ```javascript
  export default {
    props: ['modelValue'],
    methods: {
      setActived(value) {
        this.$emit('update:modelValue', value)
      }
    }
  };
  ```

Seguindo com o template, teriamos os botões customizados:

```vue
<!-- RaitingControl.vue -->
<template>
  <ul>
     <li :class="{active: modelValue === 'poor'}">
      <button type="button" @click="setActived('poor')">Poor</button>
    </li>
     <li :class="{active: modelValue === 'average'}">
      <button type="button" @click="setActived('average')">Average</button>
    </li>
    <li :class="{active: modelValue === 'great'}">
      <button type="button" @click="setActived('great')">Great</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['modelValue'],
  methods: {
    setActived(value) {
      this.$emit('update:modelValue', value)
    }
  }
};
</script>
```

No componente Pai, teriamos que somente utilizar o `v-model` passando o parâmetro que quiséssemos (imbutido no `v-model` estariamos recebendo o `value` que foi passado pelo `$emit`)

```vue
<!-- TheForm -->
<form @submit.prevent="submitData">
  <div class="form-control">
    <rating-control v-model="raiting"></rating-control>
  </div>
</form>

<script>
import RatingControl from './RatingControl'

components: {
    RatingControl
},
methods: {
  submitData() {
    console.log('component value: ' + this.raiting)
    // IRÁ RETORNAR O QUE value
    this.raiting = null
  }
}
</script>
```



### v-show - na pratica

O `v-show` permite que o elemento fique como `hide` caso seu valor seja `null` ou vazio (funciona como um `v-if`)

1. Para o `<imagemResponsiva` atribua o `v-show`

   ```vue
   <imagem-responsiva v-show="foto.url" :url="foto.url" :descricao="foto.descricao"/>
   ```

### Validando formulário

Para utilizar a validação do formulário utilizamos **Vee-Validate**:

```bash
npm install vee-validate
```

Então devemos importa-lo no `main.js`:

```javascript
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';

//Disponibiliza globalmente ambos
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
```

Com o `ValidationProvider` e `Observer` sendo disponibilizado globalmente, podemos utilizar no `<template> `

```vue
<validationObserver v-slot="{ handleSubmit }">
  <form @submit.prevent="handleSubmit(grava)">
    <div class="controle">
      <label for="titulo">TÍTULO</label>
      <validation-provider rules="required|minmax:3,20" :bails="false"v-slot="{errors}">
        <input name="titulo" id="titulo" autocomplete="off" v-model.lazy="foto.titulo"/>
        <span class="erro">{{ errors[0] }}</span>
      </validation-provider>
      
      <validation-provider rules="required" :bails="false"v-slot="{errors}">
        <input name="url" id="url" autocomplete="off" v-model.lazy="foto.url"/>
        <span class="erro">{{ errors[0] }}</span>
      </validation-provider>
      
    </div>
  </form>
</validationObserver>
```

Agora para impedir que seja feito o `submit`

## Model

Dentro do Vue, podemos fazer uso de **Modelos**, desta forma não é necessário ficar declanado objetos na 'mão', como foi feito com o `foto: {}`;

1. Criaremos o `Foto.js` → `src/domain/model/foto/Foto.js`;

2. Entao declararemos a classe, com um `constructor`, passando os parâmetros que utilizamos:

   ```javascript
   export default class Foto {
     constructor(url = "", titulo = "", descricao = "") {
       this.url = url;
       this.titulo = titulo;
       this.descricao = descricao;
     }
   }
   ```

3. No `Cadastro.vue` iremos no lugar de `foto: {}` instaciaremos a classe `Foto`:

   ```vue
   <script>
   import Foto from "../../../model/foto/Foto";
   
   export default {
   
     data() {
       return {
         foto: new Foto()
       };
     },
   
     methods: {
       gravar() {
         console.log(this.foto);
         this.foto = new Foto();
       }
     }
   };
   </script>
   ```




## HTTP - VueResource 

### Centralizar URL

Para não precisarmos ficar declarando o `http://localhost:3000/` , podemos  mapear no `main.js` a URI da aplicação!

1. Dentro de `main.js` → através do `Vue` iremos utilizar o método `http`

   ```javascript
   Vue.use(VueResource);
   Vue.use(VueRouter);
   Vue.http.options.root = 'http://localhost:3000';
   ```

Agora basta que seja feito o CRUD no `FotoService` utilizando o `this._resource`!

## Service - $resource

Seguindo o padrão MVC, precisamos deixar em um só local aquilo que for referente a API, para isso existe a camada **Service**.<br>

Um objeto especializado em trabalhar com **requisições HTTP é o `$resource`**, portanto iremos utiliza-lo em nosso `FotoService`.

* O `$resource` irá possuir métodos como:
  * `save(seuObjeto)` → funcionará como um POST;
  * `query()` → funcionará como GET;
  * `delete(id)` → funcionará como o DELETE;
  * `update({ id: foto_id }, seuObjeto)` → funcionará como o PUT;
  * `get( { id } )` → funcionará como um GET específico para parâmetros;

**PORÉM,** o `$resource` é um recurso do Vue e não do JS, então para ser utilizado no Service, deveremos recebe-lo no `constructor`;

1. Criaremos o `FotoService.js` → `src/domain/service/foto/FotoService.js` que irá receber o `resource` como parâmetro;

2. Como todos os endpoints da API seguem `v1/fotos{/id}` , iremos passar para o  `resource` esse path;

   1. Quando utilizamos o `{/id}` informamos que é um parâmetro que **pode ou não** vir a aparecer e a barra `/` significa é utilizada pq o backend utiliza → `http://localhost:3000/v1/fotos/id`

   ```javascript
   export default class FotoService{
   
     constructor(resource) {
       this._resource = resource('v1/fotos{id}');
     }
   
   }
   ```

<br>

### CRUD

#### Read

```javascript
// FotoService.js
export default class FotoService{

  constructor(resource) {
    this._resource = resource('v1/fotos{id}');
  }
  
  lista() {
    return this._resource
    	.query()
    	.then(
      	res => res.json(),
      	err => {
          console.log(err);
          throw new Exception("Erro ao carregar imagens");
    		}
    	);
  }

}
```

```vue
<!-- Home.vue -->
<script>
export default {
  
  data() {
    return {
      fotos =[]
    }
  }
  
  created() {
    this.service = new FotoService();
    this.service
    	.lista()
    	.then(fotos => this.fotos = fotos)
  }
}
</script>
```



#### Delete

Para remover a foto, do lado do `Home.vue` teremos uma particularidade para a página ser 'atualizada'. Teremos que **remover do array, após executar o método!**

1. Precisamos pegar pelo `indexOf` a posição que esta a foto;
2. Com o `indice` , podemos utilizar do `splice` para remover o Array!

```javascript
// FotoService.js
export default class FotoService{
  
  constructor(resource){
    this._resource = resource("v1/foto{/id	}");
  }
  
  remove(id) {
    return 
    	this._resource
        	.delete({ id })
        	.then(null, err => {
            console.log(err);
            throw new Error("Não foi possível excluir a imagem");
          });
  }
}
```

```vue
<!-- Home.vue -->
<template>
  <!-- omitido -->
  <meu-button tipo="button" descricao="remover" @botaoAtivado="remove(foto)" />
	
	<!-- @botaoAtivado é devido o Button.vue estar esperando esse evento para acionar o botao -->
    <!-- 
			<button :class="estiloDoBotao" :type="tipo" @click="disparaAcao()">

			methods: {
        disparaAcao() {
          this.$emit('botaoAtivado')
        }
      },
    -->
</template>

<script>
import FotoService from "../../../domain/service/foto/FotoService";
  
export default {
  data() {
    return {
      fotos = [],
      mensagem = ''
    }
  }
  
 methods: {
    remove(foto) {
      this.service
        .remove(foto._id)
        .then(
          () => {
            let indice = this.fotos.indexOf(foto)
            this.fotos.splice(indice, 1);
            this.mensagem = "Foto removida com sucesso";
            },
          err => this.mensagem = err.message
        );
    }
  },
  
  created() {
    this.service = new FotoService();
    //omitido
  }
}
</script>
```



#### Create

```javascript
export default class FotoService {
  
  constructor(resource) {
    this._resource = resource("v1/foto{/id}");
  }
  
  cadastra(foto) {
    return this._resource.save(foto).then(null, err => {
      console.log(err);
      throw new Error("Não foi possível salvar a imagem");
    });
  }
}
```

```vue
<!-- Cadastro.vue -->
<template>
	<form @submit.prevent="gravar()">
  	<input v-model.lazy="foto.titulo" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      foto = {}
    }
  }
  
  
  methods: {
    gravar() {
      this.service
        .cadastra(this.foto)
        .then(
        	() => this.foto = new Foto(),	//this.foto = new Foto() irá apagar os valores        
        	err => this.mensagem = err.message
      	);
    }
  },
  
  created() { 
  	this.service = new FotoService();
  }
}
</script>
```



#### Update

O `update`/alteração precisamos manipular:

* `routes.js` → criaremos uma rota para a mesma tela de cadastro, passando o `:id`;

* `FotoService.js` → criaremos o método para alterar a foto. 1º precisaremos encontrar a `Foto` pelo `id` com o `get` e depois utilizar do `

* `Home.vue` → criaremos um botão, com o `router-link` para a rota mapeada acima, com o objeto `params` contendo o `foto._id`, dessa foto `Cadastro` poderá consumir o `id`;

*  `Cadastro.vue` → Precisará através do `$route` (objeto do **global view object** VueRouter) capturar o `id` da rota; Com o `id` mapeado iremos fazer uso do `getFotoById` do `FotoService`;

  

```javascript
// routes.js
import Cadastro from "./components/view/cadastro/Cadastro";

export const Routes = [ 
	{ path: "/cadastro", name: "cadastro", component: Cadastro, titulo:"Cadastro", menu:true},
  { path: "/cadastro/:id", name: "alteracao", component: Cadastro, titulo:"Cadastro", menu:false},
]
```

```javascript
// FotoService.js
export default class FotoService {
  
  constructor(resource) {
    this._resource = resource("v1/fotosq{/id}");
  }
  
  //codigo omitido
  getFotoById(id) { 
  	return _resource
    	.get({ id })	// get irá devolver uma promise
    	.then(res => res.json());
  }
  
  cadastra(foto) {
    if(foto._id) {
      return this._resource
        .update( {id: foto._id } , foto)
        .then(null, err => {
          console.log(err);
          throw new Error('Não foi possível alterar a imagem')
        });
    } else {
      return this._resource
        .save(foto)
        .then(null, err => {
          console.log(err);
          throw new Error('Não foi possível salvar a imagem')
        });
    }
  }
}
```



```vue
<!-- Home.vue -->
<template>

	<!-- codigo omitido -->
  <router-link :to="{name: 'alteracao', params: { id: foto._id}}">
    <botao-customizado descricao="ALTERAR" tipo="button" />
  </router-link>

</template>
```

```vue
<!-- Cadastro.vue -->

<script>
  
  data() {
    return {
      id: this.$route.params.id
    };
  },
    
  created() {
    this.service = new FotoService(this.$resource);
    if (this.id) {
      this.mensagem = "Alterando a foto";
      this.service.getFotoById(this.id).then(foto => (this.foto = foto));
    }
  }
</script>
```



## Firebase

[Firebase](https://console.firebase.google.com/u/0/?pli=1) nos permite a criação de um backend, ou neste caso, de um simples banco de dados na nuvem que irá receber um `.json`;

1. No Firebase → Go to Console;
2. Crie um projeto, coloque um nome;
3. Vá em `Realtime Database` → Criar Banco de Dados → Teste Mode;

O FireBase irá disponibilizar uma URL para ser utilizada, que deverá ser sempre adicionado um `.json` no final de cada requisição!

* Ex.: `https://vue-http-demo-igorgrv-default-rtdb.firebaseio.com/requisicao.json`

## HTTP - Outras formas

### fetch

O `fetch` é outro meio de se realizar requisições http, **nativo do Vue** , ao contrário de como é feito com o `VueResource` que de ser instalado...

Com o `fetch` seguimos o padrão:

1. URL
2. Objeto Javascript:
   1. Método com `method` (`GET POST DELETE`)
   2. Headers (objeto javascript)
   3. Body (com o formato `json` → `JSON.stringify`)

#### POST

```javascript
fetch('https://vue-http-demo-igorgrv-default-rtdb.firebaseio.com/surverys.json',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName: this.enteredName,
      rating: this.chosenRating
    })
  }
)).then((res) => {
  if(res.ok) console.log('fetched')
  else throw new Error('Falha ao fazer o fetch')
}).catch((error) => {
  console.error(error);
  this.error = error.message;
});
```

#### GET

Como o `fetch` devolve uma `Promise` podemos utilizar do `then` para iterar nas respostas, bem como o `catch`:

* No caso do FireBase, iremos receber um `json` que precisa ser formatado para um objeto Javascript, com o `json()`, onde para cada Id iremos atribuir a um array;

```javascript
loadExperiences() {
  fetch('https://vue-http-demo-igorgrv-default-rtdb.firebaseio.com/surverys.json')
    .then(res => {
    	if(res.ok) return res.json()
  	})
    .then(data => {
      const results = []
      for(const id in data) {
        results.push({
          id: id,
          rating: data[id].rating,
          name: data[id].userName
        })
      }
      this.results = results
  	})
  	.catch((error) => {
      console.error(error);
      this.isLoading = false;
      this.error = 'Falha ao fazer o fetch'
  	});
}
```

##### Carregar dados antes de exibir a tela

Com o uso do life cycle do Vue, podemos carregar os dados recuperados do backend/banco de dados, com o uso do `mounted`

```javascript
mounted() {
  this.loadExperiences();
}
```

##### Loading message

Um modo simples de exibir uma mensagem enquanto está sendo feito o `fetch` é atribuir uma mensagem de loading:

1. No template, adicionaremos um `loading` simples;
2. Faremos um binding com a propriedade `isLoading`;
3. Setaremos com true para quando estiver prestes a fazer o fetch e como false quando terminar

```vue
<template>
      <p v-if="isLoading">Loading...</p>
      <ul v-else>
        <survey-result
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></survey-result>
      </ul>
</template>

<script>
export default {
  data() {
    return {
      results: [],
      isLoading: false
    };
  },
  methods: {
    loadExperiences() {
      this.isLoading = true
      fetch('https://vue-http-demo-igorgrv-default-rtdb.firebaseio.com/surverys.json')
      .then(res => {
        if(res.ok) return res.json()
      })
      .then(data => {
        this.isLoading = false
</script>
```



### axios

Assim como `VueResource` e `fetch` existe o [axios](https://github.com/axios/axios)!

1. Instalar o `axios` no projeto → `npm i axios`
2. No componente que for utilizar o `axios` :
   1. Importar o `axios` 
   2. Utilizar dos métodos http

```javascript
import axios from 'axios';

axios.post('https://vue-http-demo-85e9e.firebaseio.com/surveys.json', {
  name: this.enteredName,
  rating: this.chosenRating,
});
```

Com o `axios` escrevemos menos código se comparado ao `fetch`

## Lazy loading

O lazy loading no Vue é bem simples, basta que seja feita a alteração no `routes.js`!

1. Invés de utilizarmos do `import XX from 'x'` utilizaremos do `System.import('./pathClasse')`;

   ```javascript
   //import Cadastro from "./components/view/cadastro/Cadastro";
   const Cadastro = () => System.import('./components/view/cadastro/Cadastro.vue')
   ```




## Componente Global vs Local

Componente simples:

```vue
<!-- meuComponent.vue -->
<template>
	<input type="text" placeholder="faço algo">
</template>
```

### Import local

```vue
<!-- outroComponent -->
<template>
	<meu-component></meu-component>
</template>

<script>
import MeuComponent from './meuComponent.vue'
export default {
  components: [MeuComponent]
}
</script>
```

### Import Global

```javascript
// main.js
import MeuComponent from './components/meuComponent.vue'

const app = createApp(App);
app.component('meu-component', MeuComponent);
```

* Estará disponível a tag `meu-component` para todos outros componentes utilizarem!



## Animações

