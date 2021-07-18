# Carbon Design System

1. Fork → https://github.com/igorgrv/carbon-tutorial-vue

2. Clone;

3. `git remote add upstream https://github.com/carbon-design-system/carbon-tutorial-vue.git`

4. `git remote -v`

   1. Deverá retornar algo:

      ```git
      origin  [your forked repo] (fetch)
      origin  [your forked repo] (push)
      upstream    git@github.com:carbon-design-system/carbon-tutorial-vue.git (fetch)
      upstream    git@github.com:carbon-design-system/carbon-tutorial-vue.git (push)
      ```

## Getting start with Carbon

1. Rodar `yarn` dentro do projeto;

2. `yarn serve` → para subir o projeto

3. Instalar o `carbon`:

   ```bash
   --vue 
   yarn add carbon-components @carbon/vue @carbon/icons-vue
   
   --react
   yarn add carbon-components carbon-components-react @carbon/icons-react carbon-icons
   
   --reactTypescript
   yarn add @types/carbon-components-react
   ```

4. Instalar o preprocessador para o SASS

   ```bash
   --vue
   yarn add node-sass sass-loader
   
   --react
   yarn add sass@1.32.12
   ```

<br>

Para evitar ter que importar o SCSS da `mode_modules` com o uso do `~`

1. Criar `.env` na raíz do projeto;

   ```json
   SASS_PATH=./node_modules
   ```

2. Criar a pasta `src/style` → adicionar o file `_carbon.scss` ;

   ```scss
   @import 'carbon-components/scss/globals/scss/styles';
   ```

3. Alterar o `style` do  `App.vue` :

   ```vue
   <style lang="scss">
   	@import "./styles/carbon";
   </style>
   ```

4. Adicionar o `CarbonComponentesVue` dentro do main:

   ```javascript
   import CarbonComponentsVue from '@carbon/vue';
   Vue.use(CarbonComponentsVue);
   ```



## Componentes

### Um botão do Carbon

Com o Carbon ja importado no `main` , podemos fazer uso dos componentes fornecidos!

1. Em `App.vue` importe o `CvButton`

   ```vue
   <template>
     <div id="app">
       <CvButton>Button</CvButton>
     </div>
   </template>
   
   <script>
   import { CvButton } from '@carbon/vue';
   export default {
     components: {
       CvButton
     }
   };
   </script>
   ```

   * Isso fará com que ja seja exibido o botão com o estilo padrao do Vue!

### Um Header

1. Crie `src/componentes/`

   ```
   src/components/TutorialHeader
   └──TutorialHeader.vue
   ```

