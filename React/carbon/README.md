

# Carbon Design - React

## Getting started

Instalar o carbon:

```bash
yarn add carbon-components@10.25.0 carbon-components-react@7.25.0 @carbon/icons-react@10.22.0 carbon-icons@7.0.7 @carbon/grid@10.17.0
```

Instalar Rotas:

```
yarn add react-router-dom@5.0.0
```

Instalar SASS 

```bash
yarn add sass@1.29.0
```

Instalar p/ HTTP:

```
yarn add apollo-boost@0.4.2 graphql@14.3.1 react-apollo@2.5.6
```

All packages

```
yarn add carbon-components@10.25.0 carbon-components-react@7.25.0 @carbon/icons-react@10.22.0 carbon-icons@7.0.7 @carbon/grid@10.17.0 react-router-dom@5.0.0 sass@1.29.0 apollo-boost@0.4.2 graphql@14.3.1 react-apollo@2.5.6
```

Para evitar adicionar `~` quando importarmos arquivos `scss`:

```javascript
// .env
SASS_PATH="node_modules"
```

* Carbon utiliza `scss` portanto devemos alterar o arquivo base `index.css` → `index.scss` e importe os styles do carbon;

  ```scss
  @import 'carbon-components/scss/globals/scss/styles.scss';
  ```

  * O processo de recompilar os estilos é demorado, por isso devemos criar um `scss` para o `App.js` para que não fiquemos mexendo no `index`
  * Alterar o import do `index.js` para utilizar o `index.scss`

Vamos importar o componente `Button` e utiliza-lo!

```react
// App.js
import React, { Component } from 'react';
import './app.scss';
import { Button } from 'carbon-components-react';

class App extends Component {
  render() {
    return (
      <div>
        <Button>Button</Button>
      </div>
    );
  }
}

export default App;
```

# Step 1

## UIShell - Menu

Por padrão, todo componente irá ter a estrutura:

```
src/components/TutorialHeader
├──_tutorial-header.scss
├──index.js
└──TutorialHeader.js
```

* No `app.scss` irá ser importado o `tutorial-header.scss` bem como os demais `scss`

  ```scss
  @import './components/TutorialHeader/tutorial-header.scss';
  ```

* No `index.js` iremos sempre importar o `js` e depois exportar

  * Isto facilita 
  
  ```js
  import TutorialHeader from './TutorialHeader';
  export default TutorialHeader;
  ```

Para o componente em si:

1. Importaremos tudo aquilo que é necessário para UIShell completa (more about [Carbon Components UIShell](https://react.carbondesignsystem.com/?path=/story/components-ui-shell--header-base-w-navigation));

```react
// TutorialHeader.js
import React from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from 'carbon-components-react';

const TutorialHeader = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="Carbon Tutorial">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName href="/" prefix="IBM">
          Carbon Tutorial
        </HeaderName>
        <HeaderNavigation aria-label="Carbon Tutorial">
          <HeaderMenuItem href="/repos">Repositories</HeaderMenuItem>
        </HeaderNavigation>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}>
          <SideNavItems>
            <HeaderSideNavItems>
              <HeaderMenuItem href="/repos">Repositories</HeaderMenuItem>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
        <HeaderGlobalBar />
      </Header>
    )}
  />
);

export default TutorialHeader;
```

* Note: When creating navigation headers, it’s important to have a `Skip to content` link so keyboard users can skip the navigation items and go straight to the main content.

### Icones no Menu

Para adicionar **icones a direita** devemos importar os icones desejados e utilizar o `HeaderGlobalBar`:

```react
import {
  AppSwitcher20,
  Notification20,
  UserAvatar20,
} from '@carbon/icons-react';
```

```react
// ao final do TutorialHeader
<HeaderGlobalBar>
  <HeaderGlobalAction aria-label="Notifications">
    <Notification20 />
  </HeaderGlobalAction>
  <HeaderGlobalAction aria-label="User Avatar">
    <UserAvatar20 />
  </HeaderGlobalAction>
  <HeaderGlobalAction aria-label="App Switcher">
    <AppSwitcher20 />
  </HeaderGlobalAction>
</HeaderGlobalBar>
```

### Renderizando no App

Agora basta importar o `TutorialHeader` e o component `Content`:

```react
import React, { Component } from 'react';
import './app.scss';
import { Button, Content } from 'carbon-components-react';
import TutorialHeader from './components/TutorialHeader';

class App extends Component {
  render() {
    return (
      <>
        <TutorialHeader />
        <Content>
          <Button>Button</Button>
        </Content>
      </>
    );
  }
}
```



## Criando Views

1. Criaremos pasta `content` com os arquivos padrões

```
src/content
├── LandingPage
└── RepoPage

src/content/LandingPage
├── _landing-page.scss
├── index.js
└── LandingPage.js

src/content/RepoPage
├── _repo-page.scss
├── index.js
└── RepoPage.js
```

2. Importaremos no `app.scss` os novos `scss`:

   ```scss
   @import './components/TutorialHeader/tutorial-header.scss';
   @import './content/LandingPage/landing-page.scss';
   @import './content/RepoPage/repo-page.scss';
   ```

3. Os `index.js` seguiram igual feito ao menu

   ```react
   import LandingPage from './LandingPage';
   export default LandingPage;
   ```

4. No arquivo `.js` iremos deixar somente uma div:

   ```react
   import React from 'react';
   
   const LandingPage = () => {
     return <div>LANDING PAGE</div>;
   };
   
   export default LandingPage;
   ```

### Rotas

#### Fix index

Com o `react-router-dom` instalado, precisamos declara-lo no `index.js`

```javascript
import { HashRouter as Router } from 'react-router-dom';
```

Substituir o `render()`:

```react
import { HashRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
```

#### Fix App

Agora no `App.js` iremos importar as novas páginas e o `react-router-dom` para fazer o switch das paginas

```react
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import RepoPage from './content/RepoPage';
```

Desta forma removeremos o button que existia e adicionaremos o link das rotas:

```react
<Content>
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/repos" component={RepoPage} />
  </Switch>
</Content>
```

#### Link component

No `TutorialHeader` iremos importar o component `Link` do `router-dom`, desta forma podemos utilizar o `to` no lugar do `href`:

```react
import { Link } from 'react-router-dom';
```

```react
<HeaderName element={Link} to="/" prefix="IBM">
  ...
<HeaderMenuItem element={Link} to="/repos">
```



# Step 2

## Suporte IE11

O Carbon coloca como requisito adicionarmos alguns `imports` para o IE11 no `index.js` :

```js
import 'core-js/modules/es7.array.includes';
import 'core-js/modules/es6.array.fill';
import 'core-js/modules/es6.string.includes';
import 'core-js/modules/es6.string.trim';
import 'core-js/modules/es7.object.values';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
```

## Grid

Com o `@carbon/grid` instalado, podemos utilizar de recursos do Carbon para grids. Seguindo o padrão

`grid` > `row` > `col` DOM structure.

### 16 columns

Iremos definir como padrão, o limit de 16 columns (antes da importação dos styles do carbon)

```scss
// index.scss

$feature-flags: (
  grid-columns-16: true,
);

@import 'carbon-components/scss/globals/scss/styles.scss';
```

### LandingPage - bx--grid/row

O Carbon possui algumas classes defaults, como:

* `bx--grid` → habilita o padrão de grid do Carbon;
* `bx--row` → funciona como um `row` do bootstrap;
* `bx--col-[breakpoint]-[size]` → `bx--col-lg-4` irá definir o tamanho do elemento

A view deseja é:

<img src="https://www.carbondesignsystem.com/static/79ebe00ae0546d4abe58e788ab7a2129/3cbba/landing-layout.png" alt="Landing page grid" style="zoom:70%;" />

Para o:

*  topo, com a parte cinza (Gettings start + about + design + develop) → `bx--col-lg-16`
* Conteúdo central (em branco) iremos dividir em dois:
  * `bx--col-lg-7`;
  * `bx--offset-lg-1` (espaçamento);
  * `bx--col-lg-8`;
* Footer iremos atribuir → `bx--col-lg-4`;

```react
import React from 'react';

const LandingPage = () => {
  return (
    <div className="bx--grid bx--grid--full-width">
      <div className="bx--row">
        <div className="bx--col-lg-16">1</div>
      </div>
      <div className="bx--row landing-page__r2">
        <div className="bx--col-md-4 bx--col-lg-7">7/16</div>
        <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">8/16</div>
      </div>
      <div className="bx--row landing-page__r3">
        <div className="bx--col-md-4 bx--col-lg-4">1/4</div>
        <div className="bx--col-md-4 bx--col-lg-4">1/4</div>
        <div className="bx--col-md-4 bx--col-lg-4">1/4</div>
        <div className="bx--col-md-4 bx--col-lg-4">1/4</div>
      </div>
    </div>
  );
};

export default LandingPage;
```



### BreadCrumb

O Topo da pagina utiliza do componente `BreadCrumb` , portanto onde temos:

```react
<div className="bx--col-lg-16">1</div>
```

Irá ficar:

```react
<!-- aria-label é utilizado por conta de deficientes visuais e para não misturar os navs -->
<Breadcrumb noTrailingSlash aria-label="Page navigation">
  <BreadcrumbItem>
    <a href="/">Getting started</a>
  </BreadcrumbItem>
</Breadcrumb>
```

bastando fazer os imports:

```react
import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react';
```

### Tabs

Onde temos `About - Design - Develop` podemos utilizar do component `Tabs`, portanto onde temos:

```react
<div className="bx--row landing-page__r2">
  <div className="bx--col-md-4 bx--col-lg-7">7/16</div>
  <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">8/16</div>
</div>
```

Iremos substituir incluindo as 3 tabs e adicionando as props com os valores:

```react
const LandingPage = () => {
  const props = {
    tabs: {
      selected: 0,
      role: 'navigation',
    },
    tab: {
      role: 'presentation',
      tabIndex: 0,
    },
  };
  
  return (
  	...
  )
}	
```

```react
<div className="bx--row landing-page__r2">
  <!-- aria-label é utilizado por conta de deficientes visuais e para não misturar os navs -->
  <Tabs {...props.tabs} aria-label="Tab navigation">
    
    <Tab {...props.tab} label="About">
      <!-- Label é onde irá o nome da tab -->
      <!-- INICIO conteudo a ser exibido abaixo da tab -->
      <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
        <div className="bx--row landing-page__tab-content">
          <div className="bx--col-md-4 bx--col-lg-7">
            <h2 className="landing-page__subheading">
              What is Carbon?
            </h2>
            <p className="landing-page__p">
              Carbon is IBM’s open-source design system for digital
              products and experiences. With the IBM Design Language
              as its foundation, the system consists of working code,
              design tools and resources, human interface guidelines,
              and a vibrant community of contributors.
            </p>
            <Button>Learn more</Button>
          </div>
          <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
            <img
              className="landing-page__illo"
              src={`${process.env.PUBLIC_URL}/tab-illo.png`}
              alt="Carbon illustration"
            />
          </div>
        </div>
      </div>
      <!-- FIM conteudo a ser exibido abaixo da tab -->
    </Tab>
    
    <Tab {...props.tab} label="Design">
      <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
        <div className="bx--row landing-page__tab-content">
          <div className="bx--col-lg-16">
            Rapidly build beautiful and accessible experiences. The
            Carbon kit contains all resources you need to get started.
          </div>
        </div>
      </div>
    </Tab>
    
    <Tab {...props.tab} label="Develop">
      <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
        <div className="bx--row landing-page__tab-content">
          <div className="bx--col-lg-16">
            Carbon provides styles and components in Vanilla, React,
            Angular, and Vue for anyone building on the web.
          </div>
        </div>
      </div>
    </Tab>
    
  </Tabs>
</div>
```

### Override scss

Como iremos alterar elementos padrão do Carbon, a boa prática é criar um `_overrides.scss` do component

```scss
.landing-page__r2 .bx--tabs--scrollable {
  transform: translateZ(0);
  justify-content: flex-end;
}
.landing-page__r2 .bx--tab-content {
  padding: 0;
}
```

Importar no `_landing-page.scss`:

```scss
@import './overrides.scss';
```

### Spacing + Colors - Carbon

Como ja instalamos o `@carbon/component` podemos utilizar as cores padrões do carbon, para isso precisamos adicionar ao `app.scss` :

```scss
@import 'carbon-components/scss/globals/scss/vendor/@carbon/type/scss/font-family.scss';
@import 'carbon-components/scss/globals/scss/vendor/@carbon/layout/scss/breakpoint.scss';
@import 'carbon-components/scss/globals/scss/typography.scss';
@import 'carbon-components/scss/globals/scss/vars.scss';

@import './components/TutorialHeader/tutorial-header.scss';
@import './content/LandingPage/landing-page.scss';
@import './content/RepoPage/repo-page.scss';
```

Dessa forma podemos utilizar de tags como `$spacing-05` e `$ui-01` para cores

```scss
// _landing-pages.scss
.landing-page__banner {
  padding-top: $spacing-05;
  padding-bottom: $spacing-07 * 4;
}
```

#### Mixins

Para este projeto, iremos utilizar `mixins` na `LandingPage` entao para isso, criaremos `_mixins.scss` dentro da pasta `landingPage`

```scss
@mixin landing-page-background() {
  background-color: $ui-01;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: -$spacing-06;
    top: 0;
    right: -$spacing-06;
    bottom: 0;
    background: $ui-01;
    z-index: -1;
  }
}
```

Importaremos ele e então chamaremos a função que irá executar todo scss

```scss
// _landing-pages.scss
@import './mixins.scss';
@import './overrides.scss';

.landing-page__illo {
  max-width: 100%;
}

.landing-page__banner {
  padding-top: $spacing-05;
  padding-bottom: $spacing-07 * 4;
  @include landing-page-background;
}
```

#### Tipografia

```scss
.landing-page__tab-content {
  padding-top: $layout-05;
  padding-bottom: $layout-05;
}

.landing-page__subheading {
  @include carbon--type-style('productive-heading-03');
  @include carbon--font-weight('semibold');
}

.landing-page__p {
  @include carbon--type-style('productive-heading-03');
  margin-top: $spacing-06;
  margin-bottom: $spacing-08;
  @include carbon--breakpoint-between((320px + 1), md) {
    max-width: 75%;
  }
}
```



## Repository - DataTable

Para exibirmos os repositórios, utilizaremos do `DataTable` e como boa prática, ele será um child component do `RepoPage`:

1. Iremos importar os components que serão utilizados:

```react
// src/content/RepoPage/RepoTable.js
import React from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableExpandHeader,
  TableHeader,
  TableBody,
  TableExpandRow,
  TableCell,
  TableExpandedRow,
} from 'carbon-components-react';
```

2. O `DataTable` espera receber 2 `props` → `rows, headers` → que serão passadas pelo `RepoPage` de forma mockada de início...

   ```react
   const RepoTable = ({ rows, headers }) => {
     return (
       <DataTable
         rows={rows}
         headers={headers}
         render={({
           rows,
           headers,
           getHeaderProps,
           getRowProps,
           getTableProps,
         }) => (
           <TableContainer
             title="Carbon Repositories"
             description="A collection of public Carbon repositories.">
             <Table {...getTableProps()}>
               <TableHead>
                 <TableRow>
                   <TableExpandHeader />
                   {headers.map(header => (
                     <TableHeader {...getHeaderProps({ header })}>
                       {header.header}
                     </TableHeader>
                   ))}
                 </TableRow>
               </TableHead>
               <TableBody>
                 {rows.map(row => (
                   <React.Fragment key={row.id}>
                     <TableExpandRow {...getRowProps({ row })}>
                       {row.cells.map(cell => (
                         <TableCell key={cell.id}>{cell.value}</TableCell>
                       ))}
                     </TableExpandRow>
                     <TableExpandedRow colSpan={headers.length + 1}>
                       <p>Row description</p>
                     </TableExpandedRow>
                   </React.Fragment>
                 ))}
               </TableBody>
             </Table>
           </TableContainer>
         )}
       />
     );
   };
   
   export default RepoTable;
   ```

3. Importar o `RepoTable` no `RepoPage` e então passar valores mockados

   ```react
   // RepoPage
   import React from 'react';
   import RepoTable from './RepoTable';
   
   const RepoPage = () => {
     const headers = [
       {
         key: 'name',
         header: 'Name',
       },
       {
         key: 'createdAt',
         header: 'Created',
       },
       {
         key: 'updatedAt',
         header: 'Updated',
       },
       {
         key: 'issueCount',
         header: 'Open Issues',
       },
       {
         key: 'stars',
         header: 'Stars',
       },
       {
         key: 'links',
         header: 'Links',
       },
     ];
   
     const rows = [
       {
         id: '1',
         name: 'Repo 1',
         createdAt: 'Date',
         updatedAt: 'Date',
         issueCount: '123',
         stars: '456',
         links: 'Links',
       },
       {
         id: '2',
         name: 'Repo 2',
         createdAt: 'Date',
         updatedAt: 'Date',
         issueCount: '123',
         stars: '456',
         links: 'Links',
       },
       {
         id: '3',
         name: 'Repo 3',
         createdAt: 'Date',
         updatedAt: 'Date',
         issueCount: '123',
         stars: '456',
         links: 'Links',
       },
     ];
   
     return (
       <div className="bx--grid bx--grid--full-width bx--grid--no-gutter repo-page">
         <div className="bx--row repo-page__r1">
           <div className="bx--col-lg-16">
             <RepoTable headers={headers} rows={rows} />
           </div>
         </div>
       </div>
     );
   };
   
   export default RepoPage;
   ```

   

# Step 3

## API GraphQL

Para consumir uma API com GraphQL é necessário instalar:

```
yarn add apollo-boost@0.4.2 graphql@14.3.1 react-apollo@2.5.6
```

Importar no `index.js`:

```js
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
```

Chamar o endpoint principal:

```js
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});
```

E alterar o `render`:

```react
<ApolloProvider client={client}>
  <Router>
    <App />
  </Router>
</ApolloProvider>
```

## Query RepoPage

Com o apolo/graphql adicionado, podemos importar no `RepoPage.js`

```react
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
```

* `gql` ajuda a escrever queries