2. Dentro de `TutorialHeader` iremos adicionar alguns **icones** e fazer o uso do [CvUIShell](https://vue.carbondesignsystem.com/?path=/story/components-cvuishell--header-base)

   ```vue
   <template>
     <cv-header aria-label="Carbon header">
       <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />
       
       <cv-skip-to-content href="#main-content">
         Skip to content
       </cv-skip-to-content>
       
       <cv-header-name to="/" prefix="IBM">
         Carbon Tutorial
       </cv-header-name>
   
       <cv-header-nav aria-label="Carbon nav">
         <cv-header-menu-item to="/repos">
           Repositories
         </cv-header-menu-item>
       </cv-header-nav>
   
       <template v-slot:header-global>
         <cv-header-global-action
           aria-label="Notifications"
           aria-controls="notifications-panel"
         >
           <Notification20 />
         </cv-header-global-action>
         <cv-header-global-action
           aria-label="User avatar"
           aria-controls="user-panel"
         >
           <Login20 />
         </cv-header-global-action>
         <cv-header-global-action
           aria-label="App switcher"
           aria-controls="switcher-panel"
         >
           <AppSwitcher20 />
         </cv-header-global-action>
       </template>
   
     </cv-header>
   </template>
   
   <script>
   import Notification20 from '@carbon/icons-vue/es/notification/20';
   import Login20 from '@carbon/icons-vue/es/login/20';
   import AppSwitcher20 from '@carbon/icons-vue/es/app-switcher/20';
   
   export default {
     name: 'TutorialHeader',
     components: { Notification20,  AppSwitcher20, Login20 }
   };
   </script>
   
   <style lang="scss" scoped></style>
   ```

3. Como o Header é algo **que irá sempre aparecer na aplicação** iremos importa-lo no `app.vue`:

   1. Será necessário utilizar do `cv-content` para podermos exibir o botão

   ```vue
   <template>
     <div id="app">
       <tutorial-header />
       <cv-content id="#main-content">
         <cv-button>Button</cv-button>
       </cv-content>
     </div>
   </template>
   
   <script>
   import TutorialHeader from './components/TutorialHeader/TutorialHeader';
   
   export default {
     components: {
       TutorialHeader
     }
   };
   </script>
   ```

   

### Uma view

1. Para criar a view iremos criar os path e files:

   ```
   src/views
   ├── LandingPage
   			└── LandingPage.vue
   └── RepoPage
   			└── RepoPage.vue
   ```

   * Será somente um exemplo de como utilzar rotas com lazy loading;

2. Dentro de `routes.js` iremos importar o `LandingPage` e fazer via LazyLoading o import do `RepoPage`

   ```javascript
   import Vue from 'vue';
   import Router from 'vue-router';
   import LandingPage from './views/LandingPage/LandingPage.vue';
   Vue.use(Router);
   
   export default new Router({
     routes: [
       {
         path: '/',
         name: 'landing-page',
         component: LandingPage
       },
       {
         path: '/repos',
         name: 'repo-page',
         component: () =>
           import(
             /* webpackChunkName: "repo-page" */ './views/RepoPage/RepoPage.vue'
           )
       }
     ]
   });
   ```

   * Para utilizar o `routes.js` é necessário importar dentro do `main.js`

     ```javascript
     import router from './router';
     
     new Vue({
       router,
       render: h => h(App)
     }).$mount('#app');
     ```

3. Agora para que o conteúdo da view, apareça, é necessário utilizar o `<router-view />`:

   ```vue
   <template>
     <div id="app">
       <tutorial-header />
       <cv-content id="#main-content">
         <router-view />
       </cv-content>
     </div>
   </template>
   ```



## Carbon grid

O Carbon disponibiliza o `@carbon/grid` para que seja modificado os tamanhos das divs, como um **bootstrap**:

1. Adicione o `@carbon/grid`

   ```bash
   yarn add @carbon/grid
   ```

2. No `_carbon.scss` iremos configurar para grid ter 16 colunas invés de 12

   ```scss
   $feature-flags: (
     grid-columns-16: true
   );
   
   @import 'carbon-components/scss/globals/scss/styles';
   ```

   

Para utilizar o Carbon/Grid faremos uso das tags:

1. `<div class="bx--grid">` → ficara todo conteúdo
   1. `bx--grid--full-width` → expande sem margem;
2. `<div class="bx--row">` → cria uma linha
3. `<div class="bx--col-[breakpoint]-[size]">` → cria a coluna com um tamanho X
   1. `<div class="bx--col-lg-4">` → 4 de 16 colunas será usada



### Criando view c/ Grid

<img src="https://www.carbondesignsystem.com/static/79ebe00ae0546d4abe58e788ab7a2129/4ea69/landing-layout.png" alt="gridd" style="zoom: 33%;" />

A idéia é criar a view como na imagem acima.

1. Temos uma área em cinza, que preenche **todas as colunas**;
   1. Temos as `Tabs` que irão variar a parte em branco;
      1. Temos uma área em branco (para o About), onde as letras ocupam quase a metade (7/16) e a imagem (8/16);
         1. Adicionaremos uma `bx--offset-lg-1` para dar um espaço entre a imagem e as letras e completar o 16//16;
      2. As temais áreas em branco são (16/16)
2. Temos o footer, com 4 links, dividos iguais (4/16 cada);

Como base, teriamos:

```vue
<template>
  <div class="bx--grid bx--grid--full-width landing-page">
    <div class="bx--row landing-page__banner">
      <div class="bx--col-lg-16">1</div>
    </div>
    <div class="bx--row landing-page__r2">
      <div class="bx--col-md-4 bx--col-lg-7">7/16</div>
      <div class="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">8/16</div>
    </div>
    <div class="bx--row landing-page__r3">
      <div class="bx--col-md-4 bx--col-lg-4">1/4</div>
      <div class="bx--col-md-4 bx--col-lg-4">1/4</div>
      <div class="bx--col-md-4 bx--col-lg-4">1/4</div>
      <div class="bx--col-md-4 bx--col-lg-4">1/4</div>
    </div>
  </div>
</template>
```



#### BreadCrumb

A pagina possui um `breadCrumb` onde o `carbon` fornece esse recurso com o `CvBreadcrumb`

1. Adicione o `CvBreadcrumb` entre a tag (16/16);

   ```vue
   <div class="bx--grid bx--grid--full-width landing-page">
     
     <div class="bx--row landing-page__banner">
       <div class="bx--col-lg-16">
   			  <cv-breadcrumb noTrailingSlash>
             <cv-breadcrumb-item>
               <cv-link href="/">Getting started</cv-link>
             </cv-breadcrumb-item>
           </cv-breadcrumb>
           <h1 class="landing-page__heading">Design &amp; build with Carbon</h1>
       </div>
     </div>
     
     <!-- demais divs-->
   </div>
   ```



#### Tabs + White Part

Adicionaremos as 3 tabs, com o `CvTabs` 

```vue
<div class="bx--row landing-page__r2">
  <div class="bx--col bx--no-gutter">

    <cv-tabs selected="0">
      <!-- ficará o conteúdo 7/16 e 8/16 -->
      <cv-tab label="About"> 
        <div class="bx--grid bx--grid--no-gutter bx--grid--full-width">
          <div class="bx--row landing-page__tab-content">
            <div class="bx--col-md-4 bx--col-lg-7">
              7/16
            </div>
            <div class="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
              8/16
            </div>
          </div>
        </div>
      </cv-tab>

      <!-- ficará o conteúdo 16/16 -->
      <cv-tab label="Design">
        <div class="bx--grid bx--grid--no-gutter bx--grid--full-width">
          <div class="bx--row landing-page__tab-content">
            <div class="bx--col-lg-16">
              Rapidly build beautiful and accessible experiences. The Carbon
              kit contains all resources you need to get started.
            </div>
          </div>
        </div>
      </cv-tab>

      <!-- ficará o conteúdo 16/16 -->
      <cv-tab label="Develop">
        <div class="bx--grid bx--grid--no-gutter bx--grid--full-width">
          <div class="bx--row landing-page__tab-content">
            <div class="bx--col-lg-16">
              Carbon provides styles and components in Vanilla, React,
              Angular, and Vue for anyone building on the web.
            </div>
          </div>
        </div>
      </cv-tab>
    </cv-tabs>
    
  </div>
</div>
```

Para mover as `Tabs` ao canto direito, iremos utilizar do `scss`:

```scss
.landing-page__r2 .bx--tabs__nav {
  right: 0;
}
```



##### About tab

Dentro de `7/16` iremos ter o texto com o `CvButton`  e dentro de `8/16` irá ficar nossa imagem:

```vue
<div class="bx--col-md-4 bx--col-lg-7">
  <h2 class="landing-page__subheading">What is Carbon?</h2>
  <p class="landing-page__p">
    Carbon is IBM’s open-source design system for digital
    products and experiences. With the IBM Design Language as
    its foundation, the system consists of working code, design
    tools and resources, human interface guidelines, and a
    vibrant community of contributors.
  </p>
  <cv-button>Learn more</cv-button>
</div>

<div class="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
  <img
       class="landing-page__illo"
       src="../../assets/tab-illo.png"
       alt="Carbon illustration"
       />
</div>
```

Para que a imagem não 'estoure' o tamanho, iremos deixar o `width`como `100%`

```scss
.landing-page__illo {
  max-width: 100%;
}
```

#### Footer

Para o Footer, basta colocarmos os nomes, destacando o `The Principles`

````vue
<div class="bx--row landing-page__r3">
  <div class="bx--col-md-4 bx--col-lg-4">
    <h3 class="landing-page__label">The Principles</h3>
  </div>
  <div class="bx--col-md-4 bx--col-lg-4">Carbon is Open</div>
  <div class="bx--col-md-4 bx--col-lg-4">Carbon is Modular</div>
  <div class="bx--col-md-4 bx--col-lg-4">Carbon is Consistent</div>
</div>
</div>
````



### Espaçamento c/ Carbon

O Carbo disponibiliza espaçamentos que podem ser utilizados com [carbon Tags](https://www.carbondesignsystem.com/guidelines/spacing/overview#spacing-scale), como:

* `$spacing-01`
* `$spacing-02`
* `center` → deixa no centro o elemento
* `auto` → automaticamente aumenta ou diminui de acordo com tamanho
* `gutter` → separa item 12 colunas
* `$layout-01`

Para utiliza-lo, é sugerido:

1. Criar um arquivo `src/style/_carbon-utils.scss` e importar:

   ```scss
   @import 'carbon-components/scss/globals/scss/vendor/@carbon/type/scss/font-family.scss';
   @import 'carbon-components/scss/globals/scss/vendor/@carbon/layout/scss/breakpoint.scss';
   @import 'carbon-components/scss/globals/scss/typography.scss';
   @import 'carbon-components/scss/globals/scss/vars.scss';
   ```

<br>

De volta ao `breadcrumb`, iremos adicionar o arquivo dos espaçamentos **em 1º lugar**:

```scss
@import '../../styles/_carbon-utils.scss';

.landing-page__r2 .bx--tabs__nav {
  right: 0;
}
```

e adicionar nas classes  o espaçamento:

* `landing-page__banner`  → breadcrumb
*  `landing-page__tab-content ` → conteúdo da tab
* `landing-page__p` → conteúdo da tab ( texto );
* `landing-page__r3` → footer

```scss
.landing-page__banner {
  padding-top: $spacing-05;
  padding-bottom: $spacing-07 * 4;
}

.landing-page__tab-content {
  padding-top: $layout-05;
  padding-bottom: $layout-05;
}

.landing-page__p {
  margin-top: $spacing-06;
  margin-bottom: $spacing-08;
}

.landing-page__r3 {
  padding-top: $spacing-09;
  padding-bottom: $spacing-09;
}
```



### Cor c/ Carbon

O Carbon tambem disponibiliza um padrão de cores, que pode ser utilizado, baseado nas [colors Carbon](https://www.carbondesignsystem.com/guidelines/color/usage/)!

Para utilizar, precisamos:

1. Utilizar o `@mixin` do SASS, então criaremos um novo arquivo `src/views/LandingPage/_mixins.scss`

   1. Com o `@mixin` criamos uma função, que quem utiliza-la com o `@include` irá ter o conteúdo abaixo anexado! onde o `$ui-01` defini a cor

   ```scss
   @mixin landing-page-background() {
     background-color: $ui-01;
     position: relative;
   
     &::before {
       content: '';
       position: absolute;
       left: -$spacing-05;
       top: 0;
       right: -$spacing-05;
       bottom: 0;
       background: $ui-01;
       z-index: -1;
     }
   }
   ```

2. Importa-lo no nosso `_carbon-overrides.scss`

   ```scss
   @import '../../styles/_carbon-utils.scss';
   @import './mixins';
   
   .landing-page__r2 .bx--tabs__nav {
     right: 0;
   }
   ```

3. E importar a função do `@mixin` para o breadcrumb e para o footer:

   ````scss
   .landing-page__banner {
     padding-top: $spacing-05;
     padding-bottom: $spacing-07 * 4;
     @include landing-page-background;
   }
   
   .landing-page__r3 {
     padding-top: $spacing-09;
     padding-bottom: $spacing-09;
     @include landing-page-background;
   }
   ````

### Tipografia c/ Carbon

O Carbon também disponibiliza [tipografias](https://www.carbondesignsystem.com/guidelines/typography/productive/) para nos auxiliar através de tags!

1. Utilize do `@include carbon--type-style` para importar o estilo correspondente!

   ```vue
   <h1 class="landing-page__heading">Design &amp; build with Carbon</h1>
   ```

   ```scss
   .landing-page__heading {
     @include carbon--type-style('productive-heading-05');
   }
   ```

   1. Devido o tamanho da tipografia, as `tabs` desceram, para ajustar:

      ```scss
      .landing-page__r2{
        margin-top: rem(-40px);
      }
      ```

2. Mudaremos também a fonte do `What is Carbon`:

   ```vue
   <template>
   	<h2 class="landing-page__subheading">What is Carbon?</h2>
   </template>
   
   <!-- _carbon-overrides.scss -->
   <style>
     .landing-page__subheading {
       @include carbon--type-style('productive-heading-03');
       @include carbon--font-weight('semibold');
     }
   </style>
   ```

3. E do conteúdo das tabs:

   ```scss
   .landing-page__p {
     @include carbon--type-style('productive-heading-03');
     margin-top: $spacing-06;
     margin-bottom: $spacing-08;
     @include carbon--breakpoint-between((320px + 1), md) {
       max-width: 75%;
     }
   }
   ```

## Componente II

### um DataTable

Dentro da página `repos` no nosso `RepoPage.vue` iremos fazer uso de um novo componente, que iremos adicionar o `CvDataTable`

1. Crie o componente `RepoTable.vue` → `src/views/RepoPage/RepoTable/` ;

2. Adicionaremos algumas `props` que o `CvDataTable` disponibiliza:

   ```vue
   <script>
   export default {
     name: 'RepoTable',
     props: {
       headers: Array,
       rows: Array,
       title: String,
       helperText: String
     },
   </script>
   ```

3. Dessa forma podemos importar o componente já, passando essas `props` → em `RepoPage.vue` iremos importar o `RepoTable`

   ```vue
   <script>
   import RepoTable from './RepoTable/RepoTable';
   export default {
     name: 'RepoPage',
     components: { RepoTable },
   ```

   1. Os valores `headers` e `rows` serão mockados no `data()`:

      ```json
        data() {
          return {
            headers: [
              {
                key: 'name',
                header: 'Name'
              },
              {
                key: 'createdAt',
                header: 'Created'
              },
              {
                key: 'updatedAt',
                header: 'Updated'
              },
              {
                key: 'issueCount',
                header: 'Open Issues'
              },
              {
                key: 'stars',
                header: 'Stars'
              },
              {
                key: 'links',
                header: 'Links'
              }
            ],
            rows: [
              {
                id: '1',
                name: 'Repo 1',
                createdAt: 'Date',
                updatedAt: 'Date',
                issueCount: '123',
                stars: '456',
                links: 'Links'
              },
              {
                id: '2',
                name: 'Repo 2',
                createdAt: 'Date',
                updatedAt: 'Date',
                issueCount: '123',
                stars: '456',
                links: 'Links'
              },
              {
                id: '3',
                name: 'Repo 3',
                createdAt: 'Date',
                updatedAt: 'Date',
                issueCount: '123',
                stars: '456',
                links: 'Links'
              }
            ]
          };
        }
      ```

4. Agora é possível utilizar o componente:

   ```vue
   <repo-table
               :headers="headers"
               :rows="rows"
               title="Carbon Repositories"
               helperText="A collection of public Carbon repositories."
               />
   ```

<br>

Voltando ao `RepoTable`:

1. Faremos uso do array que iremos receber da `props` `rows`. Para isso, criaremos uma `computed` que irá:

   1. Adicionar o valor `header` que veio do `RepoPage` para a prop `header` da `RepoTable`:

      ```javascript
      computed: {
        columns() {
          return this.headers.map(header => header.header);
        },
      ```

   2. Para cada valor da `row` iremos adicionar no array `data`, (desta forma preencheremos a tabela):

      ```javascript
      computed: {
          data() {
            return this.rows.map(row => ({
              data: [
                row.name,
                row.createdAt,
                row.updatedAt,
                row.issueCount,
                row.stars,
                row.links
              ],
              description: 'Row description'
            }));
          }
        }
      ```

2. Agora pasta adicionar propriamente a `CvDataTable` :

   ```vue
   <template>
     <cv-data-table
       :columns="columns"
       :title="title"
       :helper-text="helperText"
       :headers="headers"
     >
       <!-- rows irão aqui -->
     </cv-data-table>
   </template>
   ```

   1. Para adicionar as linhas, iremos iterar duas vezes, para isso primeros iremos através do `slot` acessar a computed `data()`:

      ````vue
      <cv-data-table
          :columns="columns"
          :title="title"
          :helper-text="helperText"
          :headers="headers"
        >
          <template slot="data">
            <cv-data-table-row v-for="(row, rowIndex) in data" :key="`${rowIndex}`">
            </cv-data-table-row>
        </template>
        
      </cv-data-table>
      ````

   2. Então de dentro do `CvDataTableRow` iremos iterar novamente, pegando os valores da `row` :

      ```vue
      <cv-data-table-row v-for="(row, rowIndex) in data" :key="`${rowIndex}`">
        <cv-data-table-cell
                            v-for="(cell, cellIndex) in row.data"
                            :key="`${cellIndex}`"
                            >{{ cell }}
        </cv-data-table-cell>
      </cv-data-table-row>
      ```

   3. Agora neste `CvDataTable` é permitido adicionar um 'dropdown', que neste caso conterá a `description`:

      ````vue
      <template slot="data">
        <cv-data-table-row v-for="(row, rowIndex) in data" :key="`${rowIndex}`">
            <cv-data-table-cell
                                v-for="(cell, cellIndex) in row.data"
                                :key="`${cellIndex}`"
                                >{{ cell }}
            </cv-data-table-cell>
            <template slot="expandedContent">
              {{ row.description }}
            </template>
        </cv-data-table-row>
      </template>
      ````

      

Para completar, apenas vamos dar uma margem no `RepoPage.vue`

1. Crie o arquivo `scss` importando o `carbon-utils` e crie a margem:

   ```scss
   @import '../../styles/_carbon-utils.scss';
   
   .repo-page .bx--row {
     padding-top: $spacing-05;
     padding-bottom: $spacing-05;
   }
   ```

2. Importe estilo no `RepoPage.vue`:

   ```vue
   <style lang="scss">
   @import './_carbon-repo.scss';
   </style>
   ```



## API c/ graphQL + Apollo

Apollo Platform é um cliente para utilizar o **GraphQL**! Para utiliza-los no projeto, iremos rodar:

```bash
vue add apollo
```

* Irá ser instalado o `apollo-boost | graphql | vue-apollo`;

Iremos fazer uso da API do GitHub, que disponibiliza a lista de repositórios, para isto iremos cadastrar uma **varia´vel de ambiente** local, com o Token:

1. Create `.env.local`:

   ````vue
   VUE_APP_GITHUB_PERSONAL_ACCESS_TOKEN=ba773a78f570004ecdf3c12b38eb10da2be5b5f1
   ````

2. Substituiremos o `const AUTH_TOKEN` do `vue-apollo.js`  pelo token do `env` e então iremos definir a URL da API do Git + Header

   ```javascript
   const AUTH_TOKEN = process.env.VUE_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
   
   const httpEndpoint =
     process.env.VUE_APP_GRAPHQL_HTTP || 'https://api.github.com/graphql';
   
   const defaultOptions = {
     // set wsEndpoint to null
     wsEndpoint: process.env.VUE_APP_GRAPHQL_WS,
   
     // Use the form expected by github for authorization
     getAuth: (tokenName) => `Bearer ${tokenName}`,
   };
   ```

<br>

No `RepoPage.vue` iremos fazer uso do `gql` proveniente do **graphQL**. O `gql` ajuda a escrever queries usando interpolação, onde em conjunto com o **`Query`** do `vue-apollo` irá fornecer informações de loading;

* O [Github Explorer](https://docs.github.com/en/graphql/overview/explorer) permite que seja testado as queries;
* A [documentação do Apollo](https://www.apollographql.com/docs/tutorial/queries/) também ilutra como criar queries;

No `RepoPage.vue`:

1. Importar o `gql` e criar uma variável para query:

   ````javascript
   import gql from 'graphql-tag';
   
   //com uso de tempalteString, iremos escrever a query
   const REPO_QUERY = gql`
     query REPO_QUERY {
       # Let's use carbon as our organization
       organization(login: "carbon-design-system") {
         # We'll grab all the repositories in one go. To load more resources
         # continuously, see the advanced topics.
         repositories(first: 75, orderBy: { field: UPDATED_AT, direction: DESC }) {
           totalCount
           nodes {
             url
             homepageUrl
             issues(filterBy: { states: OPEN }) {
               totalCount
             }
             stargazers {
               totalCount
             }
             releases(first: 1) {
               totalCount
               nodes {
                 name
               }
             }
             name
             updatedAt
             createdAt
             description
             id
           }
         }
       }
     }
   `;
   ````

2. Com a constante `REPO_QUERY`, podemos atribui-la ao objeto `apollo`:

   ```javascript
   apollo: {
     organization: REPO_QUERY
   },
   ```

   * Se exibirmos com a interpolação o `{{ this.organization }}` iremos ter um json como retorno!

3. Com o objeto `organization` podemos separar as `rows` para a tabela (precisaremos remover a `const rows`)

   ```javascript
   computed: {
     rows() {
         if (!this.organization) {
         return [];
       } else {
         return this.organization.repositories.nodes.map(row => ({
           ...row,
           key: row.id,
           stars: row.stargazers.totalCount,
           issueCount: row.issues.totalCount,
           createdAt: new Date(row.createdAt).toLocaleDateString(),
           updatedAt: new Date(row.updatedAt).toLocaleDateString(),
           links: { url: row.url, homepageUrl: row.homepageUrl }
         }));
       }
     }
   }
   ```

   * Vamos atualizra a descrição também, passando o `row.description`;

Até o momento, ja conseguimos ver os dados populados na tabela!

### LinkList component

O carbon possui um componente chamado `CvLink` que basicamente é um `<a href`, para deixa-lo disponivel na tabela, iremos criar um componente `LinkList` que irá ser utilizado pelo `RepoTable`:

1. Criar o `LinkList.vue` → `src/views/RepoPage/` 

2. Iremos receber dois tipos de atributos nesse componente, a url da `homepage` e a url do `gitHub`:

   ```vue
   <template>
     <ul class="link-list">
       <li>
         <cv-link :href="url">GitHub</cv-link>
       </li>
   
       <li v-if="homepageUrl">
         <span>&nbsp;|&nbsp;</span>
         <cv-link :href="homepageUrl">Homepage</cv-link>
       </li>
     </ul>
   </template>
   
   <script>
   export default {
     name: 'LinkList',
     props: {
       url: String,
       homepageUrl: String
     }
   };
   </script>
   
   <style lang="scss" scoped>
   .link-list {
     display: flex;
   }
   </style>
   ```

3. Quem irá fornecer esses dados será o `PageTable` , portanto, iremos importar o `LinkList` la:

   ```vue
   <script>
   import LinkList from './LinkList.vue';
   export default {
     name: 'RepoTable',
     components: { LinkList },
   ```

4. Agora, iremos chamar o `LinkList` caso não seja retornado o link do GitHub pelo `gql`:

   ```vue
   <cv-data-table-cell v-for="(cell, cellIndex) in row.data" :key="`${cellIndex}`">
     <template v-if="!cell.url">{{ cell }}</template>
     <link-list v-else :url="cell.url" :homepage-url="cell.homepageUrl" />
   </cv-data-table-cell>
   ```



### Loading table

Enquanto a tabela não carrega, o usuário tem a impressão de que a página n possui registros! Para corrigir isso, o `Apollo` disponibiliza a prop `$apollo.loading` ([tutorial](https://vue-apollo.netlify.app/guide/apollo/queries.html#loading-state)), que **retorna um boolean** !

A `CvDataTable` possui a prop `loading`, portanto, iremos passar o apollo para ela;

1. No `RepoPage` iremos chamar a prop `loading` :

   ```vue
   <repo-table
     :headers="headers"
     :rows="rows"
     title="Carbon Repositories"
     helperText="A collection of public Carbon repositories."
     :loading="$apollo.loading"
   />
   ```

2. No `RepoTable` declaramos a prop:

   ```javascript
   props: {
     headers: Array,
     rows: Array,
     title: String,
     helperText: String,
     loading: Boolean,
   },
   ```

3. E agora com um `if` podemos checar se esta carregando a página...

   ```vue
   <div v-if="loading">Loading...</div>
   <cv-data-table
     v-else
     :columns="columns"
     :title="title"
     :helper-text="helperText"
   ></cv-data-table>
   ```



#### Loading Skeleton

Invés de exibir um `loading...`  podemos usar o `CvDataTableSkeleton`, e renderizar X linhas primeiro!

```vue
<cv-data-table-skeleton
  v-if="loading"
  :columns="columns"
  :title="title"
  :helper-text="helperText"
  :rows="10"
/>
<cv-data-table
    v-else
    :columns="columns"
    :title="title"
    :helper-text="helperText"
  >
```



### Paginação DataTable

O `DataTable` possui uma prop e um evento para paginação:

```vue
<cv-data-table
               :pagination="{ numberOfItems: this.totalRows }"
               @pagination="$emit('pagination', $event)"
               >
```

* Como é um componente, iremos receber o `totalRows` do componente pai, portanto precisamos criar a prop `totalRows`:

  ```javascript
  totalRows: Number
  ```

No componente pai (`RepoPage`):

1. Criaremos no `data()` property, as variáveis:

   ```vue
   data() {
     return {
       headers,
       pageSize: 0,
       pageStart: 0,
       page: 0
     };
   },
   ```

2. Substituiremos do `rows="rows"` por `:rows="pagedRows"` e adicionaremos o evento:

   ```vue
   <RepoTable
              :rows="pagedRows"
              :totalRows="rows.length"
              @pagination="onPagination"
   ```

3. `pagedRows` sera uma computed property, que irá fazer o `slice` de `rows`:

   ```javascript
   computed: {
     // other computed properties
     pagedRows() {
     return this.rows.slice(this.pageStart, this.pageStart + this.pageSize);
     }
   },
   ```

4. `onPagination` será um `method` que irá pegar os valores do `gql`

   ```javascript
   methods: {
     onPagination(val) {
       this.pageSize = val.length;
       this.pageStart = val.start;
       this.page = val.page;
     }
   }
   ```



#### Paginação c/ Pagination

Outra forma, seria utilizar o `CvPagination` do carbon! que dá mais opções de edição

1. No `RepoPage` , adicionamos logo abaixo do `RepoTable` e usamos o evento do `OnPagination` para pegar os valores

   ```vue
   <div class="bx--col-lg-16">
     <RepoTable
                :headers="headers"
                :loading="$apollo.loading"
                :rows="pagedRows"	
                title="Carbon Repositories"
                helperText="A collection of public Carbon repositories."
                />
     <cv-pagination
                    backwards-text="Previous page"
                    forwards-text="Next page"
                    page-number-label="Page number"
                    page-sizes-label="Items per page"
                    :number-of-items="rows.length"
                    :page-sizes="[10, { value: 20, selected: true }, 30, 40, 50, 70]"
                    @change="onPagination"
                    />
   </div>
   ```

   

## Componentes reutilizáveis

<img src="https://www.carbondesignsystem.com/static/2ea2681b6eeb1a14dd7c9dc91ec8724e/4ea69/info-spacing.png" alt="reutilizaveis" style="zoom: 33%;" />

Nosso footer, terá um layout parecido:

* Title;
* Body;
* Icon

Então, nada mais justo do que criar um componente que será reutilizado pelo `LadingPage`!

1. Criar os componentes **`InfoCard.vue` e `InfoSection.vue`**

   ```
   src/components/InfoSection
   ├──index.js
   └──InfoCard.vue	→ usado para os demais cards
   └──InfoSection.vue → usado para o The principle
   ```

   ```javascript
   // index.js
   import InfoSection from './InfoSection';
   import InfoCard from './InfoCard';
   
   export { InfoSection, InfoCard };
   ```

2. Começando com o `InfoSection.vue`, iremos recortar o que temos no `LandingPage.vue` para o `The principle`, substituindo :

   * `div` por `section`;
   * Título `The principles` por `{{heading}}`
   * Deixar um `slot` para informar que irá entrar ali os demais cards

   ```vue
   <template>
     <section class="bx--row info-section">
       <div class="bx--col-md-8 bx--col-lg-4 bx--col-xlg-3">
         <h3 class="info-section__heading">{{ heading }}</h3>
       </div>
       <slot />
     </section>
   </template>
   
   <script>
   export default {
     name: 'InfoSection',
     props: {
       heading: String
     }
   };
   </script>
   
   <style lang="scss">
   @import '../../styles/_carbon-utils';
   
   .info-section__heading {
     @include carbon--type-style('heading-01');
   }
   </style>
   
   ```

3. Para o `InfoCard.vue`, irá ficar:

   * heading;
   * body;
   * icon

   ```vue
   <template>
     <article
       class="info-card bx--col-md-4 bx--col-lg-4 bx--col-xlg-3 bx--offset-xlg-1"
     >
       <h4 class="info-card__heading">{{ heading }}</h4>
       <p class="info-card__body">{{ body }}</p>
       <component :is="icon" />
     </article>
   </template>
   
   <script>
   export default {
     name: 'InfoCard',
     props: {
       heading: String,
       body: String,
       icon: Object
     }
   };
   </script>
   
   <style lang="scss">
   @import '../../styles/carbon-utils';
   
   .info-card {
     margin-top: $spacing-09;
     display: flex;
     flex-direction: column;
     svg {
       margin-top: $spacing-09;
     }
     // top border in only small breakpoints to prevent overrides
     @include carbon--breakpoint-down(md) {
       &:not(:nth-child(2)) {
         border-top: 1px solid $ui-03;
         padding-top: $spacing-09;
       }
     }
     // left border in just the 2nd column items
     @include carbon--breakpoint(md) {
       &:nth-child(odd) {
         border-left: 1px solid $ui-03;
       }
     }
     // left border in all items
     @include carbon--breakpoint(lg) {
       margin-top: 0;
       border-left: 1px solid $ui-03;
       svg {
         margin-top: $layout-06;
       }
     }
   }
   
   .info-card__heading {
     @include carbon--type-style('productive-heading-03');
   }
   
   .info-card__body {
     margin-top: $spacing-06;
     flex-grow: 1; // fill space so icons are bottom aligned
     @include type-style('body-long-01');
     // prevent large line lengths between small and medium viewports
     @include carbon--breakpoint-between(321px, md) {
       max-width: 75%;
     }
   }
   </style>
   ```

   

### Usando componente

Em `LandingPage.vue` iremos importar os dois componentes + ícones

```javascript

import { InfoSection, InfoCard } from '../../components/InfoSection';
import Globe32 from '@carbon/icons-vue/lib/globe/32';
import PersonFavorite32 from '@carbon/icons-vue/lib/person--favorite/32';
import Application32 from '@carbon/icons-vue/lib/application/32';

export default {
  name: 'LandingPage',
  components: { InfoSection, InfoCard, Globe32, PersonFavorite32, Application32 }
};
```

* Para que os icones sejam carregados antes de exibir a tela, iremos fazer um `asign`  no `create()` lifecicle:

  ```javascript
   created() {
      // Add icons to this
      Object.assign(this, {
        Globe32,
        PersonFavorite32,
        Application32
      });
    }
  ```

<br>

Com tudo importado, podemos usar o componente, onde eram divs do footer, agora:

```vue
<info-section heading="The Principles" class="landing-page__r3">
  <info-card
    heading="Carbon is Open"
    body="It's a distributed effort, guided by the principles of the open-source movement. Carbon's users are also it's makers, and everyone is encouraged to contribute."
    :icon="PersonFavorite32"
  />
  <info-card
    heading="Carbon is Modular"
    body="Carbon's modularity ensures maximum flexibility in execution. It's components are designed to work seamlessly with each other, in whichever combination suits the needs of the user."
    :icon="Application32"
  />
  <info-card
    heading="Carbon is Consistent"
    body="Based on the comprehensive IBM Design Language, every element and component of Carbon was designed from the ground up to work elegantly together to ensure consistent, cohesive user experiences."
    :icon="Globe32"
  />
</info-section>
```

#### Melhorando estilo

Para deixar a última palavra em negrito, iremos criar no `InfoCard.vue` uma computed property:

```javascript
computed: {
    // Take in a phrase and separate the third word in an array
    splitHeading() {
      const splitHeading = this.heading.split(' ');
      const finalWord = splitHeading.pop();
      return [splitHeading.join(' '), finalWord];
    }
  }
```

E substituir o `h4`:

```vue
<h4 class="info-card__heading">
  {{ splitHeading[0] }}
  <strong>{{ splitHeading[1] }}</strong>
</h4>
```